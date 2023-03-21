import { AxiosResponse } from 'axios';
import appAxios from '../../settings/axios';
import { SignUpUser, SignInUser, UserResponse } from './types'

export const signup = async (user: SignUpUser): Promise<AxiosResponse<UserResponse>> => {
  return await appAxios.post('/auth/signin', user);
};

export const signin = async (user: SignInUser): Promise<AxiosResponse<UserResponse>> => {
  return await appAxios.post('/auth/signin', { ideneity: user.usernameOrEmail, password: user.password });
};