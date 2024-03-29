export type Category = {
  id: string;
  name: string;
  description?: string;
  blogId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryResponse = {
  category: Category;
};

export type CategoriesResponse = {
  categories: Category[];
};

export type PostCategory = Pick<Category, "name" | "description">;

export type UpdateCategory = Pick<Category, "id"> & Partial<PostCategory>;
