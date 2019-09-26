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
  const { oldPassword, newPassword, confPassword } = values;
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
  return errors;
};
