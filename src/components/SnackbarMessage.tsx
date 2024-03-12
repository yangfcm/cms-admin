import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircleIcon from "@mui/icons-material/Circle";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type SnackbarMessageProps = {
  open: boolean;
  message: string | string[];
  title?: string;
  onClose?: () => void;
  autiHideDuration?: number;
  sx?: Object;
  severity?: "error" | "info" | "success" | "warning";
};

function SnackbarMessage(props: SnackbarMessageProps) {
  const {
    open,
    message,
    title,
    onClose,
    autiHideDuration = 6000,
    sx = {},
    severity = "info",
  } = props;
  return (
    <Snackbar
      open={open}
      autoHideDuration={autiHideDuration}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={() => {
        onClose && onClose();
      }}
      sx={sx}
    >
      <Alert
        severity={severity}
        sx={{ width: "100%" }}
        onClose={() => {
          onClose && onClose();
        }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {Array.isArray(message)
          ? message.map((m, i) => (
              <div key={i}>
                <CircleIcon sx={{ fontSize: 8 }} /> {m}
              </div>
            ))
          : message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarMessage;
