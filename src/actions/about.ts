"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { sectionSchema } from "app/_components/About/SectionForm";

import { prismaDB } from "lib/db";
import { AdminUrls } from "route-urls";

type AboutInfo = z.infer<typeof sectionSchema>;

export const create_info_section = async (data: AboutInfo) => {
  if (data.id) {
    throw new Error("Cannot create a section with an existing ID.");
  }
  try {
    const newSection = await prismaDB.section.create({
      data: {
        header: data.header,
        details: {
          create: data.details.map((detail) => ({
            title: detail.title,
            description: detail.description,
            image: detail.image,
          })),
        },
      },
      include: {
        details: true,
      },
    });

    revalidatePath(AdminUrls.getAboutMe());
    return newSection;
  } catch (error) {
    console.error("Error while creating the section:", error);
    throw new Error("Failed to create the section.");
  }
};

export const update_info_section = async (data: AboutInfo) => {
  if (!data.id) {
    throw new Error("Section ID is required for updating.");
  }

  try {
    const updatedSection = await prismaDB.section.update({
      where: { id: data.id },
      data: {
        header: data.header,
        details: {
          deleteMany: {},
          create: data.details.map((detail) => ({
            title: detail.title,
            description: detail.description,
            image: detail.image,
          })),
        },
      },
      include: {
        details: true,
      },
    });

    revalidatePath(AdminUrls.getAboutMe());
    return updatedSection;
  } catch (error) {
    console.error("Error while updating the section:", error);
    throw new Error("Failed to update the section.");
  }
};

export const delete_info_section = async (sectionId: string) => {
  if (!sectionId) {
    throw new Error("Section ID is required for deletion.");
  }

  try {
    const deletedSection = await prismaDB.section.delete({
      where: { id: sectionId },
      include: {
        details: true,
      },
    });

    revalidatePath(AdminUrls.getAboutMe());

    return deletedSection;
  } catch (error) {
    console.error("Error while deleting the section:", error);
    throw new Error("Failed to delete the section.");
  }
};
