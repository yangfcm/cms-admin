import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Article } from "../../features/article/types";
import { formatDateTime } from "../../utils/dateTime";

type ArticlesTableProps = {
  articles?: Article[];
};

function ArticlesTable(props: ArticlesTableProps) {
  const { articles = [] } = props;

  return (
    <Paper>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Articles List</Typography>
        <Box>
          <MuiLink component={Link} to="../write-article">
            <Button variant="contained" startIcon={<AddCircleIcon />}>
              Write Article
            </Button>
          </MuiLink>
        </Box>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Top</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map((article) => {
            return (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.category.name}</TableCell>
                <TableCell>
                  {article.tags.map((tag) => tag.name).join(", ")}
                </TableCell>
                <TableCell>{article.isTop ? "Yes" : "No"}</TableCell>
                <TableCell>{article.status}</TableCell>
                <TableCell>{formatDateTime(article.createdAt)}</TableCell>
                <TableCell>{formatDateTime(article.updatedAt)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default ArticlesTable;
