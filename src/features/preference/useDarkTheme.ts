import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { setDarkTheme as setDarkThemeSetting } from "./preferenceSlice";

export function useDarkTheme() {
  const dispatch = useAppDispatch();
  const darkTheme = useSelector((state: RootState) => state.preference.darkTheme);
  const setDarkTheme = useCallback(
    (dark: boolean) => {
      dispatch(setDarkThemeSetting(dark));
      localStorage.setItem("dark", dark ? "1" : "0");
    },
    [dispatch]
  );
  return { darkTheme, setDarkTheme };
}