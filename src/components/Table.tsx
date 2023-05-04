import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Column<RowData> {
  field: string;
  title: string | JSX.Element;
}

interface Cell {
  field: string;
  value: any;
}

interface TableProps<RowData> {
  keyField?: string;
  data: RowData[];
  columns: Column<RowData>[];
}

function AppTable<RowData>(props: TableProps<RowData>) {
  const { data: dataProp, columns, keyField = "id" } = props;
  const [data, setData] = useState<RowData[]>(dataProp);

  useEffect(() => {
    setData(dataProp);
  }, [dataProp]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => {
              return (
                <TableCell key={col.field} sx={{ fontWeight: 600 }}>
                  {col.title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Record<string, any>) => {
            const cells: Cell[] = [];
            columns.forEach((col) => {
              cells.push({
                field: col.field,
                value: row[col.field],
              });
            });
            return (
              <TableRow key={row[keyField]}>
                {cells.map((cell) => {
                  return <TableCell key={cell.field}>{cell.value}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AppTable;
