import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../../../State/Order/Action";
import { useParams } from "react-router-dom";

const orderStatus = [
  { label: "PLACED", value: "PLACED" },
  { label: "CONFIRMED", value: "CONFIRMED" },
  { label: "On The Way", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Return", value: "RETURN" },
];

const Order = () => {
  const params = useParams();
  const userId = params.userId;
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getOrdersByUserId(userId));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [userId, dispatch]);

  const [selectedStatus, setSelectedStatus] = React.useState([]);

  const handleStatusChange = (value) => {
    // Toggle the selected order status
    setSelectedStatus((prevStatus) => {
      if (prevStatus.includes(value)) {
        return prevStatus.filter((status) => status !== value);
      } else {
        return [...prevStatus, value];
      }
    });
  };

  const isStatusSelected = (value) => selectedStatus.includes(value);

  const filteredOrders = order?.orders?.filter((item) =>
    selectedStatus.length === 0
      ? true
      : selectedStatus.includes(item.orderStatus)
  );
  console.log(order.orders);
  console.log("select", selectedStatus);
  console.log(filteredOrders);

  return (
    <div className="px-5 lg:px-20">
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5}>
          <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>
              {orderStatus.map((option) => (
                <div
                  className="flex items-center"
                  key={option.value}
                  onClick={() => handleStatusChange(option.value)}
                >
                  <input
                    type="checkbox"
                    checked={isStatusSelected(option.value)}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-3 text-sm text-gray-600 cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-5">
            {filteredOrders.map((item) => (
              <OrderCard key={item.productId} item={item} />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
