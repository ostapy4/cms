import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email().default(""),
});

export const authSchema = z.object({
  email: z.string().email().default(""),
  password: z.string().nonempty().default(""),
});

export const contactsSchema = z.object({
  firstname: z.string().nonempty("Please write your name").default(""),
  email: z.string().email().default(""),
  phone: z.string().default(""),
  plan: z.string().default(""),
  message: z.string().default(""),
});

export const sheetsSchema = z.object({
  id: z.string().optional(),
  author: z.string().default(""),
  title: z.string().nonempty("Title is required"),
  category: z.string().nonempty("Category is required"),
  level: z.string().default(""),
  genre: z.string().default(""),
  description: z.string().default(""),
  pdfUrl: z.string().nonempty("File is required"),
  preview: z.string().default(""),
  price: z.number().int().default(0),
  griffType: z.string().optional()
});

export const reviewSchema = z.object({
  name: z.string().default(""),
  text: z.string().default(""),
  avatar: z.string().default(""),
});

export const youtubeVideoSchema = z.object({
  url: z.string().nonempty("Url is required"),
});