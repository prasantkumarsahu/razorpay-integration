import React, { useState } from "react";
import PaymentFieldComponent from "./PaymentFieldComponent";
import RazorpayButton from "./RazorPayComponent";
import StatusCardComponent from "./StatusCardComponent";
import RazorpayQRCode from "./RazorPayQRComponent";
import { Button } from "@mui/material";
import PaymentModal from "./PaymentModal";
import PaymentStatusComponent from "./PaymentStatusComponent";
import Timer from "./TimerComponet";

function PaymentForm() {
  const [amount, setAmount] = useState();

  const [openPayment, setOpenPayment] = useState(false);

  const [isPaySuccessful, setIsPaySuccessful] = useState(false);
  const [paymentId, setPaymentId] = useState("");

  const [qrId, setQrId] = useState("");

  return (
    <div style={myStyle}>
      <h2>Payment Form</h2>
      <PaymentFieldComponent amount={amount} setAmount={setAmount} />
      <PaymentModal
        openPayment={openPayment}
        setOpenPayment={setOpenPayment}
        amount={amount}
        qrId={qrId}
        setQrId={setQrId}
      />
      <PaymentStatusComponent qr_id={qrId} isModalOpened={openPayment} />
      {/* <Button */}
      {/* <RazorpayButton
        amount={amount}
        setAmount={setAmount}
        setIsPaySuccessful={setIsPaySuccessful}
        setPaymentId={setPaymentId}
      /> */}
      {/* <StatusCardComponent
        isPaySuccessful={isPaySuccessful}
        paymentId={paymentId}
      /> */}
    </div>
  );
}

const myStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: 30,
  textAlign: "center",
  backgroundColor: "#bbbbbb",
  height: "100vh",
};
export default PaymentForm;
