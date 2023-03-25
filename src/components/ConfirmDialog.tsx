import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { grey } from "@mui/material/colors";

type ConfirmDialogProps = {
  title?: string;
  contentText?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: (e: React.MouseEvent<HTMLElement>) => void;
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
};

function ConfirmDialog(props: ConfirmDialogProps) {
  const {
    open,
    title = "Are you sure?",
    contentText,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
  } = props;

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      {contentText && (
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button
          onClick={onCancel}
          startIcon={<CancelIcon />}
          style={{ color: grey[600] }}
        >
          {cancelText}
        </Button>
        <Button onClick={onConfirm} startIcon={<CheckIcon />}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
