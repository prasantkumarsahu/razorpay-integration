import React from "react";

function StatusCardComponent({ isPaySuccessful, paymentId }) {
  if (isPaySuccessful) {
    return (
      <div style={successHeader}>
        <h5>Payment is successful!</h5>
        <p>Payment Id: {paymentId}</p>
      </div>
    );
  } else {
    return (
      <div style={fieldHeader}>
        <h5>Payment is unsuccessful!</h5>
      </div>
    );
  }
}

const successHeader = {
    color: '#005500'
}

const fieldHeader = {
  color: "#550000",
};

export default StatusCardComponent;
