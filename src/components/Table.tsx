import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
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
  sorting?: boolean;
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
    delete?: {
      confirmText?: string;
    };
    onRowAdd?: (newData: RowData) => Promise<any> | any;
    onRowEdit?: (editData: RowData) => Promise<any> | any;
    onRowDelete?: (deleteData: RowData) => Promise<any> | any;
  };
  options?: {
    sorting?: boolean;
  };
}

interface TableSorting {
  [field: string]: "NONE" | "ASC" | "DESC";
}

const NEW_ROW_ID = "__NEW_ROW__";
export const keyField = "__ID__";

function AppTable<RowData>(props: TableProps<RowData>) {
  const {
    data: dataProp,
    columns,
    isLoading = false,
    title = "Table",
    editable = {},
    options: { sorting = false } = {},
  } = props;

  const columnsRef = useRef<Column<RowData>[]>(
    columns.map(
      ({ field, title, render, editable = false, input, sorting = true }) => {
        // Extract column's prop and set default value when necessary.
        return { field, title, render, editable, input, sorting };
      }
    )
  );

  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [addId, setAddId] = useState<"" | typeof NEW_ROW_ID>("");
  const [inputValues, setInputValues] = useState<Record<string, any>>({});
  const [tableSorting, setTableSorting] = useState<TableSorting>({});

  const isEditable = useMemo(
    () => !!editable && Object.keys(editable).length > 0,
    [editable]
  );

  const sort = useMemo(() => {
    // Get the field name and the order that required sorting.
    const sort = {
      field: "",
      order: "",
    };
    for (const [key, value] of Object.entries(tableSorting)) {
      if (value !== "NONE") {
        sort.field = key;
        sort.order = value;
      }
    }
    return sort;
  }, [tableSorting]);

  const data: Record<string, any>[] = useMemo(() => {
    const tableData = dataProp.map((row, index) => ({
      [keyField]: index.toString(),
      ...row,
    }));
    if (sort.field) {
      const sortedTableData = tableData.sort((a, b) => {
        // Just to string compare initially.
        const strA = (a as Record<string, any>)[sort.field].toString();
        const strB = (b as Record<string, any>)[sort.field].toString();
        if (sort.order === "ASC") {
          return strA > strB ? 1 : -1;
        }
        if (sort.order === "DESC") {
          return strA > strB ? -1 : 1;
        }
        return 0;
      });
      return sortedTableData;
    }
    return tableData;
  }, [dataProp, sort]);

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

  const deleteRow = useMemo(() => {
    if (!deleteId) return;
    return data.find((row) => row[keyField] === deleteId);
  }, [deleteId, data]);

  const inputColumns = useMemo(() => {
    if (!addId && !editId) return;
    const inputColumns: Record<string, any> = {};
    columnsRef.current.forEach((col) => {
      if (col.input && col.editable) {
        inputColumns[col.field] = {
          ...col.input,
          defaultValue: editRow && editRow[col.field] ? editRow[col.field] : "",
        };
      }
    });
    return inputColumns;
  }, [editRow]);

  useEffect(() => {
    const initialValues: Record<string, any> = {};
    if (inputColumns) {
      Object.values(inputColumns).forEach((col) => {
        initialValues[col.name] = col.defaultValue;
      });
    }
    setInputValues(initialValues);
  }, [inputColumns]);

  useEffect(() => {
    // Initialize sorting state.
    const initSorting: TableSorting = {};
    if (!sorting) return;
    columnsRef.current.forEach((col) => {
      if (col.sorting) initSorting[col.field] = "NONE";
    });
    setTableSorting(initSorting);
  }, []);

  const handleSorting = useCallback(
    (field: string) => {
      const currentSorting = tableSorting[field];
      const nextSorting =
        currentSorting === "NONE"
          ? "ASC"
          : currentSorting === "ASC"
          ? "DESC"
          : "NONE";
      const newSorting: TableSorting = {};
      columnsRef.current.forEach((col) => {
        if (col.sorting) newSorting[col.field] = "NONE";
      });
      newSorting[field] = nextSorting;
      setTableSorting(newSorting);
    },
    [tableSorting]
  );

  const renderTableToolbar = useCallback(() => {
    return (
      <Toolbar>
        <Typography variant="h6" sx={{ flex: "1 1 100%" }}>
          {title}
        </Typography>
        {isEditable && (
          <Tooltip title={editable.add?.labelText || "Add"}>
            <span>
              <IconButton
                disabled={!!editId || !!deleteId || isLoading}
                onClick={() => {
                  if (addId) setAddId("");
                  else setAddId(NEW_ROW_ID);
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </span>
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
                <Stack direction="row" alignItems="center" gap={1}>
                  {col.title}{" "}
                  {tableSorting[col.field] && data.length > 1 && (
                    <IconButton
                      onClick={() => handleSorting(col.field)}
                      disabled={!!(addId || editId || deleteId)}
                    >
                      <ArrowUpwardIcon
                        color={
                          tableSorting[col.field] === "NONE"
                            ? "disabled"
                            : "inherit"
                        }
                        sx={{
                          cursor: "pointer",
                          rotate:
                            tableSorting[col.field] === "DESC"
                              ? "180deg"
                              : "0deg",
                          transition: "rotate, .2s",
                        }}
                      />
                    </IconButton>
                  )}
                </Stack>
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
  }, [columns, isEditable, tableSorting, addId, editId, deleteId]);

  const renderLoader = useCallback(() => {
    if (!isLoading) return null;
    return (
      <TableRow>
        <TableCell
          colSpan={isEditable ? columns.length + 1 : columns.length}
          sx={{ p: 0 }}
        >
          <LinearProgress value={10} />
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
            <WarningIcon />
            <Typography variant="subtitle1">No data</Typography>
          </Stack>
        </TableCell>
      </TableRow>
    );
  }, [columns.length, isEditable, isLoading, data]);

  const renderConfirmActionCell = useCallback(() => {
    return (
      <TableCell>
        <Tooltip title="Cancel">
          <span>
            <IconButton
              color="error"
              edge="start"
              onClick={() => {
                if (editId) setEditId("");
                if (deleteId) setDeleteId("");
                if (addId) setAddId("");
              }}
              disabled={isLoading}
            >
              <CancelIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Save">
          <span>
            <IconButton
              color="success"
              onClick={() => {
                let result;
                if (addId && editable.onRowAdd) {
                  result = editable.onRowAdd(inputValues as RowData);
                }
                if (editId && editable.onRowEdit) {
                  result = editable.onRowEdit({
                    id: editRow?.id,
                    ...inputValues,
                  } as { id: string } & RowData);
                }
                if (deleteId && editable.onRowDelete) {
                  result = editable.onRowDelete(deleteRow as RowData);
                }
                if (result instanceof Promise) {
                  result
                    .then((data) => {
                      setAddId("");
                      setEditId("");
                      setDeleteId("");
                    })
                    .catch((error) => {
                      // Handle error.
                    });
                } else {
                  setAddId("");
                  setEditId("");
                  setDeleteId("");
                }
              }}
              disabled={isLoading}
            >
              <CheckCircleIcon />
            </IconButton>
          </span>
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
            <span>
              <IconButton
                disabled={
                  isLoading ||
                  !!addId ||
                  (!!deleteId && deleteId !== row[keyField]) ||
                  (!!editId && editId !== row[keyField])
                }
                onClick={() => setEditId(row[keyField])}
                edge="start"
              >
                <ModeEditIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete">
            <span>
              <IconButton
                disabled={
                  isLoading ||
                  !!addId ||
                  (!!deleteId && deleteId !== row[keyField]) ||
                  (!!editId && editId !== row[keyField])
                }
                onClick={() => setDeleteId(row[keyField])}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </span>
          </Tooltip>
        </TableCell>
      );
    },
    [addId, deleteId, editId, isLoading]
  );

  const renderInput = useCallback(
    (input?: Input) => {
      const {
        type = "text",
        name = "",
        placeholder = "",
        defaultValue = "",
      } = input || {};
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
            {!addId && renderNoData()}
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
              if (row[keyField] === deleteId && isEditable) {
                return (
                  <TableRow key={row[keyField]}>
                    <TableCell colSpan={columns.length}>
                      <Typography color="error">
                        {editable.delete?.confirmText ||
                          "Are you sure to delete this record?"}
                      </Typography>
                    </TableCell>
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
