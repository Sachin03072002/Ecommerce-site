import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard.jsx/AddressCard";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";
import { useLocation } from "react-router-dom";
import { createPayment } from "../../../State/Payment/Action";
import CartItem from "../Cart/CartItem";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const order = useSelector((store) => store.order);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getOrderById(orderId)).then(() => {
      setLoading(false);
    });
  }, [orderId, dispatch]);

  const handleCheckout = () => {
    dispatch(createPayment(orderId));
  };
  return (
    <div>
      {loading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="p-5 shadow-lg rounded-s-md border">
            <AddressCard address={order.order?.shippingAddress} />
          </div>
          <div>
            <div className="lg:grid grid-cols-3 relative">
              <div className="grid col-span-2 ">
                {order.order?.orderItems?.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
                <div className="border">
                  <p className="uppercase font-bold opacity-60 pb-4">
                    Price Details
                  </p>
                  <hr />
                  <div className="space-y-3 font-semibold mb-10">
                    <div className="flex justify-between pt-3 text-black">
                      <span>Price</span>
                      <span className="">₹{order.order?.totalPrice}</span>
                    </div>
                    <div className="flex justify-between pt-3 ">
                      <span>Discount</span>
                      <span className="text-green-600">
                        -₹{order.order?.discount}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 ">
                      <span>Delivery Charge</span>
                      <span className="text-green-600">
                        {order.order?.totalPrice >= 500 ? "Free" : "₹50"}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3  font-bold">
                      <span>Total Amount</span>
                      <span className="text-green-600">
                        ₹{order.order?.discountedPrice}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full mt-5"
                    variant="contained"
                    sx={{ px: "2.5rem", py: ".7rem", bgColor: "#9155fd" }}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
