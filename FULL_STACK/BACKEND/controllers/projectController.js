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

exports.addProjectExperience = async (req, res) => {
  try {
    console.log("connect random");
    // Extracting data from the request body
    const {
      userId,
      projectName,
      description,
      startDate,
      endDate,
      totalHoursWorked,
      techUsed,
      performance,
    } = req.body;
    console.log(req.body);
    // Creating a new project experience document directly using create()
    const projectExperience = await Project.create(req.body);
    console.log("projectExperience");
    // Sending the newly created project experience as a response
    res.status(201).json(projectExperience);
  } catch (error) {
    // Handling errors
    res.status(400).json({ error: error.message });
  }
};

exports.getProjectByUserId = async (req, res) => {
  try {
    console.log("Finding projects for user...");
    const userId = req.params.userId;
    console.log("User ID:", userId);
    const projects = await Project.find({ userId });
    console.log("Projects:", projects);
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.changeProjectApproveStatus = async (req, res) => {
  try {
    const projectInfo = req.body;

    // Iterate over the array of objects
    for (const obj of projectInfo) {
      // Find the certificate in the database based on certificateName
      const project = await Project.findOne({
        projectName: obj.projectName,
      });
      if (project) {
        // Update the isApproved field
        project.isApproved = obj.isApproved;
        // Save the updated certificate
        await project.save();
        console.log(`Project '${project.projectName}' updated successfully.`);
      } else {
        console.log(`Project '${obj.projectName}' not found.`);
      }
    }

    res.status(200).json({ message: "Projects updated successfully." });
  } catch (error) {
    console.error("Error updating projects:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
