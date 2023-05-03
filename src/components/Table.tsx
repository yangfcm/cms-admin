import { useCallback, useEffect, useState } from "react";
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from "material-react-table";
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
  columns: TableColumnDef<T>[],
  tableData: T[]
) {
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
          columns={columns as MRT_ColumnDef<Record<string, any>>[]}
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
          {...others}
        />
      );
    },
    [data, columns]
  );
  return Table;
}

export default useTable;
