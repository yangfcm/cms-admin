import { useCallback, useEffect, useState, useMemo } from "react";
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from "material-react-table";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const NEW_KEY = "_NEW_KEY";

type TableProps = Omit<MaterialReactTableProps, "columns" | "data"> & {
  enableAdding?: boolean;
  addingText?: string;
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
      const { enableAdding, addingText = "Add", ...others } = props;
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
          renderRowActions={({ row, table }) => {
            return <Box sx={{ display: "flex", gap: "1rem" }}>action</Box>;
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
