import { forwardRef, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SuccessMessage({ open, message }: { open: boolean; message: string }) {
  const [openAlert, setOpenAlert] = useState(false);
  useEffect(() => {
    setOpenAlert(open);
  }, [open]);

  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => setOpenAlert(false)}
    >
      <Alert
        severity="success"
        sx={{ width: "100%" }}
        onClose={() => setOpenAlert(false)}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SuccessMessage;
