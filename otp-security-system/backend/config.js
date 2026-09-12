// Configuration file for OTP system
// All values are easily adjustable for flexibility
module.exports = {
  MAX_REQUESTS_PER_HOUR: 3,   // Limit OTP requests per hour
  OTP_EXPIRY: 30,             // OTP expires in 30 seconds
  RESEND_WINDOW: 5,           // Resend same OTP if requested within 5 minutes
  MAX_RESENDS: 3,             // Max resends allowed per OTP
  EMAIL_USER: "your_email@gmail.com", // Sender email
  EMAIL_PASS: "your_app_password"     // App password for Gmail
};
