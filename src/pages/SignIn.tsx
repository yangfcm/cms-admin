import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import SignInForm from "../components/forms/SignInForm";
import AuthPageLayout from "../components/AuthPageLayout";

function SignIn() {
  return (
    <AuthPageLayout
      title="Sign In"
      authForm={<SignInForm />}
      footer={
        <Link component={RouterLink} to="/signup" variant="body2">
          Do not have an account? Sign Up.
        </Link>
      }
    />
  );
}

export default SignIn;
