import Sms from "../models/Sms.js";
import twilio from "twilio"; // Import Twilio SDK
import nodemailer from "nodemailer"; // Import Nodemailer

// Twilio setup
const accountSid = ""; 
const authToken = "";
const client = twilio(accountSid, authToken);

// Nodemailer setup with Mailtrap
const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "",
    pass: "",
  },
});

export const addSmsAndEmail = async (req, res) => {
  const { mobile, appointmentId, date, email } = req.body; // Include email in request body

  try {
    // Create the SMS record in the database
    const newSms = await Sms.create({ mobile, appointmentId, date, email });

    // Prepare SMS message
    const fromSms = "+19014728098";
    const text = `Your appointment (ID: ${appointmentId}) is scheduled for ${date}.`;

    // Send SMS using Twilio API
    let smsResult = { success: false, error: null };
    try {
      await client.messages.create({
        body: text,
        from: fromSms,
        to: mobile,
      });
      smsResult.success = true;
    } catch (smsError) {
      smsResult.error = smsError.message; // Capture SMS error
    }

    // Send Email using Nodemailer and Mailtrap
    let emailResult = { success: false, error: null };
    const mailOptions = {
      from: "chethiyabandaraherath@gmail.com",
      to: email,
      subject: "Appointment Confirmation",
      text: `Your appointment (ID: ${appointmentId}) is scheduled for ${date}.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      emailResult.success = true;
    } catch (emailError) {
      emailResult.error = emailError.message; // Capture email error
    }

    // Respond to client after sending SMS and email
    res.status(201).json({
      message: "SMS record added.",
      newSms,
      smsStatus: smsResult,
      emailStatus: emailResult,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error adding SMS record: ${error.message}` });
  }
};
