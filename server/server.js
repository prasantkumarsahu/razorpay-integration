const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
  })
);

app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_VyMJP8qAJK03UO",
  key_secret: "0HrwHmJDZe5ukmt1xwKXWD4b",
});

app.post("/create-qr", async (req, res) => {
  const { amount } = req.body;

  try {
    if (Number(amount) === NaN) {
      throw Error("Amount is not a number!");
    }

    const qrCode = await razorpay.qrCode.create({
      type: "upi_qr",
      usage: "single_use",
      fixed_amount: true,
      payment_amount: Number(amount) * 100,
      description: "For Store 1",
      close_by: getCloseByTimestamp(),
      notes: {
        purpose: "Test UPI QR Code notes",
      },
    });

    res.json(qrCode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/status/:id", async (req, res) => {
  try {
    const qrId = req.params.id;

    const qrCode = await razorpay.qrCode.fetch(qrId);

    res.json(qrCode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/payment/:id", async (req, res) => {
  try {
    const qrId = req.params.id;

    const qrCode = await razorpay.qrCode.fetchAllPayments(qrId);

    res.json(qrCode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/close-qr/:id", async (req, res) => {
  try {
    const qrId = req.params.id;

    debugger
    const response = await razorpay.qrCode.close(qrId);

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function getCloseByTimestamp() {
  return Math.floor(Date.now() / 1000) + 60 * 3;
}

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
