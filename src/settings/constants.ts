export const EMAIL_REQUIRED = "Email is required.";
export const INVALID_EMAIL = "The email address you input is invalid.";
export const PASSWORD_REQUIRED = "Password is required.";
export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_TOO_SHORT = `Passowrd should be at least ${PASSWORD_MIN_LENGTH} characters`;
export const USERNAME_REQUIRED = "Username is required.";
export const INVALID_USERNAME = "Username contains invalid characters.";
export const USERNAME_MAX_LENGTH = 20;
export const USERNAME_TOO_LONG = `Username cannot exceed ${USERNAME_MAX_LENGTH} characters`;
export const USERNAME_OR_EMAIL_REQUIRED = "Username or email is required.";
export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL + "/api";
export const DEFAULT_ERROR_MESSAGE = "Something bad happend.";
export const SIDEBAR_WIDTH = 220;
export const BLOG_TITLE_REQUIRED = "Blog name is required";
export const BLOG_ADDRESS_REQUIRED = "Address is required";
export const BLOG_ADDRESS_INVALID = "Address contains  invalid characters.";
export const BLOG_TITLE_MAX_LENGTH = 50;
export const BLOG_TITLE_TOO_LONG = `Blog name cannot exceed ${BLOG_TITLE_MAX_LENGTH} characters.`;
export const BLOG_CREATED = `Blog is created.`;
export const CREATE_BLOG_CACHE_KEY = "CREATE_BLOG_CACHE_KEY";
export const BLOG_DELETED = "Blog is deleted.";
export const DELETE_BLOG_CACHE_KEY = "DELETE_BLOG_CACHE_KEY";

export const CATEGORY_CREATE_FIXED_CACHE_KEY =
  "CATEGORY_CREATE_FIXED_CACHE_KEY";
export const CATEGORY_UPDATE_FIXED_CACHE_KEY =
  "CATEGORY_UPDATE_FIXED_CACHE_KEY";
export const CATEGORY_DELETE_FIXED_CACHE_KEY =
  "CATEGORY_DELETE_FIXED_CACHE_KEY";
export const CATEGORY_CREATED = "Category is created successfully.";
export const CATEGORY_UPDATED = "Category is updated successfully.";
export const CATEGORY_DELETED = "Category is deleted successfully.";
export const CATEGORY_NAME_REQUIRED = "Category name is required.";

export const TAG_CREATE_FIXED_CACHE_KEY = "TAG_CREATE_FIXED_CACHE_KEY";
export const TAG_UPDATE_FIXED_CACHE_KEY = "TAG_UPDATE_FIXED_CACHE_KEY";
export const TAG_DELETE_FIXED_CACHE_KEY = "TAG_DELETE_FIXED_CACHE_KEY";
export const TAG_NAME_REQUIRED = "Tag name is required.";
export const TAG_CREATED = "Tag is created successfully.";
export const TAG_UPDATED = "Tag is updated successfully.";
export const TAG_DELETED = "Tag is deleted successfully.";

export const ARTICLE_TITLE_REQUIRED = "Article's title is required.";
