import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useTable from "../components/Table";
import { useReadCategoriesQuery } from "../features/category/services";
import useUserBlog from "../features/blog/useUserBlog";
import { Category } from "../features/category/types";

function Categories() {
  const { activeBlog } = useUserBlog();
  const [addingData, setAddingData] = useState(false);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const { data, isSuccess, isError, isLoading } = useReadCategoriesQuery(
    activeBlog?.address || ""
  );

  useEffect(() => {
    if (data) {
      setCategoriesData(data.categories);
    }
  }, [data]);

  const Table = useTable<Category>(
    [
      {
        accessorKey: "name",
        header: "Name",
        accessorFn: (row) => {},
      },
      {
        accessorKey: "description",
        header: "Description",
        accessorFn: (row) => {},
      },
    ],
    data?.categories || []
  );

  return (
    <Container>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Categories Admin
      </Typography>
      <Divider />
      <br />
      <Table
        state={{
          isLoading,
        }}
        enableAdding
        addingText="Add category"
      />
    </Container>
  );
}

export default Categories;
