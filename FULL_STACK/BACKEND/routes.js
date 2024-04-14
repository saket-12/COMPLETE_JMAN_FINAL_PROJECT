const express = require("express");
const router = express.Router();
const multer = require("multer");

const withAuth = require("./middleware/withAuth");

// Import controllers
const admin_userController = require("./controllers/admin_userController");
const authController = require("./controllers/authController");
const certificateController = require("./controllers/certificateController");
const projectController = require("./controllers/projectController");

const approverController = require("./controllers/approverController");
const dashboardController = require("./controllers/dashController");
const sendEmailController = require("./controllers/sendEmailController");

const skillController = require("./controllers/skillController");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "controllers/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// Routes
router.post("/api/admin", admin_userController.createAdmin);
router.post("/api/user", admin_userController.createUser);
router.post("/api/reset-password/:token", authController.resetPassword);
router.put(
  "/api/user/:userName/:forName/approve",
  approverController.createApprover
);
router.put("/api/user/:userName/disapprove", approverController.removeApprover);
router.post("/api/skills", skillController.createSkill);
router.post(
  "/api/certificates",
  upload.single("certificateFile"),
  certificateController.addCertificate
);

router.post("/api/project-experiences", projectController.addProjectExperience);
router.post("/api/send-email", sendEmailController.sendEmailOnUserCreation);

router.post(
  "/api/update-certificates",
  certificateController.changeCertificateApproveStatus
);
router.post(
  "/api/update-projects",
  projectController.changeProjectApproveStatus
);

router.post(
  "/api/automate/:approverEmail/:approveeEmail",
  sendEmailController.sendEmailOnApproverAssignment
);

router.post(
  "/api/update-approve/:email",
  sendEmailController.sendEmailOnApprove
);
router.post("/api/login", authController.login);

router.get("/user/:email", admin_userController.getUserByEmail);
router.get("/all-users", admin_userController.getAllUsers);
router.get("/admin/:email", admin_userController.getAdminByEmail);
router.get("/dashboard/:userId", dashboardController.getUserDataForDashboard);

router.get("/info/user/:name", admin_userController.getUserByName);
router.get("/certificates/:userId", certificateController.getCertificatedById);
router.get(
  "/pdf/certificates/:certificateId",
  certificateController.downloadCertificate
);
router.get("/projects/:userId", projectController.getProjectByUserId);
router.get(
  "/user-details",
  withAuth.withAuthUser,
  admin_userController.getUserByAuth
);
router.get(
  "/admin-details",
  withAuth.withAuthAdmin,
  admin_userController.getUserByAuth
);

module.exports = router;
