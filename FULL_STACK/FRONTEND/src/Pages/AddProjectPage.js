import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AddProjectExperiencePage = () => {
  const location = useLocation();
  const { data } = location.state || {};

  const [formData, setFormData] = useState({
    userId: data.response._id,
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    totalHoursWorked: "",
    techUsed: "",
    performance: "",
  });

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
        "http://localhost:3000/api/project-experiences",
        formData
      );
      alert("Project experience added successfully!");
      console.log("Form data submitted:", formData);
      setFormData({
        userId: data.response._id,
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
        totalHoursWorked: "",
        techUsed: "",
        performance: "",
      });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-2xl font-bold absolute top-0 left-0 mt-4 ml-4">
        <span style={{ color: "#22223B", fontSize: "1.6rem" }}>SM </span>
        <span style={{ color: "#4A4E69", fontSize: "1.4rem" }}>
          Skill Matrix
        </span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-[40%] bg-[#22223B] rounded px-8 py-8 mb-8 mt-16"
      >
        <h2
          className="text-2xl font-semibold mb-6 flex justify-center"
          style={{ color: "#FFFFFF" }}
        >
          Add a Project experience!
        </h2>
        <div>
          <label htmlFor="userID" className="text-white">
            User ID:
          </label>
          <input
            type="text"
            id="userID"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            readOnly
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="projectName" className="text-white">
            Project Name:
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="text-white">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="text-white">
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="text-white">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="totalHoursWorked" className="text-white">
            Total Hours Worked:
          </label>
          <input
            type="number"
            id="totalHoursWorked"
            name="totalHoursWorked"
            value={formData.totalHoursWorked}
            onChange={handleChange}
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="techUsed" className="text-white">
            Technologies Used:
          </label>
          <input
            type="text"
            id="techUsed"
            name="techUsed"
            value={formData.techUsed}
            onChange={handleChange}
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="performance" className="text-white">
            Performance:
          </label>
          <input
            type="text"
            id="performance"
            name="performance"
            value={formData.performance}
            onChange={handleChange}
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-[#9A8C98] hover:bg-[#F2E9E4] hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Add Project Experience
        </button>
      </form>
    </div>
  );
};

export default AddProjectExperiencePage;
