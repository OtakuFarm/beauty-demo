export type Category =
  | "Cleansers"
  | "Serums"
  | "Moisturisers"
  | "Masks"
  | "Sun Care"
  | "Treatments"
  | "Sets";

export type Concern =
  | "hydration"
  | "brightening"
  | "texture"
  | "oil-control"
  | "sensitive";

export type ProductShape = "bottle" | "dropper" | "jar" | "tube" | "pump" | "set";

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  skinType: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  category: Category;
  concerns: Concern[];
  skinTypes: string[];
  size: string;
  shortDescription: string;
  description: string;
  story: string;
  ingredients: { name: string; benefit: string }[];
  howToUse: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  inStock: boolean;
  isBestseller: boolean;
  isNew: boolean;
  shape: ProductShape;
  /** Two tones used to render the generated product artwork. */
  tones: [string, string];
  reviews: Review[];
}
