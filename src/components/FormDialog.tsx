import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

type FormDialogProps = {
  open: boolean;
  form: JSX.Element;
  title?: string;
  subTitle?: string;
}
function FormDialog(props: FormDialogProps) {
  const { form, open, title = '', subTitle = '' } = props;
  
  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{subTitle}</DialogContentText>
        {form}
      </DialogContent>
    </Dialog>
  )
}

export default FormDialog;