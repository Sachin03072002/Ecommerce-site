import React, { useState, useEffect } from "react";
import AddressCard from "../AddressCard.jsx/AddressCard";
import OrderTracker from "./OrderTracker";
import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  CircularProgress,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";
import { createRating } from "../../../State/Rating/Action";

const OrderDetails = () => {
  const order = useSelector((store) => store.order);
  const params = useParams();
  const orderId = params.orderId;
  const dispatch = useDispatch();
  const [value, setValue] = useState(2);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getOrderById(orderId));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId, dispatch]);

  const Status = [
    { name: "PLACED", value: "1" },
    { name: "CONFIRMED", value: "2" },
    { name: "SHIPPED", value: "3" },
    { name: "OUT_FOR_DELIVERY", value: "4" },
    { name: "DELIVERED", value: "5" },
  ];

  let orderStatusValue = Status.find(
    (status) => status.name === order?.order?.orderStatus
  )?.value;

  const [reviewFormVisibility, setReviewFormVisibility] = useState({});

  const handleGoToReview = (productId) => {
    setReviewFormVisibility((prevVisibility) => ({
      ...prevVisibility,
      [productId]: true,
    }));
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReviewSubmit = async (event, productId) => {
    event.preventDefault();
    if (!productId) {
      console.error("No selected product for review submission");
      return;
    }

    console.log("Submitting review:", productId, value, reviewText);
    await dispatch(createRating(productId, value, reviewText));
    setValue(0);
    setReviewText("");

    // Update the review form visibility state to hide the form
    setReviewFormVisibility((prevVisibility) => ({
      ...prevVisibility,
      [productId]: false,
    }));
  };

  return (
    <div className="px-5 lg:px-20">
      <div>
        <h1 className="font-bold text-xl py-7">Deliver Address</h1>
        <AddressCard address={order?.order?.shippingAddress} />
      </div>
      <div className="py-20">
        <OrderTracker activeStep={orderStatusValue} />
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <Grid className="space-y-5" container>
          {order?.order?.orderItems ? (
            order?.order?.orderItems?.map((item) => (
              <Grid
                item
                container
                className="shadow-xl rounded-md p-5 border"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
                xs={12}
                key={item._id}
              >
                <Grid item sx={6}>
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-[5rem] h-[5rem] object-cover object-top"
                      src={item.product.imageUrl}
                      alt=""
                    />
                    <div className="space-y-2 ml-5">
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="space-x-5 opacity-50 text-xs font-semibold">
                        <span>Color: {item.product.color}</span>
                        <span> Size: {item.size}</span>
                      </p>
                      <p>Seller: {item.product.brand}</p>
                      <p>
                        ₹{item.product.discountedPrice}{" "}
                        <span className="text-green">
                          {item.product.discountedPercent + "% OFF"}
                        </span>
                      </p>
                    </div>
                  </div>
                </Grid>
                <Grid item>
                  {!reviewFormVisibility[item._id] && (
                    <Button onClick={() => handleGoToReview(item._id)}>
                      <Box sx={{ color: deepPurple[500] }}>
                        <StarBorderIcon
                          sx={{ fontSize: "2rem" }}
                          className="px-2"
                        />
                        <span>Rate & Review Product</span>
                      </Box>
                    </Button>
                  )}
                  {reviewFormVisibility[item._id] && (
                    <form
                      key={reviewFormVisibility[item._id]}
                      onSubmit={(e) => handleReviewSubmit(e, item.product._id)}
                    >
                      <div className="flex flex-col items-center">
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />
                        <TextField
                          label="Review"
                          multiline
                          rows={1}
                          value={reviewText}
                          onChange={handleReviewTextChange}
                        />
                        <Button type="submit">Submit</Button>
                      </div>
                    </form>
                  )}
                  {item.product.rating && (
                    <div>
                      <Rating
                        name={`rating-${item._id}`}
                        value={item.product.rating}
                        readOnly
                      />
                    </div>
                  )}
                </Grid>
              </Grid>
            ))
          ) : (
            <p>No Orders Found</p>
          )}
        </Grid>
      )}
    </div>
  );
};

export default OrderDetails;
