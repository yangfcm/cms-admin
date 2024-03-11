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
  const [openAlert, setOpenAlert] = useState(false);
  useEffect(() => {
    setOpenAlert(open);
  }, [open]);

  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={autoHideduration}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={() => {
        setOpenAlert(false);
        if (onClose) {
          onClose();
        }
      }}
      sx={sx}
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
