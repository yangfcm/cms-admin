import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

type PageTitleProps = {
  title?: string;
};

function PageTitle(props: PageTitleProps) {
  const { title = "Page title" } = props;
  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        {title}
      </Typography>
      <Divider sx={{ marginBottom: 1 }} />
    </>
  );
}

export default PageTitle;
