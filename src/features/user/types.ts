import { Blog } from "../blog/types";

export type SignUpUser = {
  email: string;
  username: string;
  password: string;
}

export type SignInUser = {
  usernameOrEmail: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  username: string;
  nickname?: string;
  biography?: string;
  avatar?: string;
  blogs?: Blog[]
};

export type UserResponse = {
  user: User;
  token: string;
  expiresAt: number;
};