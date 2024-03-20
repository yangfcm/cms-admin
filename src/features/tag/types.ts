export type Tag = {
  id: string;
  name: string;
  blogId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TagsResponse = {
  tags: Tag[];
};

export type TagResponse = {
  tag: Tag;
};

export type PostTag = Pick<Tag, "name">;

export type UpdateTag = Pick<Tag, "id"> & Partial<PostTag>;
