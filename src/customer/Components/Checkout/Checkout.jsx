import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const querySearch = new URLSearchParams(location.search);
  const step = parseInt(querySearch.get("step")) || 0; // Convert step to integer
  const navigate = useNavigate();
  const order = useSelector((store) => store.order);

  useEffect(() => {
    if (order.orderStatus === "CONFIRMED") {
      navigate(`/payment/${order._id}`);
    }
  }, [order.orderStatus, navigate, order._id]);

  useEffect(() => {
    // Simulate loading delay (replace with actual data fetching)
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup function to clear the timeout if component unmounts or changes
    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="px-10 lg:px-20 mt-8">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {loading ? (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CircularProgress />
          </div>
        ) : activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            </Box>
            <div className="mt-10">
              {step === 2 ? <DeliveryAddressForm /> : <OrderSummary />}
            </div>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
};

export default Checkout;
