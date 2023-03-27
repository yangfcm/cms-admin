import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import parseError from "../../utils/parseError";
import { useSigninMutation } from "./services";
import { SignInUser, UserResponse } from "./types";
import { signin as signinAction, signout as signoutAction } from './userSlice';
import { setBlogs, resetBlog } from "../blog/blogSlice";

function useAuth() {
  const dispatch = useAppDispatch();
  const [signinMutation, { isError, isLoading, isSuccess, error: signinError }] = useSigninMutation();

  const isSignedIn = useSelector(({ user }: RootState) => {
    const { authUser, token, expiresAt } = user;
    if (authUser === undefined || token === undefined || expiresAt === undefined) return null; // If user is signed in or not is unknown initially.
    const isExpired = Date.now() > expiresAt;
    return !!(user.authUser && user.token && !isExpired);
  });

  const authUser = useSelector(({ user }: RootState) => {
    return user.authUser;
  });

  const error = useMemo(() => {
    if (!signinError) return '';
    return parseError(signinError);
  }, [signinError]);

  const signin = useCallback(async (signinData: SignInUser | UserResponse) => {
    try {
      let { user, token, expiresAt } = signinData as UserResponse;
      if ((signinData as SignInUser).usernameOrEmail && (signinData as SignInUser).password && (!user || !token || !expiresAt)) {
        const signinResponse = await signinMutation(signinData as SignInUser).unwrap();
        user = signinResponse.user;
        token = signinResponse.token;
        expiresAt = signinResponse.expiresAt;
      }
      localStorage.setItem("token", token);
      localStorage.setItem("expiresAt", expiresAt.toString());
      dispatch(signinAction({ user, token, expiresAt }));
      dispatch(setBlogs({ blogs: user.blogs || [] }));
    } catch (err: any) {
      dispatch(signoutAction());
      dispatch(resetBlog());
    }
  }, [dispatch, signinMutation, signoutAction, resetBlog]);

  const signout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    dispatch(signoutAction());
    dispatch(resetBlog())
  }, [dispatch, signoutAction, resetBlog]);

  return { signin, signout, isError, isLoading, isSuccess, isSignedIn, error, authUser };
}

export default useAuth;