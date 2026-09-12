# Security-System-Assessment

# OTP Security System (Email Authentication)

##  Overview
This project implements a secure One-Time Password (OTP) system using **Node.js** and **Nodemailer** for email delivery. It includes a simple frontend to test OTP sending and verification.

---

## Features
- 6-digit OTP (can start with 0)
- OTP expires after 30 seconds
- Resend same OTP if requested within 5 minutes (max 3 resends)
- Limit of 3 OTP requests per hour
- OTP cannot be reused once verified
- Email delivery via Gmail

---

##  Project Structure
