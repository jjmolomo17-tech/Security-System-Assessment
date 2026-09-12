const crypto = require("crypto");
const config = require("./config");

let otpStore = {}; // { email: { otp, expiresAt, resendCount, lastSent } }

function generateOTP() {
  return crypto.randomInt(0, 999999).toString().padStart(6, "0");
}

function sendOTP(email) {
  const now = Date.now();
  let record = otpStore[email];

  if (record && (now - record.lastSent) < config.RESEND_WINDOW * 60 * 1000 && record.resendCount < config.MAX_RESENDS) {
    record.expiresAt = now + config.OTP_EXPIRY * 1000;
    record.resendCount++;
    return record.otp;
  }

  const otp = generateOTP();
  otpStore[email] = {
    otp,
    expiresAt: now + config.OTP_EXPIRY * 1000,
    resendCount: 0,
    lastSent: now
  };
  return otp;
}

function verifyOTP(email, otp) {
  const record = otpStore[email];
  if (!record) return false;
  if (record.otp !== otp) return false;
  if (Date.now() > record.expiresAt) return false;

  delete otpStore[email]; // OTP can’t be reused
  return true;
}

module.exports = { sendOTP, verifyOTP };
