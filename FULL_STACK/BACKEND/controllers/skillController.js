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

exports.createSkill = async (req, res) => {
  try {
    // Extracting data from the request body
    const { userId, skillName, proficiency } = req.body;

    // Creating a new skill document directly using create()
    const skill = await Skill.create({
      userId,
      skillName,
      proficiency,
    });

    console.log(skill);

    // Sending the newly created skill as a response
    res.status(201).json(skill);
  } catch (error) {
    // Handling errors
    res.status(400).json({ error: error.message });
  }
};
