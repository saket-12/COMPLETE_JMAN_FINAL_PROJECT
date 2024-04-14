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

exports.createApprover = async (req, res) => {
  const userName = req.params.userName;
  const forName = req.params.forName;

  try {
    //check whether an approver already exists for 'forName'
    const approvee = await User.findOne({ madeApproverFor: forName });

    if (approvee) {
      console.log("aprovee ---------", approvee);
      return res.status(400).send("Approver already present");
    }
    // Find the user by name
    const user = await User.findOne({ name: userName });

    if (!user) {
      console.log("---------++++++++++++++");
      return res.status(404).json({ error: "User not found" });
    }

    // Update the isApprover field to true
    user.isApprover = true;
    user.madeApproverFor = forName;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User approved successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeApprover = async (req, res) => {
  const userName = req.params.userName;

  try {
    // Find the user by name
    const user = await User.findOne({ name: userName });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the isApprover field to true
    user.isApprover = false;
    user.madeApproverFor = null;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User dis-approved successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
