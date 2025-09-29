import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

const SimpleTable = ({
  datas,
}: {
  datas: {
    key: string;
    value: string;
  }[];
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {datas.map((data) => (
            <TableRow key={data.key} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="data">
                {data.key}
              </TableCell>
              <TableCell align="right">{data.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default SimpleTable;
