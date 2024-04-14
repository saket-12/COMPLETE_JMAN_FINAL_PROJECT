// skill.js
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skillName: {
    type: String,
    required: true,
  },
  proficiency: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  marksScored: {
    type: Number,
  },
});

const Skill = mongoose.model("Skill", skillSchema);
module.exports = Skill;
