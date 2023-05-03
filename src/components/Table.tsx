import { useCallback } from "react";
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from "material-react-table";

type TableProps = Omit<MaterialReactTableProps, "columns" | "data">;

function useTable<T>(columns: MRT_ColumnDef<T>[], data: T[]) {
  const Table = useCallback(
    (props: TableProps) => (
      <MaterialReactTable
        data={data}
        columns={columns as MRT_ColumnDef<Record<string, any>>[]}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        initialState={{ density: "compact" }}
        {...props}
      />
    ),
    [data, columns]
  );
  return Table;
}

export default useTable;
