import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const [loading, setLoading] = useState(true);

  const handleCheckOut = () => {
    navigate("/checkout?step=2");
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getCart())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [cart.updateCartItem, cart.deleteCartItem, dispatch]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="lg:grid grid-cols-3 lg:px-16 relative w-full max-w-screen-xl">
        <div className="col-span-2">
          {loading ? (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <CircularProgress />
            </div>
          ) : cart.cart?.cartItems?.length > 0 ? (
            cart.cart?.cartItems?.map((item) => (
              <CartItem key={item.id} item={item} />
            ))
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-600">Your cart is empty</p>
            </div>
          )}
        </div>
        <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
          <div className="border p-4">
            <p className="uppercase font-bold opacity-60 pb-4">Price Details</p>
            <hr />

            {cart.cart?.cartItems?.length > 0 && (
              <>
                <div className="space-y-3 font-semibold mb-10">
                  <div className="flex justify-between pt-3 text-black">
                    <span>Price</span>
                    <span className="text-green-600">
                      ₹{cart.cart?.totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 ">
                    <span>Discount</span>
                    <span className="text-green-600">
                      -₹{cart.cart?.discount}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 ">
                    <span>Delivery Charge</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pt-3  font-bold">
                    <span>Total Amount</span>
                    <span className="text-green-600">
                      ₹{cart.cart?.totalDiscountedPrice}
                    </span>
                  </div>
                </div>
              </>
            )}

            {cart.cart?.cartItems?.length > 0 && (
              <Button
                onClick={handleCheckOut}
                className="w-full mt-5"
                variant="contained"
                sx={{ px: "2.5rem", py: ".7rem", bgColor: "#9155fd" }}
              >
                Checkout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
