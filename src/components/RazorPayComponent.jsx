import React from "react";
import axios from "axios";
import { Button } from "@mui/material";

const RazorpayButton = ({ amount, setAmount, setIsPaySuccessful, setPaymentId }) => {
  const getAmount = () => {
    return amount;
  };

  const amountReset = () => {
    setAmount(0);
  }

  const generateRandom4DigitNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const handlePayment = async () => {
    try {
      const receipt = "receipt" + generateRandom4DigitNumber();
      // Create an order from the backend
      const { data: order } = await axios.post(
        "http://localhost:5001/create-order",
        {
          amount: getAmount() * 100, // Amount in paisa (50000 for INR 500)
          currency: "INR",
          receipt,
          notes: {
            key1: "value3",
            key2: "value2",
          },
        }
      );

      const { amount, currency, id: order_id } = order;

      // Ensure Razorpay script is loaded
      if (!window.Razorpay) {
        console.error("Razorpay script is not loaded");
        return;
      }

      // Initialize Razorpay
      const options = {
        key: "rzp_test_VyMJP8qAJK03UO", // Enter the Key ID generated from the Dashboard
        amount: amount * 100,
        currency: currency,
        name: "Your App Name",
        description: "Test Transaction",
        order_id: order_id,
        handler: function (response) {
          setIsPaySuccessful(true);
          setPaymentId(response.razorpay_payment_id);
          amountReset();
          console.log(response);
        },
        prefill: {
          name: "Your Name",
          email: "your-email@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Hello World",
        },
        theme: {
          color: "#224533",
          hide_topbar: true,
        },
        config: {
          display: {
            sequence: ["upi"],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("Payment failed: " + error.message);
    }
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handlePayment}>
        Pay with Razorpay
      </Button>
    </div>
  );
};

export default RazorpayButton;
