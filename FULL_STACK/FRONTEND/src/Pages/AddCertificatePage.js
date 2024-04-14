import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AddCertificatePage = () => {
  const location = useLocation();
  const { data } = location.state || {};

  const [formData, setFormData] = useState({
    userId: data.response._id,
    certificateName: "",
    organization: "",
    certificateFile: null, // Added for file input
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      certificateFile: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("userId", formData.userId);
      postData.append("certificateName", formData.certificateName);
      postData.append("organization", formData.organization);
      postData.append("certificateFile", formData.certificateFile); // Appending file

      const response = await axios.post(
        "http://localhost:3000/api/certificates",
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Certificate added successfully!");
      console.log("Form data submitted:", formData);
      setFormData({
        userId: data.response._id,
        certificateName: "",
        organization: "",
        certificateFile: null, // Reset file input
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
        className="w-full max-w-xs bg-[#22223B] rounded px-8 py-8 mb-4"
      >
        <h2
          className="text-2xl font-semibold mb-6 flex justify-center"
          style={{ color: "#FFFFFF" }}
        >
          Add a Certificate!
        </h2>
        <div>
          <label htmlFor="userID" style={{ color: "#FFFFFF" }}>
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
          <label htmlFor="certificateName" style={{ color: "#FFFFFF" }}>
            Certificate Name:
          </label>
          <input
            type="text"
            id="certificateName"
            name="certificateName"
            value={formData.certificateName}
            onChange={handleChange}
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="organization" style={{ color: "#FFFFFF" }}>
            Organization:
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
        </div>
        <div>
          <label htmlFor="certificateFile" style={{ color: "#FFFFFF" }}>
            Certificate File:
          </label>
          <input
            type="file"
            id="certificateFile"
            name="certificateFile"
            onChange={handleFileChange}
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
        </div>
        <button
          type="submit"
          className="bg-[#9A8C98] hover:bg-[#F2E9E4] hover:text-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Add Certificate
        </button>
      </form>
    </div>
  );
};

export default AddCertificatePage;
