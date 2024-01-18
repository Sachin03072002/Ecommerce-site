import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliverOrder,
  getOrders,
  shipOrder,
} from "../../State/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrdersTable = () => {
  const [anchorEl, setAnchorEl] = React.useState([]);

  const open = Boolean(anchorEl);
  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };
  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };
  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);
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

  const handleShippedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    handleClose();
  };
  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId));
    handleClose();
  };
  const handleDeliveredOrder = (orderId) => {
    dispatch(deliverOrder(orderId));
    handleClose();
  };
  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
    handleClose();
  };

  return (
    <div className="p-5 overflow-x-hidden overflow-y-scroll h-[100vh]">
      <Card className="mt-2">
        <CardHeader title="All Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Update</TableCell>
                <TableCell align="left">Delete</TableCell>
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
                  <TableCell align="left">
                    <Button
                      id="basic-button"
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, index)}
                      aria-controls={`basic-menu-${order._id}`}
                      aria-expanded={Boolean(anchorEl[index])}
                    >
                      STATUS
                    </Button>
                    <Menu
                      id={`basic-menu-${index}`}
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClick={() => handleClose(index)}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={() => handleConfirmedOrder(order._id)}>
                        Confirmed Order
                      </MenuItem>
                      <MenuItem onClick={() => handleShippedOrder(order._id)}>
                        Shipped Order
                      </MenuItem>
                      <MenuItem onClick={() => handleDeliveredOrder(order._id)}>
                        Delivered Order
                      </MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Delete
                    </Button>
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

export default OrdersTable;
