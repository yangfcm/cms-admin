import { useCallback, useEffect, useState, useMemo } from "react";
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from "material-react-table";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";

const NEW_KEY = "_NEW_KEY";

type TableProps = Omit<MaterialReactTableProps, "columns" | "data"> & {
  enableAdding?: boolean;
  addingText?: string;
  onSave?: (newData: Record<string, any>) => void;
};

type TableColumnDef<T> = Omit<MRT_ColumnDef<T>, "accessorKey"> & {
  accessorKey: string;
};

function useTable<T extends Record<string, any>>(
  columnsProps: TableColumnDef<T>[],
  tableData: T[]
) {
  const columns = useMemo(
    () => columnsProps as TableColumnDef<Record<string, any>>[],
    [columnsProps]
  );
  const [data, setData] = useState<Record<string, any>[]>(tableData);
  const [adding, setAdding] = useState<boolean>(false);
  useEffect(() => {
    if (adding) {
      const emptyData: Record<string, any> = {
        id: NEW_KEY,
      };
      for (const col of columns) {
        emptyData[col.accessorKey] = "";
      }
      setData([emptyData, ...data]);
    } else {
      setData(data.filter((el) => el.id !== NEW_KEY));
    }
  }, [adding]);

  const Table = useCallback(
    (props: TableProps) => {
      const { enableAdding, addingText = "Add", onSave, ...others } = props;
      return (
        <MaterialReactTable
          data={data}
          columns={columns}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          initialState={{ density: "compact" }}
          renderTopToolbarCustomActions={() => {
            return (
              enableAdding && (
                <Tooltip title={addingText} placement="right">
                  <IconButton onClick={() => setAdding(true)}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
              )
            );
          }}
          enableEditing
          editingMode="row"
          positionActionsColumn="last"
          onEditingRowSave={({ exitEditingMode, row, values }) => {
            console.log(row, values);
            if (onSave) onSave(values);
            if (adding) setAdding(false);
            exitEditingMode();
          }}
          onEditingRowCancel={() => {
            if (adding) setAdding(false);
          }}
          enableRowActions
          renderRowActions={({ row, table }) => {
            if (row.original.id === NEW_KEY && adding) {
              setTimeout(() => {
                table.setEditingRow(row);
              }, 1);
              return (
                <Box>
                  <Tooltip arrow placement="left" title="Cancel">
                    <IconButton onClick={() => setAdding(false)}>
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="right" title="Save">
                    <IconButton
                      onClick={() => {
                        console.log(row);
                      }}
                    >
                      <SaveIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              );
            }
            return (
              <Box>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton onClick={() => table.setEditingRow(row)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="error"
                    // onClick={() => handleDeleteRow(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            );
          }}
          {...others}
        />
      );
    },
    [data, columns]
  );
  return Table;
}

export default useTable;
