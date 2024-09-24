import React, { useState, useEffect, useContext } from "react";
import { SetTimerContext } from "./PaymentModal";

function Timer() {
  // Set the initial time to 15 minutes (15 * 60 seconds)
  const {timer, setTimer} = useContext(SetTimerContext);
//   setTimer(15 * 60);
  //   const [timeLeft, setTimeLeft] = useState(15 * 60);

  // Function to format time as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // useEffect to handle the timer countdown
  useEffect(() => {
    // Only start the countdown if timeLeft is greater than 0
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      // Clean up interval when component unmounts or when timeLeft reaches 0
      return () => clearInterval(timerInterval);
    }
  }, [timer, setTimer]);

  return (
    <div style={timerContainer}>
      <h1 style={timerText}>{formatTime(timer)}</h1>
      <span style={paragraph}>Please don't click outside of the QR Code or refresh the page.</span>
    </div>
  );
}

// Styling for the timer container
const timerContainer = {
  position: "absolute",
  top: "16.5%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#fff", // White text for better visibility
  fontSize: "1.3rem",
  background:
    "linear-gradient(135deg, rgba(3, 75, 252, 1), rgba(80, 150, 255, 1))", // Gradient from dark to lighter blue
  padding: "10px",
  borderRadius: "8px",
  width: "100%",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Creates a soft shadow for 3D effect
  border: "1px solid rgba(255, 255, 255, 0.5)", // Thin white border for highlight
};

const timerText = {
  margin: 0,
  padding: 0,
};

const paragraph = {
    fontSize: '0.8rem',
    fontStyle: "italic"
}

export default Timer;
