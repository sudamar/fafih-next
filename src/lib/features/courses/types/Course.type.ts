// src/types/course.ts
import type { StaticImageData } from "next/image";

export type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  image?: string | StaticImageData; // aceita URL ou import estático
  slug?: string;
};
