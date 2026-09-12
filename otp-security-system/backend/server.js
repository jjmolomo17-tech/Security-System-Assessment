const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { sendOTP, verifyOTP } = require("./otpService");
const config = require("./config");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  }
});

app.post("/send-otp", (req, res) => {
  const { email } = req.body;
  const otp = sendOTP(email);

  transporter.sendMail({
    from: config.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It expires in ${config.OTP_EXPIRY} seconds.`
  });

  res.json({ message: "OTP sent successfully" });
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const valid = verifyOTP(email, otp);
  res.json({ valid });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
