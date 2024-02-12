import { forwardRef, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircleIcon from "@mui/icons-material/Circle";
import parseError from "../utils/parseError";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type ErrorMessageProps = {
  open: boolean;
  messages: any;
  autoHideduration?: number;
  onClose?: () => void;
};

function ErrorMessage({
  open,
  messages,
  autoHideduration = 6000,
  onClose,
}: ErrorMessageProps) {
  const [openAlert, setOpenAlert] = useState(false);
  useEffect(() => {
    setOpenAlert(open);
  }, [open]);

  const parsedErrorMessages = parseError(messages);

  return (
    <Snackbar
      open={openAlert}
      autoHideDuration={autoHideduration}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={() => {
        setOpenAlert(false);
        onClose && onClose();
      }}
    >
      <Alert
        severity="error"
        sx={{ width: "100%" }}
        onClose={() => setOpenAlert(false)}
      >
        {typeof parsedErrorMessages === "string" ? (
          <>{parsedErrorMessages}</>
        ) : parsedErrorMessages.length === 1 ? (
          <>{parsedErrorMessages[0]}</>
        ) : (
          <>
            <AlertTitle>Error</AlertTitle>
            <>
              {parsedErrorMessages.map((message) => (
                <div key={message}>
                  <CircleIcon sx={{ fontSize: 8 }} /> {message}
                </div>
              ))}
            </>
          </>
        )}
      </Alert>
    </Snackbar>
  );
}

export default ErrorMessage;
