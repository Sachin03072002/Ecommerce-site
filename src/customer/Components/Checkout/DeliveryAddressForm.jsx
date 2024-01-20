import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressCard from "../AddressCard.jsx/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";
import AddressCardForm from "./AddressCardForm";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    // Populate the form fields when a new address is selected
    if (selectedAddress) {
      const {
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        zipCode,
        mobile,
      } = selectedAddress;

      // Set the form field values
      document.getElementById("firstName").value = firstName;
      document.getElementById("lastName").value = lastName;
      document.getElementById("address").value = streetAddress;
      document.getElementById("city").value = city;
      document.getElementById("state").value = state;
      document.getElementById("zipCode").value = zipCode;
      document.getElementById("phoneNumber").value = mobile;
    }
  }, [selectedAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission logic
  };

  const handleDeliverHere = () => {
    // Dispatch the selected address to the Redux store
    dispatch(createOrder({ address: selectedAddress, navigate }));
  };
  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          lg={5}
          className="border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll"
        >
          <div className="p-5 py-5 border-b cursor-pointer">
            {auth.user?.address?.map((item) => (
              <AddressCardForm
                key={item._id}
                address={item}
                onSelectAddress={() => setSelectedAddress(item)}
              />
            ))}
          </div>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Box className="border rounded-s-md shadow-md p-5 ">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="FirstName"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="LastName"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zipCode"
                    name="zipCode"
                    label="Zip / Postal Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="shipping postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={handleDeliverHere}
                    sx={{ py: 1.5, mt: 2, bgColor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
