import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ item }) => {
  const navigate = useNavigate();

  const formatDeliveryDate = (deliveryDate) => {
    const formattedDate = new Date(deliveryDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return formattedDate;
  };

  return (
    <div
      onClick={() => navigate(`/account/order/${item._id}`)}
      className="p-5 shadow-md hover:shadow-2xl border cursor-pointer"
    >
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        {item.orderItems &&
          item.orderItems.map((pro) => (
            <Grid item xs={12} key={pro.productId}>
              <div className="flex">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={pro.product.imageUrl}
                  alt={pro.productName}
                />
                <div className="ml-5 space-y-2">
                  <p>{pro.product.brand}</p>
                  <p className="opacity-50 text-xs font-semibold">
                    Size: {pro.size}
                  </p>
                  <p className="opacity-50 text-xs font-semibold">
                    Color: {pro.product.color}
                  </p>
                </div>
              </div>
            </Grid>
          ))}

        <Grid item xs={2}>
          <p className="text-semibold">₹{item.totalPrice}</p>
        </Grid>

        <Grid item xs={4}>
          {item.orderStatus === "DELIVERED" ? (
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-2 text sm"
                />
                <span>Delivered on {formatDeliveryDate(item.orderDate)}</span>
              </p>
              <p className="text-xs">Your Item Has Been Delivered</p>
            </div>
          ) : (
            <p>
              <span>
                Expected Delivery On {formatDeliveryDate(item.orderDate)}
              </span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
