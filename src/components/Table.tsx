import { useState, useEffect, useCallback, useMemo } from "react";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import WarningIcon from "@mui/icons-material/Warning";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { grey } from "@mui/material/colors";

interface Column<RowData> {
  field: string;
  title: string | JSX.Element;
  render?: (value: any, row: RowData) => JSX.Element | string;
  editable?: boolean;
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
  title?: string;
  editable?: {
    add?: {
      labelText?: string;
    };
    onRowAdd?: (newData: RowData) => Promise<any> | any;
  };
}

const NEW_ROW_ID = "__NEW_ROW__";
const keyField = "__ID__";

function AppTable<RowData>(props: TableProps<RowData>) {
  const {
    data: dataProp,
    columns,
    isLoading = false,
    title = "Table",
    editable = {},
  } = props;

  const [data, setData] = useState<RowData[]>(dataProp);
  const isEditable = useMemo(
    () => !!editable && Object.keys(editable).length > 0,
    [editable]
  );
  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [addId, setAddId] = useState<"" | typeof NEW_ROW_ID>("");

  useEffect(() => {
    setData(
      dataProp.map((row, index) => ({
        [keyField]: index.toString(),
        ...row,
      }))
    );
  }, [dataProp]);

  useEffect(() => {
    if (addId) {
      const newData: Record<string, any> = {
        id: NEW_ROW_ID,
      };
      columns.forEach((col) => {
        newData[col.field] = "";
      });
      setData([newData as RowData, ...data]);
    } else {
      setData(data.filter((row: Record<string, any>) => row.id !== NEW_ROW_ID));
    }
  }, [addId]);

  const renderTableToolbar = useCallback(() => {
    return (
      <Toolbar>
        <Typography variant="h6" sx={{ flex: "1 1 100%" }}>
          {title}
        </Typography>
        {isEditable && (
          <Tooltip title={editable.add?.labelText || "Add"}>
            <IconButton
              disabled={!!editId || !!deleteId}
              onClick={() => {
                if (addId) setAddId("");
                else setAddId(NEW_ROW_ID);
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }, [
    title,
    editable.add,
    editable.onRowAdd,
    addId,
    editId,
    deleteId,
    isEditable,
  ]);

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
          {isEditable && (
            <TableCell sx={{ fontWeight: 600, width: "120px" }}>
              Action
            </TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  }, [columns, isEditable]);

  const renderLoader = useCallback(() => {
    if (!isLoading) return null;
    return (
      <TableRow>
        <TableCell
          colSpan={isEditable ? columns.length + 1 : columns.length}
          sx={{ p: 0 }}
        >
          <LinearProgress />
        </TableCell>
      </TableRow>
    );
  }, [columns.length, isLoading, isEditable]);

  const renderNoData = useCallback(() => {
    if (data.length || isLoading) return null;
    return (
      <TableRow>
        <TableCell
          colSpan={isEditable ? columns.length + 1 : columns.length}
          align="center"
        >
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
  }, [columns.length, isEditable, isLoading, data]);

  const renderConfirmActionCell = useCallback(() => {
    return (
      <TableCell>
        <Tooltip title="Cancel">
          <IconButton
            color="error"
            edge="start"
            onClick={() => {
              if (editId) setEditId("");
              if (deleteId) setDeleteId("");
              if (addId) setAddId("");
            }}
          >
            <CancelIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save">
          <IconButton
            color="success"
            onClick={() => {
              console.log("TODO: add, update or delete row.");
              if (editId) setEditId("");
              if (deleteId) setDeleteId("");
              if (addId) setAddId("");
            }}
          >
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    );
  }, [addId, editId, deleteId]);

  const renderActionCell = useCallback(
    (row: Record<string, any>) => {
      return (
        <TableCell>
          <Tooltip title="Edit">
            <IconButton
              disabled={
                !!addId ||
                (!!deleteId && deleteId !== row[keyField]) ||
                (!!editId && editId !== row[keyField])
              }
              onClick={() => setEditId(row[keyField])}
              edge="start"
            >
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              disabled={
                !!addId ||
                (!!deleteId && deleteId !== row[keyField]) ||
                (!!editId && editId !== row[keyField])
              }
              onClick={() => setDeleteId(row[keyField])}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      );
    },
    [addId, deleteId, editId]
  );

  return (
    <Paper>
      {renderTableToolbar()}
      <TableContainer>
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
              if (row.id === NEW_ROW_ID && isEditable) {
                return (
                  <TableRow key={NEW_ROW_ID}>
                    {columns.map((col) => {
                      return (
                        <TableCell key={col.field}>
                          {col.editable ? <input /> : ""}
                        </TableCell>
                      );
                    })}
                    {renderConfirmActionCell()}
                  </TableRow>
                );
              }
              return (
                <TableRow key={row[keyField]}>
                  {cells.map((cell) => {
                    return (
                      <TableCell key={cell.field}>
                        {cell.render ? cell.render : cell.value}
                      </TableCell>
                    );
                  })}
                  {!isEditable
                    ? null
                    : editId === row[keyField] ||
                      deleteId === row[keyField] ||
                      row.id === NEW_ROW_ID
                    ? renderConfirmActionCell()
                    : renderActionCell(row)}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default AppTable;
