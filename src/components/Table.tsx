import { useCallback } from "react";
import MaterialReactTable, {
  MaterialReactTableProps,
  MRT_ColumnDef,
} from "material-react-table";

function Table(props: MaterialReactTableProps) {
  const { data, columns, ...other } = props;
  return (
    <MaterialReactTable
      data={data}
      columns={columns}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
      initialState={{ density: "compact" }}
      {...other}
    />
  );
}

function useTable(columns: MRT_ColumnDef<any>[], data: any[]) {
  const Table = useCallback(
    () => (
      <MaterialReactTable
        data={data}
        columns={columns}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        initialState={{ density: "compact" }}
      />
    ),
    [data, columns]
  );
  return Table;
}

export default useTable;
