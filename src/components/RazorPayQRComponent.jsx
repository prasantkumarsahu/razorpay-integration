import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Timer from "./TimerComponet";

const RazorpayQRCode = ({ amount, setQrId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [error, setError] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchQRCode = async () => {
      try {
        const { data: qrCode } = await axios.post(
          "http://localhost:5001/create-qr",
          { amount }
        );
        if (qrCode) {
          setQrCodeUrl(qrCode.image_url); // Assuming image_url is returned
          setQrId(qrCode.id);
        }
      } catch (err) {
        setError(err.message); // Display the error message
      }
    };

    fetchQRCode();
  }, [amount, setQrId, isFirstRender]);

  return (
    <div style={wrap}>
      {error ? (
        <p>Error: {error}</p>
      ) : qrCodeUrl ? (
        <div style={container}>
          <img style={myImage} src={qrCodeUrl} alt="QR Code" />
          {/* Timer component on top of the image */}
          <Timer />
        </div>
      ) : (
        <CircularProgress sx={progressBar} size="10vh"/>
      )}
    </div>
  );
};

const wrap = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  //   border: "2px solid #000",
};

const myImage = {
  width: "100%",
  marginTop: "10%",
};

const container = {
  position: "relative",
  textAlign: "center",
  display: "inline-block", // Important to keep the image and timer together
  width: "100%",
};

const progressBar = {
  color: "#fff",
};

export default RazorpayQRCode;
