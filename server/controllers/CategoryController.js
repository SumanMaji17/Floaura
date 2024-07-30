import getPrismaInstance from "../utils/PrismaClient.js";

export const AddCategory = async (req, res, next) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.json({ msg: "All fields are required.", status: false });
    }

    const prisma = getPrismaInstance();
    const categoryExist = await prisma.category.findUnique({
      where: { name: category },
    });

    if (categoryExist) {
      return res.json({ msg: "Category already exist.", status: false });
    }

    const AddedCategory = await prisma.category.create({
      data: { name: category },
    });

    if (AddedCategory) {
      return res.json({
        msg: "Category added successfully..",
        status: true,
        AddedCategory: {
          ...AddedCategory,
          productCount: 0,
        },
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

export const GetAllCategory = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const categoriesWithProductCount = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        products: {
          select: {
            id: true,
          },
        },
      },
    });

    const categories = categoriesWithProductCount.map((category) => ({
      id: category.id,
      name: category.name,
      productCount: category.products.length,
    }));

    if (categories) {
      return res.json({ categories, status: true });
    }
    return res.json({ msg: "Error while getting category", status: false });
  } catch (err) {
    next(err);
  }
};

export const DeleteCategory = async (req, res, next) => {
  try {
    const { selectedCategoryId } = req.body;

    if (!selectedCategoryId) {
      return res.json({ msg: "All fields are required.", status: false });
    }

    const prisma = getPrismaInstance();
    const categoryId = await prisma.category.findUnique({
      where: {
        id: selectedCategoryId,
      },
      select: {
        id: true,
        name: true,
        products: {
          select: {
            id: true,
          },
        },
      },
    });

    const productCount = categoryId.products.length;

    if (productCount > 0) {
      return res.json({
        msg: "Cannot delete a category with products.",
        status: false,
      });
    }

    const deletedCategory = await prisma.category.delete({
      where: {
        id: selectedCategoryId,
      },
    });

    if (!deletedCategory) {
      return res.json({ msg: "Error while deleting category", status: false });
    }

    return res.json({
      msg: "Successfully deleted the category.",
      status: true,
    });
  } catch (err) {
    next(err);
  }
};

export const UpdateCategory = async (req, res, next) => {
  try {
    const { categoryName, categoryId } = req.body;
  
    if (!categoryName || !categoryId) {
      return res.json({ msg: "All fields are required.", status: false });
    }

    const prisma = getPrismaInstance();
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
        products: {
          select: {
            id: true,
          },
        },
      },
    });

    const productCount = category.products.length;

    if (productCount > 0) {
      return res.json({
        msg: "Cannot update a category with products.",
        status: false,
      });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { name: categoryName },
    });

    return res.json({
      msg: "Successfully updated the category...",
      categoryUpdated: updatedCategory,
      status: true,
    });
  } catch (err) {
    next(err);
  }
};
