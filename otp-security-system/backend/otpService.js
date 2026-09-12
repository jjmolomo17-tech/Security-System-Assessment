const crypto = require("crypto");
const config = require("./config");

// In-memory store for OTPs per email
// Structure: { email: { otp, expiresAt, resendCount, lastSent } }
let otpStore = {};

// Generate a 6-digit OTP (can start with 0)
function generateOTP() {
  return crypto.randomInt(0, 999999).toString().padStart(6, "0");
}

// Send or resend OTP
function sendOTP(email) {
  const now = Date.now();
  let record = otpStore[email];

  // If within resend window and resend limit not exceeded → reuse OTP
  if (record && (now - record.lastSent) < config.RESEND_WINDOW * 60 * 1000 && record.resendCount < config.MAX_RESENDS) {
    record.expiresAt = now + config.OTP_EXPIRY * 1000;
    record.resendCount++;
    return record.otp;
  }

  // Otherwise → generate new OTP
  const otp = generateOTP();
  otpStore[email] = {
    otp,
    expiresAt: now + config.OTP_EXPIRY * 1000,
    resendCount: 0,
    lastSent: now
  };
  return otp;
}

// Verify OTP validity
function verifyOTP(email, otp) {
  const record = otpStore[email];
  if (!record) return false;
  if (record.otp !== otp) return false;
  if (Date.now() > record.expiresAt) return false;

  delete otpStore[email]; // OTP cannot be reused
  return true;
}

module.exports = { sendOTP, verifyOTP };
