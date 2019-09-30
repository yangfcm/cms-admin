import axios from "../settings";
import Cookies from "js-cookie";

export const validateLoginInput = values => {
  const errors = {};
  const { loginId, password } = values;

  if (!loginId || loginId.trim().length < 1) {
    errors.loginId = "Email or username cannot be blank";
  }
  // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = "Email is invalid";
  // }

  if (!password || password.trim().length < 1) {
    errors.password = "Password cannot be blank";
  }

  return errors;
};

export const validatePostInput = values => {
  const errors = {};
  const { title, category, content } = values;
  if (!title || title.trim().length < 1) {
    errors.title = "Title cannot be blank";
  }
  if (!category) {
    errors.category = "Category cannot be blank";
  }
  if (!content || content.trim().length < 15) {
    errors.content = "Content must be at least 15 characters";
  }
  return errors;
};

export const validateChangePasswordInput = values => {
  const errors = {};
  const { oldPassword, newPassword, confPassword, password } = values;
  if (!oldPassword) {
    errors.oldPassword = "Old password is required";
  }
  if (!newPassword) {
    errors.newPassword = "New password is required";
  }
  if (!confPassword) {
    errors.confPassword = "Confirm password is required";
  }
  if (newPassword && confPassword && newPassword !== confPassword) {
    errors.confPassword = "Two passwords are different";
    errors.newPassword = "   ";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  if (password && confPassword && password !== confPassword) {
    errors.confPassword = "Two passwords are different";
    errors.password = "   ";
  }
  return errors;
};

export const validateAddAdminInput = values => {
  const errors = {};
  const {
    username,
    firstname,
    lastname,
    email,
    role,
    status,
    password,
    confPassword
  } = values;

  if (!username || username.trim().length < 1) {
    errors.username = "Username is required";
  }
  if (!firstname || firstname.trim().length < 1) {
    errors.firstname = "First Name is required";
  }
  if (!lastname || lastname.trim().length < 1) {
    errors.lastname = "Last Name is required";
  }
  if (!email || email.trim().length < 1) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Email is invalid";
  }

  if (role === undefined) {
    errors.role = " Role is required";
  }
  if (status === undefined) {
    errors.status = "Status is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  if (!confPassword) {
    errors.confPassword = "Confirmation password is required";
  } else if (confPassword !== password) {
    errors.confPassword = "Two passwords are different";
  }

  return errors;
};

/** When adding admin, validate with server to see if username and email is taken */
export const asyncValidateAddAdminInput = async values => {
  const { username, email } = values;
  const token = Cookies.get("admin_token");
  if (username) {
    const response = await axios.get(`/api/admins/find?username=${username}`, {
      headers: { "x-auth": `Bearer ${token}` }
    });
    if (response.data.data) {
      throw { username: `The username ${username} is taken` };
    }
  }
  if (email) {
    const response = await axios.get(`/api/admins/find?email=${email}`, {
      headers: { "x-auth": `Bearer ${token}` }
    });
    if (response.data.data) {
      throw { email: `The Email ${email} is taken` };
    }
  }
};
