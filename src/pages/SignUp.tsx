import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AuthForm from "../components/AuthForm";

function SignUp() {
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
          Sign Up
        </Typography>
        <AuthForm mode="signup" />
      </Box>
    </Container>
  );
}

export default SignUp;
