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

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashedPassword });
    res.status(200).send(admin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAdminByEmail = async (req, res) => {
  try {
    console.log("hihihi");
    const email = req.params.email;
    console.log(email);
    const user = await Admin.findOne({ email });
    console.log(user);
    res.json(user);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAdminByAuth = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).send({ error: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log(req);

    const user = await User.create(req.body);
    console.log(user);

    res.status(200).send(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserByAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "-password -resetPasswordToken -resetPasswordExpires"
    );
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);
    const user = await User.findOne({ email });
    console.log(user);
    res.json(user);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getUserByName = async (req, res) => {
  try {
    console.log("Request received");
    const { name } = req.params;
    console.log("Name parameter:", name);
    const user = await User.findOne({ name });
    console.log("User found:", user);

    if (!user) {
      // User not found
      return res.status(404).json({ message: "User not found" });
    }

    // User found, return it in the response
    res.json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    console.log("hihihi");
    const email = req.params.email;
    console.log(email);
    const user = await User.find();
    console.log(user);
    res.json(user);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
