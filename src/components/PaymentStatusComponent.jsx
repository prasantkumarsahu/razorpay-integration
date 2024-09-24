import axios from "axios";
import React, { useEffect, useState } from "react";

function PaymentStatusComponent({ qr_id, isModalOpened }) {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentsAmountReceived, setPaymentsAmountReceived] = useState(0);
  const [status, setStatus] = useState("");
  const [paymentsCountReceived, setPaymentsCountReceived] = useState(0);
  const [closeReason, setCloseReason] = useState("");
  const [id, setId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Define the async function inside the useEffect hook
    const getPaymentId = async () => {
      try {
        let response = await axios.get(`http://localhost:5001/status/${qr_id}`);
        let qrCode = response.data;

        if (qrCode) {
          setPaymentAmount(qrCode.payment_amount / 100);
          setPaymentsAmountReceived(qrCode.payments_amount_received);
          setStatus(qrCode.status);
          setPaymentsCountReceived(qrCode.payments_count_received);
          setCloseReason(qrCode.close_reason);
          setId(qrCode.id);
        }

        response = await axios.get(`http://localhost:5001/payment/${qr_id}`);
        qrCode = response.data;

        if (qrCode && qrCode.items.length > 0) {
          setPaymentId(qrCode.items[0].id);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(`Error: ${error.response?.data?.message || error.message}`);
        } else {
          setError(`Unexpected error: ${error.message}`);
        }
      }
    };

    if (!isModalOpened && qr_id) {
      setTimeout(getPaymentId, 500);
    }
  }, [qr_id, isModalOpened]);

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <table style={tableStyle}>
      <tbody>
        <tr>
          <td style={cellStyle}>Payment Id:</td>
          <td style={{ ...cellStyle, ...columnStyle }}>{paymentId}</td>
        </tr>
        <tr>
          <td style={cellStyle}>Qr Id:</td>
          <td style={{ ...cellStyle, ...columnStyle }}>{id}</td>
        </tr>
        <tr>
          <td style={cellStyle}>Payment Amount:</td>
          <td style={{ ...cellStyle, ...columnStyle }}>{paymentAmount}</td>
        </tr>
        <tr>
          <td style={cellStyle}>Payments Amount Received:</td>
          <td style={{ ...cellStyle, ...columnStyle }}>
            {paymentsAmountReceived}
          </td>
        </tr>
        <tr>
          <td style={cellStyle}>Status:</td>
          <td style={{ ...cellStyle, ...columnStyle }}>{status}</td>
        </tr>
        <tr>
          <td style={cellStyle}>Close Reason:</td>
          <td style={{ ...cellStyle, ...columnStyle }}>{closeReason}</td>
        </tr>
        <tr>
          <td style={cellStyle}>Payments Count Received:</td>
          <td style={{ ...cellStyle, ...columnStyle }}>
            {paymentsCountReceived}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const tableStyle = {
  width: "50%",
  borderCollapse: "collapse",
};

const cellStyle = {
  border: "1px dotted black",
  padding: "8px",
  textAlign: "left",
  height: "30px", // Set a fixed height for cells
};

const columnStyle = {
  width: "50%", // Ensure both columns have the same width
};

const paid = {

}

export default PaymentStatusComponent;
