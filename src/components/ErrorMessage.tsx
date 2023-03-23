import { forwardRef, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ErrorMessage({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
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
        severity="error"
        sx={{ width: "100%" }}
        onClose={() => setOpenAlert(false)}
      >
        {children}
      </Alert>
    </Snackbar>
  );
}

export default ErrorMessage;
