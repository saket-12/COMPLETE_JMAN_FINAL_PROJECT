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

exports.addCertificate = async (req, res) => {
  try {
    console.log("certificate random");
    // Extracting data from the request body
    const { userId, certificateName, organization } = req.body;
    const certificateFile = req.file;
    console.log("certificate random2");

    // Logic to handle the file, for example, saving it to the database or filesystem

    // Creating a new certificate document directly using create()
    const certificate = await Certificate.create({
      userId,
      certificateName,
      organization,
      certificateFile: certificateFile.originalname, // Example: saving file name to database
    });
    console.log(certificate);
    // Sending the newly created certificate as a response
    res.status(201).json(certificate);
  } catch (error) {
    // Handling errors
    res.status(400).json({ error: error.message });
  }
};

exports.getCertificatedById = async (req, res) => {
  try {
    console.log("Finding certificates for user...");
    const userId = req.params.userId;
    console.log("User ID:", userId);
    const certificates = await Certificate.find({ userId });
    console.log("Certificates:", certificates);
    res.json(certificates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.downloadCertificate = async (req, res) => {
  try {
    console.log("d1");
    const certificate = await Certificate.findById(req.params.certificateId);
    if (!certificate) {
      console.log("lag gayi....");
      return res.status(404).json({ error: "Certificate not found" });
    }
    console.log("d2");

    // Assuming the file path or filename is stored in certificate.certificateFile
    const filePath = path.join(
      __dirname,
      "uploads",
      certificate.certificateFile
    );
    console.log("d3");

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    // Set the appropriate headers for downloading the PDF file
    res.setHeader(
      "Content-disposition",
      `attachment; filename="${certificate.certificateFile}"`
    );
    res.setHeader("Content-type", "application/pdf");

    // Stream the file as response
    fs.createReadStream(filePath).pipe(res);
  } catch (error) {
    console.error("Error retrieving PDF:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.changeCertificateApproveStatus = async (req, res) => {
  try {
    const certificateInfo = req.body;

    // Iterate over the array of objects
    for (const obj of certificateInfo) {
      // Find the certificate in the database based on certificateName
      const certificate = await Certificate.findOne({
        certificateName: obj.certificateName,
      });
      if (certificate) {
        // Update the isApproved field
        certificate.isApproved = obj.isApproved;
        // Save the updated certificate
        await certificate.save();
        console.log(
          `Certificate '${certificate.certificateName}' updated successfully.`
        );
      } else {
        console.log(`Certificate '${obj.certificateName}' not found.`);
      }
    }

    res.status(200).json({ message: "Certificates updated successfully." });
  } catch (error) {
    console.error("Error updating certificates:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
