import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AuthForm from "../components/AuthForm";

function SignIn() {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          paddingTop: 6,
          dislay: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          Sign In
        </Typography>
        <AuthForm mode="signin" />
      </Box>
    </Container>
  );
}

export default SignIn;
