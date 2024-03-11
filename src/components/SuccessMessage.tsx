import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type SuccessMessageProps = {
  open: boolean;
  message: string;
  onClose?: () => void;
  autoHideduration?: number;
  sx?: Object;
};

function SuccessMessage({
  open,
  message,
  onClose,
  autoHideduration = 6000,
  sx = {},
}: SuccessMessageProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideduration}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={() => {
        onClose && onClose();
      }}
      sx={sx}
    >
      <Alert
        severity="success"
        sx={{ width: "100%" }}
        onClose={() => {
          onClose && onClose();
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SuccessMessage;
