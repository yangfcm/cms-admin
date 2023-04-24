import { useState } from "react";
import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import { grey } from "@mui/material/colors";
import useUserBlog from "../features/blog/useUserBlog";
import NewBlogDialog from "./NewBlogDialog";

function BlogsMenu() {
  const { blogs = [], activeBlog, setActiveBlog } = useUserBlog();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openNewBlogDialog, setOpenNewBlogDialog] = useState(false);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickListItem}
        endIcon={<KeyboardArrowDownIcon />}
        fullWidth
      >
        {activeBlog?.title}
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
        sx={{
          minWidth: "180px",
        }}
      >
        <MenuItem disabled>Your Blogs</MenuItem>
        {blogs.map((blog) => (
          <MuiLink
            component={Link}
            to={`/blog/${blog.address}`}
            underline="none"
            color={grey["900"]}
            key={blog.id}
          >
            <MenuItem
              selected={activeBlog?.address === blog.address}
              onClick={() => {
                setActiveBlog(blog.address);
              }}
            >
              {blog.title}
            </MenuItem>
          </MuiLink>
        ))}
        <Divider />
        <Button onClick={() => setOpenNewBlogDialog(true)}>
          Create a Blog
        </Button>
      </Menu>
      <NewBlogDialog
        open={openNewBlogDialog}
        onClose={() => setOpenNewBlogDialog(false)}
      />
    </>
  );
}

export default BlogsMenu;
