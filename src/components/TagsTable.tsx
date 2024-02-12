import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Tag } from "../features/tag/types";
import { formatDateTime } from "../utils/dateTime";

type TagsTableProps = {
  tags: Tag[];
};
function TagsTable(props: TagsTableProps) {
  const { tags } = props;

  return (
    <Paper>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Tags List</Typography>
        <Box>Add tag button here</Box>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map((tag) => {
            return (
              <TableRow key={tag.id}>
                <TableCell>{tag.name}</TableCell>
                <TableCell>{formatDateTime(tag.createdAt)}</TableCell>
                <TableCell>{formatDateTime(tag.updatedAt)}</TableCell>
                <TableCell align="center">Edit tag, Delete tag</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default TagsTable;
