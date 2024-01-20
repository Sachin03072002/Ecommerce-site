import { Avatar, Box, Grid, Rating } from "@mui/material";
import React from "react";

const ProductReviewCard = ({ item }) => {
  const formatDate = (inputDate) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date(inputDate);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgColor: "#9155fd" }}
            >
              {item.user.firstName[0].toUpperCase()}
            </Avatar>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <div className="space-y-5 ml-8">
            <div className="">
              <p className="font-semibold text-lg">
                {item.user.firstName + " " + item.user.lastName}
              </p>
              <p className="opacity-70">{formatDate(item.createdAt)}</p>
            </div>

            <Rating
              value={item.rating}
              name="half-rating"
              readOnly
              precision={0.5}
            ></Rating>
            <p>{item.review}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
