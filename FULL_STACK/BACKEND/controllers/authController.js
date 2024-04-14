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

exports.login = async (req, res) => {
  

  const { email, password } = req.body;
  console.log(email, password);

  // First, try to find the user
  let foundUser = await User.findOne({ email: email });
  let isUser = true;

  // If not found as a user, try finding as an admin
  if (!foundUser) {
    foundUser = await Admin.findOne({ email: email });
    isUser = false;
  }

  // If no record is found in both collections
  if (!foundUser) {
    return res.status(401).json({ error: "No user found with this email." });
  }

  // Check password (PLAIN TEXT - Not recommended)
  const isMatched = await bcrypt.compare(password, foundUser.password);
  if (!isMatched) {
    return res.status(401).json({ error: "Incorrect password." });
  }

  // Generate token assuming use of JWT
  const token = jwt.sign(
    {
      userId: foundUser._id,
      userType: isUser ? "user" : "admin",
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Logged in successfully",
    token,
    userType: isUser ? "user" : "admin",
  });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(404).send("TOKEN EXPIRED");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isPasswordSet = true;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated Successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ error: "Failed to update password" });
  }
};
