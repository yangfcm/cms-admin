import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useReadTagsQuery } from "../features/tag/services";
import useUserBlog from "../features/blog/useUserBlog";
import TagsTable from "../components/TagsTable";

function Tags() {
  const { activeBlogAddress } = useUserBlog();
  const { data } = useReadTagsQuery(activeBlogAddress);

  return (
    <Container>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Tags Admin
      </Typography>
      <Divider />
      <TagsTable tags={data?.tags || []} />
    </Container>
  );
}

export default Tags;
