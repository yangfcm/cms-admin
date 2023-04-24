import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import NewBlogForm from "./NewBlogForm";

type NewBlogDialogProps = {
  open: boolean;
  onClose?: () => void;
};

function NewBlogDialog(props: NewBlogDialogProps) {
  const { open, onClose } = props;

  return (
    <Dialog open={open}>
      <DialogTitle>
        {onClose && (
          <IconButton
            onClick={onClose}
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
      <DialogContent>
        <NewBlogForm />
      </DialogContent>
    </Dialog>
  );
}

export default NewBlogDialog;
