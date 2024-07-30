import getPrismaInstance from "../utils/PrismaClient.js";

export const AddAddress = async (req, res, next) => {
  try {
    const { address } = req.body;
    console.log(address)

    if (!address) {
      return res.json({ msg: "All fields are required.", status: false });
    }

    const prisma = getPrismaInstance();
    const userExist = await prisma.user.findUnique({
      where: { id: address.userId },
    });

    if (!userExist) {
      return res.json({ msg: "User does not exist.", status: false });
    }

    const AddedAddress = await prisma.address.create({
        data: {
          userId:address.userId, 
          pincode:address.pinCode,
          city:address.city,
          name:address.name,
          phoneNumber:address.phoneNumber,
          addressDetail:address.addressDetail,
          addressType:address.addressType,
        },
      });
    if (AddedAddress) {
      return res.json({
        msg: "New Address added successfully..",
        status: true,
        AddedAddress
      });
    }

    return res.json({
      msg: "Error while adding category in server.",
      status: false,
    });
  } catch (err) {
    next(err);
  }
};


export const GetAllAddress = async (req, res, next) => {
  try {
    const userData = req.authenticatedUser;
    const userId = userData.id;
    const prisma = getPrismaInstance();

    const userExist = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExist) {
      return res.json({ msg: "User does not exist.", status: false });
    }

    const addresses = await prisma.address.findMany({
      where: { userId: userId } // Replace userId with the actual user ID
    });

    if (addresses) {
      return res.json({ addresses, status: true });
    }
    return res.json({ msg: "Error while getting addresses", status: false });
  } catch (err) {
    next(err);
  }
};


export const DeleteAddress = async (req, res, next) => {
  try {
    const { selectedAddressId } = req.body;

    if (!selectedAddressId) {
      return res.json({ msg: "All fields are required.", status: false });
    }

    const prisma = getPrismaInstance();
    const addressId = await prisma.address.findUnique({
      where: {
        id: selectedAddressId,
      }
    });

    if (!addressId) {
      return res.json({
        msg: "Address does not exist.",
        status: false,
      });
    }

    const deletedAddress = await prisma.address.delete({
      where: {
        id: selectedAddressId,
      },
    });

    if (!deletedAddress) {
      return res.json({ msg: "Error while deleting address", status: false });
    }

    return res.json({
      msg: "Successfully deleted the address.",
      status: true,
    });
  } catch (err) {
    next(err);
  }
};

