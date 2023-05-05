import { useState, useEffect, useCallback } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import WarningIcon from "@mui/icons-material/Warning";
import { grey } from "@mui/material/colors";

interface Column<RowData> {
  field: string;
  title: string | JSX.Element;
  render?: (value: any, row: RowData) => JSX.Element | string;
}

interface Cell {
  field: string;
  value: any;
  render?: JSX.Element | string;
}

interface TableProps<RowData> {
  data: RowData[];
  columns: Column<RowData>[];
  keyField?: string;
  isLoading?: boolean;
}

function AppTable<RowData>(props: TableProps<RowData>) {
  const { data: dataProp, columns, keyField = "id", isLoading = false } = props;
  const [data, setData] = useState<RowData[]>(dataProp);

  useEffect(() => {
    setData(dataProp);
  }, [dataProp]);

  const renderTableHead = useCallback(() => {
    return (
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
    );
  }, [columns]);

  const renderLoader = useCallback(() => {
    if (!isLoading) return null;
    return (
      <TableRow>
        <TableCell colSpan={columns.length} sx={{ p: 0 }}>
          <LinearProgress />
        </TableCell>
      </TableRow>
    );
  }, [columns.length, isLoading]);

  const renderNoData = useCallback(() => {
    if (data.length) return null;
    return (
      <TableRow>
        <TableCell colSpan={columns.length} align="center">
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{ color: grey[600] }}
          >
            <WarningIcon sx={{ fontSize: 30 }} />
            <Typography variant="h5">No data</Typography>
          </Stack>
        </TableCell>
      </TableRow>
    );
  }, [columns.length, data]);

  return (
    <TableContainer component={Paper}>
      <Table>
        {renderTableHead()}
        <TableBody>
          {renderLoader()}
          {renderNoData()}
          {data.map((row: Record<string, any>) => {
            const cells: Cell[] = [];
            columns.forEach((col) => {
              cells.push({
                field: col.field,
                value: row[col.field],
                render:
                  col.render && col.render(row[col.field], row as RowData),
              });
            });
            return (
              <TableRow key={row[keyField]}>
                {cells.map((cell) => {
                  return (
                    <TableCell key={cell.field}>
                      {cell.render ? cell.render : cell.value}
                    </TableCell>
                  );
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
