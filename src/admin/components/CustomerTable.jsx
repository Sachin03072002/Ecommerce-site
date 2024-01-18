import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader } from "@mui/material";
import { getAllUser } from "../../State/Auth/Action";

export default function CustomerTable() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(getAllUser(token));
  }, [dispatch, token]);
  return (
    <div className="p-5 overflow-x-hidden overflow-y-scroll h-[100vh]">
      <Card className="mt-2">
        <CardHeader title="All Customers" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">FirstName</TableCell>
                <TableCell align="left">LastName</TableCell>
                <TableCell align="left">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auth?.users?.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.firstName}
                  </TableCell>

                  <TableCell align="left">{item.lastName}</TableCell>
                  <TableCell align="left">{item.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
