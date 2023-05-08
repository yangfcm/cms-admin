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
import TextField from "@mui/material/TextField";
import WarningIcon from "@mui/icons-material/Warning";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { grey } from "@mui/material/colors";

interface Input {
  name: string;
  placeholder?: string;
  type?: "text" | "number" | "selection" | "checkbox";
  defaultValue?: string | number | boolean;
  lookup?: { text: string; value: string | number }[];
  validate?: () => boolean | string;
}

interface Column<RowData> {
  field: string;
  title: string | JSX.Element;
  render?: (value: any, row: RowData) => JSX.Element | string;
  editable?: boolean;
  input?: Input;
}

interface Cell {
  field: string;
  value: any;
  render?: JSX.Element | string;
  editable?: boolean;
  input?: Input;
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
    onRowEdit?: (editData: RowData) => Promise<any> | any;
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

  const isEditable = useMemo(
    () => !!editable && Object.keys(editable).length > 0,
    [editable]
  );
  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [addId, setAddId] = useState<"" | typeof NEW_ROW_ID>("");

  const data: Record<string, any>[] = useMemo(() => {
    return dataProp.map((row, index) => ({
      [keyField]: index.toString(),
      ...row,
    }));
  }, [dataProp]);

  const newRow = useMemo(() => {
    if (!addId) return;
    const newRow: Record<string, any> = {
      [keyField]: NEW_ROW_ID,
    };
    columns.forEach((col) => {
      newRow[col.field] = "";
    });
    return newRow;
  }, [addId]);

  const editRow = useMemo(() => {
    if (!editId) return;
    return data.find((row) => row[keyField] === editId);
  }, [editId, data]);

  const inputColumns = useMemo(() => {
    if (!addId && !editId) return;
    const inputColumns: Record<string, any> = {};
    columns.forEach((col) => {
      if (col.input && col.editable) {
        inputColumns[col.field] = {
          ...col.input,
          defaultValue: editRow && editRow[col.field] ? editRow[col.field] : "",
        };
      }
    });
    return inputColumns;
  }, [columns, newRow, editRow]);

  const [inputValues, setInputValues] = useState<Record<string, any>>({});

  useEffect(() => {
    const initialValues: Record<string, any> = {};
    if (inputColumns) {
      Object.values(inputColumns).forEach((col) => {
        initialValues[col.name] = col.defaultValue;
      });
    }
    setInputValues(initialValues);
  }, [inputColumns]);

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
              if (addId && editable.onRowAdd) {
                editable.onRowAdd(inputValues as RowData);
              }
              if (editId && editable.onRowEdit) {
                editable.onRowEdit(inputValues as RowData);
              }
            }}
          >
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    );
  }, [
    addId,
    editId,
    deleteId,
    inputValues,
    editable.onRowAdd,
    editable.onRowEdit,
  ]);

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

  const renderInput = useCallback(
    (input?: Input) => {
      const {
        type = "text",
        name = "",
        placeholder = "",
        defaultValue = "",
      } = input || {};
      // if (Object.keys(inputValues).length === 0) return;
      if (type === "text") {
        return (
          <TextField
            variant="standard"
            name={name}
            placeholder={placeholder}
            value={inputValues[name] || ""}
            onChange={(e) => {
              setInputValues({
                ...inputValues,
                [name]: e.target.value,
              });
            }}
          />
        );
      }
      return "@TODO: other input.";
    },
    [inputValues]
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
            {newRow && isEditable && (
              <TableRow key={NEW_ROW_ID}>
                {columns.map((col) => {
                  return (
                    <TableCell key={col.field}>
                      {col.editable ? renderInput(col.input) : ""}
                    </TableCell>
                  );
                })}
                {renderConfirmActionCell()}
              </TableRow>
            )}
            {data.map((row: Record<string, any>) => {
              const cells: Cell[] = [];
              columns.forEach((col) => {
                cells.push({
                  field: col.field,
                  value: row[col.field],
                  render:
                    col.render && col.render(row[col.field], row as RowData),
                  editable: !!col.editable,
                  input: {
                    ...(col.input || {}),
                    name: col.field,
                    defaultValue: row[col.field],
                  },
                });
              });
              if (row[keyField] === editId && isEditable) {
                return (
                  <TableRow key={row[keyField]}>
                    {cells.map((cell) => {
                      return (
                        <TableCell key={cell.field}>
                          {cell.editable
                            ? renderInput(cell.input)
                            : cell.render
                            ? cell.render
                            : cell.value}
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
