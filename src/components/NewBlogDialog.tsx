import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import NewBlogForm from "./NewBlogForm";

function NewBlogDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create a Blog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              color: grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <NewBlogForm />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewBlogDialog;
