import { Category } from "../../category/models/category.model";

export interface BlogPost {  //BlogPostDto
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  author: string;
  publishedDate: Date;
  isVisible: boolean;          //inside it there is
  categories: Category[]; // CategoryDto
}
