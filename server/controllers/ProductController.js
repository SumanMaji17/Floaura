import getPrismaInstance from "../utils/PrismaClient.js";

export const AddProduct = async (req, res, next) => {
  try {
    const {
      productName,
      imageURLs,
      description,
      price,
      discountedPrice,
      stock,
      categorys,
    } = req.body;

    if (
      !productName &&
      !imageURLs &&
      !description &&
      !price &&
      !discountedPrice &&
      !stock &&
      !categorys
    ) {
      return res.json({ msg: "All fields are required.", status: false });
    }

    const prisma = getPrismaInstance();
    const ProductExist = await prisma.category.findUnique({
      where: { name: productName },
    });

    if (ProductExist) {
      return res.json({
        msg: "Product already exist with the same name.",
        status: false,
      });
    }

    const existingCategories = await prisma.category.findMany({
      where: { name: { in: categorys } },
    });

    if (!existingCategories) {
      return res.json({
        msg: "Category not found.",
        status: false,
      });
    }

    const addedProduct = await prisma.product.create({
      data: {
        name: productName,
        images: {
          createMany: {
            data: imageURLs.map((url) => ({ url })),
          },
        },
        description: description,
        price: price,
        discountedPrice: discountedPrice,
        stock: stock,
        categories: {
          create: existingCategories?.map((category) => ({
            category: {
              connect: {
                id: category.id,
              },
            },
          })),
        },
      },
    });

    return res.json({
      msg: "Product added successfully..",
      status: true,
      AddedProduct: addedProduct,
    });
  } catch (err) {
    next(err);
  }
};

export const GetAllProduct = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const products = await prisma.product.findMany({
      include: { categories: true, images: true, ratings: true },
    });

        // Fetch ratings for each product separately
        const productIds = products.map(product => product.id);
        const ratings = await prisma.ratings.findMany({
          where: {
            productId: { in: productIds }
          }
        });
    
        // Calculate the average rating and the number of reviews for each product
        const ratingsMap = ratings.reduce((acc, rating) => {
          if (!acc[rating.productId]) {
            acc[rating.productId] = { sum: 0, count: 0 };
          }
          acc[rating.productId].sum += rating.rating;
          acc[rating.productId].count += 1;
          return acc;
        }, {});
    
        const productsWithRatings = products.map(product => {
          const { sum = 0, count = 0 } = ratingsMap[product.id] || {};
          const avgRating = count > 0 ? sum / count : null;
          return {
            ...product,
            avgRating, // Include the average rating
            reviewCount: count, // Include the number of reviews
          };
        });
    

    if (products.length) {
      return res.json({ products:productsWithRatings, status: true });
    } else {
      return res.json({ msg: "Error while fetching products", status: false });
    }
  } catch (err) {
    next(err);
  }
};
