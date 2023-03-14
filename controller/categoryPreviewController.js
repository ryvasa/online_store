import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// add slide
export const addCatPreview = async (req, res) => {
  try {
    const catPreview = await prisma.category_preview.create({
      data: {
        ...req.body,
      },
    });
    res
      .status(200)
      .json({ message: "Preview Added", categoryPreview: catPreview });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// get all preview
export const getCatPreview = async (req, res) => {
  try {
    const preview = await prisma.category_preview.findMany({});
    res.status(200).json(preview);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
// update preview
export const updateCatPreview = async (req, res) => {
  const preview = await prisma.category_preview.findUnique({
    where: {
      uuid: req.params.id,
    },
  });
  if (!preview) {
    return res.status(404).json({ message: "Preview not found" });
  }
  try {
    const updatedPreview = await prisma.category_preview.update({
      data: {
        ...req.body,
      },
      where: { uuid: preview.uuid },
    });

    res
      .status(200)
      .json({ message: "Preview has been updated", slide: updatedPreview });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// delete preview
export const deleteCatPreview = async (req, res) => {
  try {
    const preview = await prisma.category_preview.findUnique({
      where: {
        uuid: req.params.id,
      },
    });
    if (!preview) return res.status(404).json({ message: "Preview not found" });
    await prisma.category_preview.delete({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ message: "Category preview has been deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
