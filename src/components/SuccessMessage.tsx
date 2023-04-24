import { forwardRef, useState, useEffect } from "react";
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
};

function SuccessMessage({ open, message, onClose }: SuccessMessageProps) {
  const [openAlert, setOpenAlert] = useState(false);
  useEffect(() => {
    setOpenAlert(open);
  }, [open]);

  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => {
        setOpenAlert(false);
      }}
    >
      <Alert
        severity="success"
        sx={{ width: "100%" }}
        onClose={() => {
          setOpenAlert(false);
          if (onClose) {
            onClose();
          }
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SuccessMessage;
