import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Category } from "../features/category/types";
import { formatDateTime } from '../utils/dateTime';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';

type CategoriesTableProps = {
  categories: Category[];
}

function CategoriesTable(props: CategoriesTableProps) {
  const { categories } = props;

  return (
    <Paper>
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Typography variant="h6">
          Categories List
        </Typography>
        <Box>
          <AddCategory />
        </Box>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            categories.map(category => {
              return (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{formatDateTime(category.createdAt)}</TableCell>
                  <TableCell>{formatDateTime(category.updatedAt)}</TableCell>
                  <TableCell align="center">
                    <EditCategory category={category} />
                    <DeleteCategory category={category} />
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </Paper>
  )
}

export default CategoriesTable;