import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { UserResponse } from "./types";
import { signin as signinAction, signout as signoutAction } from './userSlice';
import { setBlogs } from "../blog/blogSlice";

function useAuth() {
  const dispatch = useAppDispatch();

  const isSignedIn = useSelector(({ user }: RootState) => {
    const { authUser, token, expiresAt } = user;
    if (authUser === undefined || token === undefined || expiresAt === undefined) return null; // If user is signed in or not is unknown initially.
    const isExpired = Date.now() > expiresAt;
    return !!(user.authUser && user.token && !isExpired);
  });

  const authUser = useSelector(({ user }: RootState) => {
    return user.authUser;
  });

  const signin = useCallback(({ user, token, expiresAt }: UserResponse) => {
    // Actions to do when user successfully signed in.
    localStorage.setItem("token", token);
    localStorage.setItem("expiresAt", expiresAt.toString());
    dispatch(signinAction({ user, token, expiresAt }));
    dispatch(setBlogs({ blogs: user.blogs || [] }));
  }, [dispatch, signinAction, setBlogs]);

  const signout = useCallback(() => {
    // Actions to do when user signed out.
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    dispatch(signoutAction());
  }, [dispatch, signoutAction]);

  return { signin, signout, isSignedIn, authUser };
}

export default useAuth;