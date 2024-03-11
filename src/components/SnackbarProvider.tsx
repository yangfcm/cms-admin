import { createContext, useContext, useState, useCallback } from "react";
import SuccessMessage from "./SuccessMessage";

const SnackbarContext = createContext<{
  addSnackbar: (message: string) => void;
}>({
  addSnackbar: () => {},
});

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

function SnackbarProvider({ children }: { children: JSX.Element }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const addSnackbar = useCallback(
    (message: string) => {
      setOpen(true);
      setMessage(message);
    },
    [setOpen, setMessage]
  );

  return (
    <SnackbarContext.Provider value={{ addSnackbar }}>
      <>
        <SuccessMessage
          open={open}
          message={message}
          onClose={() => setOpen(false)}
        />
        {children}
      </>
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;
