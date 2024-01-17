import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Category } from "../features/category/types";

type CategoriesTableProps = {
  categories: Category[];
}

function CategoriesTable(props: CategoriesTableProps) {
  const { categories } = props;

  return (
    <Paper>
      <Toolbar>
        <Typography variant="h6" sx={{flex: "1 1 100%"}}>
          Categories List
        </Typography>
      </Toolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            categories.map(category => {
              return (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
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