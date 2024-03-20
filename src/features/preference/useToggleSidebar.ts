import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  setOpenSidebar as setOpenSidebarSetting,
} from "./preferenceSlice";
import { RootState } from "../../app/store";

export function useToggleSidebar() {
  const dispatch = useAppDispatch();
  const openSidebar = useSelector((state: RootState) => state.preference.openSidebar);
  const setOpenSidebar = (open: boolean) => {
    dispatch(setOpenSidebarSetting(open));
  };
  return { openSidebar, setOpenSidebar };
}