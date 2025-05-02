import { type FileRouter, createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  mainImage: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async () => {}),
  galleryUploader: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 10,
    },
  }).onUploadComplete(async () => {}),
  pdfUploader: f({ pdf: { maxFileSize: "32MB" } }) 
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.ufsUrl };
    }),
  preview: f({ image: {
    maxFileSize: "8MB",
    maxFileCount: 1,
  } }).onUploadComplete(async () => {}),
  avatar: f({ image: {
    maxFileSize: "8MB",
    maxFileCount: 1,
  } }).onUploadComplete(async () => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
