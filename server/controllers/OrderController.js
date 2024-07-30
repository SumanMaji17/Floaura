import getPrismaInstance from "../utils/PrismaClient.js";
import stripe from "stripe";
import { config } from "dotenv";

config();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000"
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

export const CreatePayment = async (req, res, next) => {
  try {
    const {
      items,
      userId,
      totalPrice,
      orderType,
      orderAddressId,
      members,
      orderId,
    } = req.body;


    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(400).send("User does not exist in the database");
    }

    let itemIds;

    if (orderType !== "member") {
      const savedItems = await Promise.all(
        items.map((item) =>
          prisma.orderItem.create({
            data: {
              productId: item.id,
              quantity: item.quantity,
            },
          })
        )
      );

      itemIds = savedItems.map((item) => item.id);
    }

    let lineItems;
    if (orderType === "self") {
      lineItems = items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productName,
            images: [item.image], // Set product image
          },
          unit_amount: item.price * 100, // Amount in cents
        },
        quantity: item.quantity,
      }));
    } else if (orderType === "group") {
      const Amount = totalPrice / members.length;
      const totalAmount = Math.floor(Amount * 100) / 100;

      lineItems = [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Individual Payment for the Group Pay Mode",
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ];
    } else {
      lineItems = [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Individual Payment for the Group Pay Mode",
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ];
    }

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      metadata: {
        items: JSON.stringify(itemIds),
        totalPrice: JSON.stringify(totalPrice),
        orderType: JSON.stringify(orderType),
        orderAddressId: JSON.stringify(orderAddressId),
        userId: JSON.stringify(userId),
        members: JSON.stringify(members),
        orderId: JSON.stringify(orderId),
      },
      mode: "payment",
      success_url:
        `${CLIENT_URL}/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (err) {
    next(err);
  }
};

export const CreateOrder = async (req, res, next) => {
  try {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error("Webhook Error:", error.message); // Change `err` to `error`
      return res.status(400).send(`Webhook Error: ${error.message}`); // Change `err` to `error`
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const itemIds = session.metadata?.items ? JSON.parse(session.metadata.items) : [];
      const userId = session.metadata?.userId ? JSON.parse(session.metadata.userId) : null;
      const orderType = session.metadata?.orderType ? JSON.parse(session.metadata.orderType) : null;
      const orderAddressId = session.metadata?.orderAddressId ? JSON.parse(session.metadata.orderAddressId) : null;
      const totalPrice = session.metadata?.totalPrice ? JSON.parse(session.metadata.totalPrice) : null;
      const members = session.metadata?.members ? JSON.parse(session.metadata.members) : [];
      const orderId = session.metadata?.orderId ? JSON.parse(session.metadata.orderId) : null;
      
      if (orderType === "self") {
        const order = await createOrderSelf(
          userId,
          itemIds,
          totalPrice,
          orderType,
          orderAddressId
        );
      } else if (orderType === "group") {
        const order = await createOrderGroup(
          userId,
          itemIds,
          totalPrice,
          orderType,
          orderAddressId,
          members
        );
      } else {
        const orderUpdated = await updateGroupOrder(userId, orderId);
      }
    }
    res.status(200).end();
  } catch (error) {
    console.log("The error is:" + error);
    next(error);
  }
};

const createOrderSelf = async (
  userId,
  itemIds,
  totalPrice,
  orderType,
  orderAddressId
) => {
  try {
    const prisma = getPrismaInstance();
    const paymentStatus = "Paid";
    const createdOrder = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        items: {
          connect: itemIds.map((id) => ({ id })),
        },
        orderType,
        orderAddressId,
        paymentStatus,
      },
    });

    return createdOrder;
  } catch (error) {
    console.log("Error creating order:", error);
    throw error;
  }
};

const createOrderGroup = async (
  userId,
  itemIds,
  totalPrice,
  orderType,
  orderAddressId,
  members
) => {
  try {
    const prisma = getPrismaInstance();

    const users = await prisma.user.findMany({
      where: {
        phone: {
          in: members,
        },
      },
      select: {
        id: true,
        name: true,
        phone: true,
      },
    });

    
    const createdOrder = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        orderType,
        orderAddressId,
        paymentStatus: "Unpaid",
        items: {
          connect: itemIds.map((id) => ({ id })),
        },
        members: {
          create: users.map((user) => ({
            memberId: user.id,
            name: user.name,
            phone: user.phone,
            paymentStatus: user.id === userId ? "Paid" : "Pending",
            individualPayment:
              Math.floor((totalPrice / (users.length + 1)) * 100) / 100,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return createdOrder;
  } catch (error) {
    console.log("Error creating order:", error);
    throw error;
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const userData = req.authenticatedUser;
    const userId = userData.id;

    const prisma = getPrismaInstance();
    const orderDetails = await prisma.order.findMany({
      where: { userId: userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
        orderAddress: true,
        members: true,
      },
    });


    const [groupOrders, selfOrders] = await Promise.all([
      prisma.order.findMany({
        where: {
          orderType: "group",
          members: {
            some: {
              memberId: userId,
            },
          },
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: true,
                },
              },
            },
          },
          orderAddress: true,
          members: true,
        },
      }),
      prisma.order.findMany({
        where: {
          orderType: "self",
          userId: userId,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: true,
                },
              },
            },
          },
          orderAddress: true,
        },
      }),
    ]);

    const allOrders = [...groupOrders, ...selfOrders];



    const orders = allOrders.map((order) => ({
      id: order.id,
      userId: order.userId,
      totalPrice: order.totalPrice,
      orderType: order.orderType,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      orderAddress: order.orderAddress,
      items: order.items.map((item) => ({
        itemId: item.id,
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        discountedPrice: item.product.discountedPrice,
        images: item.product.images.map((image) => image.url),
      })),
      members: order?.members,
    }));


    if (!orders) {
      return res.json({ status: false, msg: "No orders created" });
    }

    return res.json({ orders, status: true });
  } catch (error) {
    next(error);
  }
};

export const VerifyMember = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const prisma = getPrismaInstance();
    const member = await prisma.user.findUnique({
      where: {
        phone: phone,
      },
    });

    if (member) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    next(error);
  }
};

const updateGroupOrder = async (userId, orderId) => {
  try {
    const prisma = getPrismaInstance();
    const updatedMember = await prisma.member.updateMany({
      where: {
        memberId: userId,
        orderId: orderId,
      },
      data: {
        paymentStatus: "Paid",
      },
    });

    const members = await prisma.member.findMany({
      where: {
        orderId: orderId,
      },
    });

    // Check if all members have paymentStatus as 'Paid'
    const allPaid = members.every(member => member.paymentStatus === 'Paid');

    if (allPaid) {
      // Update the order's payment status to 'Paid'
      const updatedOrder = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          paymentStatus: 'Paid',
        },
      });
    }

  } catch (error) {
    console.log("Error while updating order:", error);
    throw error;
  }
};
