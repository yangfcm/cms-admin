export type Category = {
  id: string;
  name: string;
  description?: string;
  blogId: string;
}

export type CategoryResponse = {
  category: Category;
}

export type CategoriesResponse = {
  categories: Category[];
}

export type PostCategory = Pick<Category, 'name' | 'description'>;

export type PatchCategory = Partial<PostCategory>;