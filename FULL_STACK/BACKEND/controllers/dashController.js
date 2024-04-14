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

exports.getUserDataForDashboard = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch related skills
    const skills = await Skill.find({ userId });

    // Fetch related certificates
    const certificates = await Certificate.find({ userId });

    // Fetch related projects
    const projects = await Project.find({ userId });

    // Construct response object
    const userData = {
      skills,
      certificates,
      projects,
    };

    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
