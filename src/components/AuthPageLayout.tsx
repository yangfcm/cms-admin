import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CreateIcon from "@mui/icons-material/Create";

type AuthPageLayoutProps = {
  authForm: JSX.Element;
  footer?: JSX.Element;
  title?: string;
};

function AuthPageLayout({ authForm, footer, title }: AuthPageLayoutProps) {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "secondary.main", width: 56, height: 56 }}>
          <CreateIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h4" align="center">
          {title}
        </Typography>
        {authForm}
      </Box>
      <Box sx={{ mt: 2 }}>{footer}</Box>
    </Container>
  );
}

export default AuthPageLayout;
