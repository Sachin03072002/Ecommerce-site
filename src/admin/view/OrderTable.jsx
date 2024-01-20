import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../State/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrderTable = () => {
  const dispatch = useDispatch();
  const adminOrder = useSelector((store) => store.adminOrder);
  useEffect(() => {
    dispatch(getOrders());
  }, [
    adminOrder.confirmed,
    adminOrder.delivered,
    adminOrder.placed,
    adminOrder.shipped,
    adminOrder.deletedOrders,
    dispatch,
  ]);
  console.log("admin orders", adminOrder);

  return (
    <div className="p-5 overflow-x-hidden overflow-y-scroll h-[100vh]">
      <Card className="mt-2">
        <CardHeader title="Recent Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder?.orders?.map((order, index) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                      {order.orderItems.map((orderItem) => (
                        <Avatar
                          key={orderItem.product?._id}
                          src={orderItem.product?.imageUrl}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {order.orderItems.map((orderItem) => (
                      <p key={orderItem.product?._id}>
                        {orderItem.product?.title + " "}
                      </p>
                    ))}
                  </TableCell>

                  <TableCell align="left">{order.totalPrice}</TableCell>
                  <TableCell align="left">{order.totalItem}</TableCell>
                  <TableCell align="left">
                    <span
                      className={`text-white px-5 py-2 rounded-full ${
                        order.orderStatus === "CONFIRMED"
                          ? "bg-[#2d842d]"
                          : order.orderStatus === "SHIPPED"
                          ? "bg-[#3030a5]"
                          : order.orderStatus === "PLACED"
                          ? "bg-[#3b9c89]"
                          : order.orderStatus === "PENDING"
                          ? "bg-[gray]"
                          : "bg-[red]"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrderTable;
