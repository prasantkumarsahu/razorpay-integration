import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RazorpayQRCode from "./RazorPayQRComponent";
import { createContext, useEffect, useState, useCallback } from "react";
import Timer from "./TimerComponet";
import axios from "axios";

// Create a context to pass timer state
export const SetTimerContext = createContext();

function PaymentModal({ openPayment, setOpenPayment, amount, qrId, setQrId }) {
  // Initialize the timer with 15 minutes (15 * 60 seconds)
  const [timer, setTimer] = useState(3 * 60);

  // Memoized function to close the modal
  const handleClose = useCallback(() => {
    closeQrCode(qrId);
    setOpenPayment(false);
    setTimer(3 * 60);
  }, [setOpenPayment, qrId]);

  useEffect(() => {
    // Close the modal when the timer reaches 0
    if (timer <= 0) {
      handleClose();
    }
  }, [timer, handleClose]);

  const handleSetQrId = useCallback(
    (id) => {
      setQrId(id);
    },
    [setQrId]
  );

  const handleOpen = () => setOpenPayment(true);

  const closeQrCode = async (qr_id) => {
    try {
      await axios.post(`http://localhost:5001/close-qr/${qr_id}`);
    } catch (err) {
      console.log(err.message); // Display the error message
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Pay Amount
      </Button>
      <Modal
        open={openPayment}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box sx={modalStyle}>
          {/* Provide the timer and setTimer to child components */}
          <SetTimerContext.Provider value={{ timer, setTimer }}>
            <RazorpayQRCode amount={amount} setQrId={handleSetQrId} />
          </SetTimerContext.Provider>
        </Box>
      </Modal>
    </div>
  );
}

// Moved styles outside the component to avoid re-creation on every render
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  height: "80%",
  background:
    "linear-gradient(135deg, rgba(3, 75, 252, 1), rgba(80, 150, 255, 1))", // Gradient similar to timerContainer
  border: "1px solid rgba(255, 255, 255, 0.5)", // Thin white border for highlight effect
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // 3D shadow effect
  overflow: "hidden",
//   padding: "8px", // Padding for content spacing
  borderRadius: "8px", // Rounded corners for a smooth effect
};

export default PaymentModal;
