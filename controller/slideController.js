import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// add slide
export const addSlide = async (req, res) => {
  try {
    const slide = await prisma.slide.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).json({ message: "Slide Added", slide: slide });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// get all slide
export const getSlide = async (req, res) => {
  try {
    const slide = await prisma.slide.findMany({});
    res.status(200).json({ result: slide });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
// get slide by id
export const getSlideById = async (req, res) => {
  try {
    const slide = await prisma.slide.findUnique({
      where: {
        uuid: req.params.id,
      },
    });
    if (!slide) {
      return res.status(404).json({ message: "Slide not found" });
    }
    res.status(200).json(slide);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// update slide
export const updateSlide = async (req, res) => {
  const slide = await prisma.slide.findUnique({
    where: {
      uuid: req.params.id,
    },
  });
  if (!slide) {
    return res.status(404).json({ message: "Slide not found" });
  }
  try {
    const updatedSlide = await prisma.slide.update({
      data: {
        ...req.body,
      },
      where: { uuid: slide.uuid },
    });

    res
      .status(200)
      .json({ message: "Product has been updated", slide: updatedSlide });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// delete slide
export const deleteSlide = async (req, res) => {
  try {
    const slide = await prisma.slide.findUnique({
      where: {
        uuid: req.params.id,
      },
    });
    if (!slide) return res.status(404).json({ message: "Slide not found" });
    await prisma.slide.delete({
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json({ message: "Slide has been deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
