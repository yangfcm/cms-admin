import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import SignUpForm from "../components/forms/SignUpForm";
import AuthPageLayout from "../components/AuthPageLayout";

function SignUp() {
  return (
    <AuthPageLayout
      title="Sign Up"
      authForm={<SignUpForm />}
      footer={
        <Link component={RouterLink} to="/signin" variant="body2">
          Have an account? Sign In
        </Link>
      }
    />
  );
}

export default SignUp;
