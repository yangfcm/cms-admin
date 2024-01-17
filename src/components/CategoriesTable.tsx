import { Paper } from "@mui/material";
import { Category } from "../features/category/types";

type CategoriesTableProps = {
  categories: Category[];
}

function CategoriesTable(props: CategoriesTableProps) {
  return (
    <Paper>
      Cateogires
    </Paper>
  )
}

export default CategoriesTable;