import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import VerifyPage from "./VerifySkillPage";

const AddSkillPage = () => {
  const location = useLocation();
  const { data } = location.state || {};
  //const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: data.response._id,
    skillName: "",
    proficiency: null,
  });

  const [showVerifyPage, setShowVerifyPage] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/skills",
        formData
      );
      alert("Skill added successfully!");
      setFormData({
        userId: data.response._id,
        skillName: "",
        proficiency: null,
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleVerifySkill = () => {
    setShowVerifyPage(true);
  };

  const updateProficiency = (proficiencyLevel) => {
    setFormData({
      ...formData,
      proficiency: proficiencyLevel,
    });
    setShowVerifyPage(false);
  };

  const skillOptions = [
    "SQL",
    "Python",
    "JavaScript",
    "React",
    "Angular",
    "PowerBI",
    "Alteryx",
    "AWS",
    "ADF",
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-bold absolute top-0 left-0 mt-4 ml-4">
        <span style={{ color: "#22223B", fontSize: "1.6rem" }}>SM </span>
        <span style={{ color: "#4A4E69", fontSize: "1.4rem" }}>
          Skill Matrix
        </span>
      </h1>
      {showVerifyPage ? (
        <VerifyPage
          skillName={formData.skillName}
          updateProficiency={updateProficiency} // Pass the updateProficiency function
        />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs bg-[#22223B] rounded px-8 py-8 mb-4"
        >
          <h2
            className="text-2xl font-semibold mb-6 flex justify-center"
            style={{ color: "#FFFFFF" }}
          >
            Add a Skill!
          </h2>
          {/* Input fields */}
          <input
            type="text"
            id="userID"
            name="userID"
            value={formData.userId}
            onChange={handleChange}
            required
            readOnly
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
          <select
            id="skillName"
            name="skillName"
            value={formData.skillName}
            onChange={handleChange}
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
            placeholder="Select Skill"
          >
            <option value="">Select Skill</option>
            {skillOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          {formData.proficiency !== null && (
            <input
              type="text"
              id="proficiency"
              name="proficiency"
              value={formData.proficiency}
              readOnly
              className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
            />
          )}
          {/* Buttons */}
          <button
            type="button"
            onClick={handleVerifySkill}
            className="mt-4 bg-[#9A8C98] hover:bg-[#F2E9E4] hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Verify Skill via Test
          </button>
          <button
            type="submit"
            disabled={formData.proficiency === null}
            className={`mt-4 ${
              formData.proficiency === null ? "bg-gray-400" : "bg-[#9A8C98]"
            } hover:bg-[#F2E9E4] hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Add Skill
          </button>
          {formData.proficiency === null && (
            <p className="text-white mt-2">
              The Add Skill button will only be enabled after you verify skill
              via test
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default AddSkillPage;
