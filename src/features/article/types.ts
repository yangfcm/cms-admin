import { Blog } from "../blog/types";
import { Category } from "../category/types";
import { Tag } from "../tag/types";
import { User } from "../user/types";

export enum ArticleStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  TRASH = "trash",
}

export type Article = {
  id: string;
  title: string;
  content: string;
  featuredImage: string;
  status: ArticleStatus;
  isTop: boolean;
  blog: Pick<Blog, "id" | "title" | "address">;
  user: Pick<User, "id" | "username" | "nickname" | "biography" | "avatar">;
  category: Pick<Category, "id" | "name" | "description">;
  tags: Pick<Tag, "id" | "name">[];
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleResponse = {
  article: Article;
};

export type ArticlesResponse = {
  articles: Article[];
};

export type PostArticle = Pick<
  Article,
  "title" | "content" | "featuredImage" | "status" | "isTop"
> & { categoryId: string; tagIds: string[] };
