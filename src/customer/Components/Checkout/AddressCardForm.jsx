// AddressCard.jsx

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const AddressCardForm = ({ address, onSelectAddress }) => {
  const handleClick = () => {
    // Trigger the onSelectAddress callback when the card is clicked
    if (onSelectAddress) {
      onSelectAddress(address);
    }
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        marginBottom: "8px",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          Name: {`${address.firstName} ${address.lastName}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {address?.state},{address?.streetAddress},{address?.zipCode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {address?.mobile}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AddressCardForm;
