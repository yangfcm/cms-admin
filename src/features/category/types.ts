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

export type AddCategory = Pick<Category, "name" | "description">;

export type PatchCategory = Partial<AddCategory>;
