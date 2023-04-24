import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";
import NewBlogForm from "./NewBlogForm";

type NewBlogDialogProps = {
  open: boolean;
  onClose?: () => void;
};

function NewBlogDialog(props: NewBlogDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { open, onClose } = props;

  return (
    <Dialog open={open} fullScreen={fullScreen}>
      <DialogTitle>
        {onClose && (
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              color: grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <Container maxWidth="xs" sx={{ paddingBottom: 5 }}>
        <NewBlogForm />
      </Container>
    </Dialog>
  );
}

export default NewBlogDialog;
