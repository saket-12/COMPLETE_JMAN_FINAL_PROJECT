const Admin = require("../Models/Admin");
const User = require("../Models/User");
const Skill = require("../Models/Skill");
const Certificate = require("../Models/Certification");
const Project = require("../Models/Project");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
 
dotenv.config();

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL, // sender email id
      pass: process.env.PASSWORD, // third party app pass word generated from google
    },
  })
);

exports.sendEmailOnUserCreation = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Generate default password
    const defaultPassword = password;
    const token = crypto.randomBytes(20).toString("hex");

    const user = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000, // Token expires in 1 hour (3600000 milliseconds)
        },
      }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const link = `http://localhost:3001/reset-password/${token}`;
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Enter your email
      to: email,
      subject: "Reset Your Password",
      text: `Click the following link to reset your password: ${link}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent successfully from backend" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to send email from backend" });
  }
};

exports.sendEmailOnApproverAssignment = async (req, res) => {
  //const { email, password } = req.body;
  const approverEmail = req.params.approverEmail;
  const approveeEmail = req.params.approveeEmail;
  const { approverName, approveeName } = req.body;
  try {
    const mailOptionsApprovee = {
      from: process.env.SENDER_EMAIL, // Enter your email
      to: approveeEmail,
      subject: "Approver Assigned",
      text: `You have ben assigned ${approverName} as you approver to approve your certificates and Project Experineces.`,
    };

    const mailOptionsApprover = {
      from: process.env.SENDER_EMAIL, // Enter your email
      to: approverEmail,
      subject: "Made Approver",
      text: `You have been made an approver for ${approveeName} by the admin. Login to approve `,
    };

    await transporter.sendMail(mailOptionsApprover);
    await transporter.sendMail(mailOptionsApprovee);

    res.json({
      message: `Both ${approverName} and ${approveeName} have been notified via mail`,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Failed to send email to notify approver and approvee" });
  }
};

exports.sendEmailOnApprove = async (req, res) => {
  //const { email, password } = req.body;
  //const approverEmail = req.params.approverEmail;
  //const approveeEmail = req.params.approveeEmail;
  const email = req.params.email;
  const { approverName } = req.body;
  try {
    const mailOptionsApprover = {
      from: process.env.SENDER_EMAIL, // Enter your email
      to: email,
      subject: "Approve Status Changed",
      text: `The approve status of you certificates and project experience has been changed by your approver ${approverName}. Login to see the chnages!`,
    };

    await transporter.sendMail(mailOptionsApprover);
    //await transporter.sendMail(mailOptionsApprovee);

    res.json({
      message: `Change of status notified via email to the approvee`,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Failed to send email to notify approver and approvee" });
  }
};
