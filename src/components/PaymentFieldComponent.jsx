import { TextField } from "@mui/material";
import React from "react";

function PaymentFieldComponent({ amount, setAmount }) {
  return (
    <div>
      <TextField
        label="Enter Amount"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={amount}
        onChange={(event) => {
          setAmount(event.target.value);
        }}
        InputProps={{
          sx: {
            // For the whole field in Firefox
            "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
              {
                WebkitAppearance: "none",
              },
          },
        }}
      />
    </div>
  );
}

export default PaymentFieldComponent;
