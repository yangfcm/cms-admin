import axios from "../settings";
import Cookies from "js-cookie";
import { CHANGE_PASSWORD, OPER_PROFILE_ERR } from "./types";

/** Change password */
/**
 * data - should be an object like this:
 *  {
			email: "email@email.com",
			oldPassword: "old-password",
			newPassword: "new-password"
		}
 */
export const changePassword = data => {
  const token = Cookies.get("admin_token");
  return async dispatch => {
    try {
      const response = await axios.post("/api/admins/changePassword", data, {
        headers: { "x-auth": `Bearer ${token}` }
      });
      dispatch({
        type: CHANGE_PASSWORD,
        payload: response.data
      });
    } catch (e) {
      console.log(e.response);
      dispatch({
        type: OPER_PROFILE_ERR,
        payload: e.response ? e.response.data : e
      });
    }
  };
};
