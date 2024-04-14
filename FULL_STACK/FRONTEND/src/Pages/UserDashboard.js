import React from "react";
import axios from "axios";

const Dashboard = ({ dashboardInfo }) => {
  const { skills, certificates, projects } = dashboardInfo;

  const handleDownload = async (certificateId) => {
    try {
      // Make a GET request to the backend API endpoint
      const response = await axios.get(
        `http://localhost:3000/pdf/certificates/${certificateId}`,
        {
          responseType: "blob", // Ensure response type is blob for binary data
        }
      );

      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate_${certificateId}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          className="px-20 py-2 bg-[#9A8C98] text-[#22223B]  hover:bg-green-500 rounded"
          onClick={() => openTab("Skills")}
        >
          Skills
        </button>
        <button
          className="px-20 py-2 bg-[#9A8C98] text-[#22223B] hover:bg-green-500 rounded"
          onClick={() => openTab("Certificates")}
        >
          Certificates
        </button>
        <button
          className="px-20 py-2 bg-[#9A8C98] text-[#22223B] hover:bg-green-500 rounded"
          onClick={() => openTab("Projects")}
        >
          Projects
        </button>
      </div>

      <div className="tab-container">
        {/* Skills */}
        <div id="Skills" className="tabcontent hidden">
          <h3 className="mt-4 mb-2">Skills</h3>
          {skills.length === 0 ? (
            <div className="empty-data bg-black p-4 rounded text-white">
              <p>Nothing to show here yet! 😔</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="p-4 border rounded bg-green-300 "
                >
                  <h4>{skill.skillName}</h4>
                  <p>Proficiency: {skill.proficiency}</p>
                  <p>Verified: Yes</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certificates */}
        <div id="Certificates" className="tabcontent hidden">
          <h3 className="mt-4 mb-2">Certificates</h3>
          {certificates.length === 0 ? (
            <div className="empty-data bg-black p-4 rounded text-white">
              <p>Nothing to show here yet! 😔</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {certificates.map((certificate) => (
                <div
                  key={certificate._id}
                  className={`p-4 border rounded ${
                    certificate.isApproved ? "bg-green-300" : "bg-red-300"
                  }`}
                >
                  <h4>{certificate.certificateName}</h4>
                  <p>Organization: {certificate.organization}</p>
                  <p>Approved: {certificate.isApproved ? "Yes" : "No"}</p>
                  <button
                    onClick={() => handleDownload(certificate._id)}
                    className=" text-black hover:text-white hover:bg-black rounded mt-3 "
                  >
                    Downlaod Certificate
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects */}
        <div id="Projects" className="tabcontent hidden">
          <h3 className="mt-4 mb-2">Projects</h3>
          {projects.length === 0 ? (
            <div className="empty-data bg-black p-4 rounded text-white">
              <p>Nothing to show here yet! 😔</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className={`p-4 border rounded ${
                    project.isApproved ? "bg-green-300" : "bg-red-300"
                  }`}
                >
                  <h4>{project.projectName}</h4>
                  <p>Description: {project.description}</p>
                  <p>Start Date: {project.startDate}</p>
                  <p>End Date: {project.endDate}</p>
                  <p>Total Hours Worked: {project.totalHoursWorked}</p>
                  <p>Tech Used: {project.techUsed}</p>
                  <p>Performance: {project.performance}</p>
                  <p>Approved: {project.isApproved ? "Yes" : "No"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function openTab(tabName) {
  const tabs = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.add("hidden");
  }
  document.getElementById(tabName).classList.remove("hidden");
}

export default Dashboard;
