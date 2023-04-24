import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import NewBlogForm from "./NewBlogForm";
import { Blog } from "../features/blog/types";

type NewBlogDialogProps = {
  open: boolean;
  onClose?: (newBlogAddress?: string) => void;
};

function NewBlogDialog(props: NewBlogDialogProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { open, onClose } = props;
  const [newBlog, setNewBlog] = useState<Pick<Blog, "title" | "address">>();

  return (
    <Dialog open={open} fullScreen={fullScreen}>
      {newBlog ? (
        <>
          <DialogTitle>
            Blog <span style={{ fontWeight: "bold" }}>{newBlog.title}</span> is
            created
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                if (onClose) onClose();
              }}
            >
              Stay here
            </Button>
            <Button
              onClick={() => {
                navigate(`/blog/${newBlog.address}`);
                if (onClose) onClose();
                setNewBlog(undefined);
              }}
            >
              Go to new blog
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>
            {onClose && (
              <IconButton
                onClick={() => onClose()}
                sx={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  color: grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </DialogTitle>
          <Container maxWidth="xs" sx={{ paddingBottom: 5 }}>
            <NewBlogForm onSuccess={(newBlog) => setNewBlog(newBlog)} />
          </Container>
        </>
      )}
    </Dialog>
  );
}

export default NewBlogDialog;
