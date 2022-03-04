import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Props = {
    datas: {
        key: string,
        value: string,
    }[]
}
export default function SimpleTable (props: Props) {
    return (
        <TableContainer
            component={Paper}>
            <Table>
                <TableBody>
                    {props.datas.map((data) => (
                        <TableRow
                            key={data.key}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="data">{data.key}</TableCell>
                            <TableCell align="right">{data.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
