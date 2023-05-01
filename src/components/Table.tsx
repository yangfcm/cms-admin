import MaterialReactTable, {
  MaterialReactTableProps,
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

export default Table;
