"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prismaDB } from "lib/db";
import { sheetsSchema } from "utils/zod-schemas";

import { AdminUrls } from "route-urls";

type SheetsInput = z.infer<typeof sheetsSchema>;

export const upload_sheets = async (formData: SheetsInput) => {
  const { success, data } = sheetsSchema.safeParse(formData);
    if (!success) {
    throw new Error(
      "You must provide a title, description, price and sheet music URL.",
    );
  }

  try {
    const sheet = await prismaDB.sheetMusic.create({
      data: {
        author: data.author,
        title: data.title,
        description: data.description,
        category: data.category,
        level: data.level,
        genre: data.genre,
        price: data.price,
        pdfUrl: data.pdfUrl,
        preview: data.preview,
        griffType: data?.griffType
      },
    });
    revalidatePath(AdminUrls.getSheetMusic());
    return sheet;
  } catch (error) {
    console.error("Error while uploading sheet music:", error);
    throw new Error("Failed to upload sheet music.");
  }
};

export async function update_sheet(formData: SheetsInput) {
  const { success, data } = sheetsSchema.safeParse(formData);

  if (!success) {
    throw new Error(
      "You must provide a title, description, price and sheet music URL.",
    );
  }
  if (!data.id) {
    throw new Error("Sheet ID is required to update a sheet.");
  }
  try {
    const sheet = await prismaDB.sheetMusic.update({
      where: {
        id: data.id,
      },
      data: {
        title:data.title,
        author: data.author,
        category: data.category,
        description: data.description,
        level: data.level,
        genre: data.genre,
        pdfUrl: data.pdfUrl,
        preview: data.preview,
        price: data.price,
        griffType: data?.griffType
      },
    });
    revalidatePath(AdminUrls.getSheetMusic());
    return sheet;
  } catch (error) {
    console.error("Error while updating sheet music:", error);
    throw new Error("Failed to update sheet music.");
  }
}

export async function delete_sheet(id: string) {
  if (!id) throw new Error("Id is required to delete a sheet.");

  try {
    await prismaDB.sheetMusic.delete({
      where: {
        id,
      },
    });
    revalidatePath(AdminUrls.getSheetMusic());
  } catch (error) {
    console.error("Error while deleting sheet music:", error);
    throw new Error("Failed to delete sheet music.");
  }
}
