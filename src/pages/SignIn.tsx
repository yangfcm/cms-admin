import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SignInForm from "../components/SignInForm";

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
        <SignInForm />
        <Box sx={{ mt: 2 }}>
          <Link component={RouterLink} to="/signup" variant="body2">
            Do not have an account? Sign Up.
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
