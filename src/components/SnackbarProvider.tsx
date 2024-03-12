import { createContext, useContext, useState, useCallback } from "react";
import SnackbarMessage from "./SnackbarMessage";

type SnackbarValue = {
  message: string | string[];
  severity?: "error" | "info" | "success" | "warning";
};

const SnackbarContext = createContext<{
  addSnackbar: (value: SnackbarValue) => void;
}>({
  addSnackbar: () => {},
});

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
function SnackbarProvider({ children }: { children: JSX.Element }) {
  const [open, setOpen] = useState(false);
  const [snackbarValue, setSnackbarValue] = useState<SnackbarValue>({
    message: "",
    severity: "info",
  });

  const addSnackbar = useCallback(
    (value: SnackbarValue) => {
      setOpen(true);
      setSnackbarValue(value);
    },
    [setOpen, setSnackbarValue]
  );

  return (
    <SnackbarContext.Provider value={{ addSnackbar }}>
      <>
        <SnackbarMessage
          open={open}
          message={snackbarValue.message}
          severity={snackbarValue.severity}
          onClose={() => setOpen(false)}
        />
        {children}
      </>
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;
