import { Navigate } from "react-router";
import useUserBlog from "../features/blog/useUserBlog";

function Onboarding() {
  const { activeBlog } = useUserBlog();

  if (activeBlog) {
    return <Navigate to={`/blog/${activeBlog.address}`} replace />;
  }
  return <>onboarding...</>;
}

export default Onboarding;
