export type Blog = {
  id: string;
  title: string;
  address: string;
}

export type PostBlog = Pick<Blog, 'title' | 'address'>;

export type BlogResponse = {
  blog: Blog;
}