"use server";

import { Review} from "@prisma/client";
import { prismaDB } from "lib/db";
import { revalidatePath } from "next/cache";
import { AdminUrls } from "route-urls";
import { reviewSchema, youtubeVideoSchema } from "utils/zod-schemas";

type GalleryInput = {
  title: string;
  images: { image: string }[];
};

export const update_gallery = async (data: GalleryInput) => {
  if (!data.title || !Array.isArray(data.images) || data.images.length === 0) {
    throw new Error("You must provide a title and an array of images.");
  }

  try {
    const existingGallery = await prismaDB.gallery.findFirst({
      include: { images: true },
    });

    if (!existingGallery) {
      const newGallery = await prismaDB.gallery.create({
        data: {
          title: data.title,
          images: {
            create: data.images,
          },
        },
        include: { images: true },
      });

      return newGallery;
    }

    const { id: galleryId } = existingGallery;

    await prismaDB.image.deleteMany({
      where: { galleryId },
    });

    await prismaDB.image.createMany({
      data: data.images.map((img) => ({
        image: img.image,
        galleryId,
      })),
    });

    const updatedGallery = await prismaDB.gallery.update({
      where: { id: galleryId },
      data: { title: data.title },
      include: { images: true },
    });

    return updatedGallery;
  } catch (error) {
    console.error("Error while updating the gallery:", error);
    throw new Error("Failed to update the gallery.");
  }
};

export const upload_main_image = async (image: string) => {
  if (!image || typeof image !== "string") {
    throw new Error("Main image is required and must be a valid string");
  }

  try {
    const existingImage = await prismaDB.mainImage.findFirst();

    if (!existingImage) {
      const newMainImage = await prismaDB.mainImage.create({
        data: { image },
      });

      return newMainImage;
    }

    const updatedMainImage = await prismaDB.mainImage.update({
      where: { id: existingImage.id },
      data: { image },
    });

    return updatedMainImage;
  } catch (error) {
    console.error("Error updating main image:", error);

    if (error instanceof Error) {
      throw new Error(`Main image update failed: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while updating the main image",
      );
    }
  }
};

export const create_review = async (review: Omit<Review, "id" | "createdAt">) => {
  const { success, data } = reviewSchema.safeParse(review);

  if (!success) {
    throw new Error(
      "You must provide a name and text.",
    );
  }

  try {
    const newReview = await prismaDB.review.create({
      data,
    });
    revalidatePath(AdminUrls._getRoot())
    return newReview;
  } catch (error) {
    console.error("Error creating review:", error);

    throw new Error(error instanceof Error ? error.message : "An unknown error occurred while creating a new review")
  }
};

export const delete_review = async (id: string) => {
  if (!id) {
    throw new Error("Review ID is required for deletion.");
  }

  try {
    const deletedReview = await prismaDB.review.delete({
      where: { id },
    });
    console.log("deleted review", deletedReview);
    revalidatePath(AdminUrls._getRoot());

    return deletedReview;
  } catch (error) {
    console.error("Error while deleting the review:", error);
    throw new Error("Failed to delete the review.");
  }
};


export const create_youtube_video = async (url: string) => {
  const { success, data } = youtubeVideoSchema.safeParse({url});

  if (!success) {
    throw new Error(
      "You must provide a url.",
    );
  }

  try {
    const newYoutubeVideo = await prismaDB.youtubeVideo.create({
      data,
    });
    revalidatePath(AdminUrls._getRoot())
    return newYoutubeVideo;
  } catch (error) {
    console.error("Error creating video url:", error);

    throw new Error(error instanceof Error ? error.message : "An unknown error occurred while creating a new video url")
  }
};

export const delete_youtube_video = async (id: string) => {
  if (!id) {
    throw new Error("Video ID is required for deletion.");
  }

  try {
    const deletedVideo = await prismaDB.youtubeVideo.delete({
      where: { id },
    });
    console.log("deletedVideo", deletedVideo);
    revalidatePath(AdminUrls._getRoot())

    return deletedVideo;
  } catch (error) {
    console.error("Error while deleting the video:", error);
    throw new Error("Failed to delete the video.");
  }
};
