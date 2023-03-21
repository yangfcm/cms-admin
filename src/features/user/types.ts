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
};

export type UserResponse = {
  user: User
}