import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SignUpForm from "../components/SignUpForm";

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
        <SignUpForm />
        <Box sx={{ mt: 2 }}>
          <Link component={RouterLink} to="/signin" variant="body2">
            Have an account? Sign In
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
