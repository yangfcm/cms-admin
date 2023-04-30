import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import LoadingButton from "@mui/lab/LoadingButton";
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
  isLoading?: boolean;
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
    isLoading = false,
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
          disabled={isLoading}
        >
          {cancelText}
        </Button>
        <LoadingButton
          type="button"
          loadingPosition="start"
          loading={isLoading}
          disabled={isLoading}
          onClick={onConfirm}
          startIcon={<CheckIcon />}
        >
          {confirmText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
