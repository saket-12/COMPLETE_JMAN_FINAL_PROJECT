import React, { useEffect, useState } from "react";
import axios from "axios";

function UserDetails({ userId , onClose}) {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("skills");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/dashboard/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const renderSkillTabs = () => {
    return (
      <div className="border rounded p-4 bg-[#4A4E69]">
        <h2 className="text-lg font-semibold mb-2">Skills</h2>
        {userData && userData.skills.map((skill) => (
          <div key={skill._id} className={`p-2 mb-2 ${skill.isVerified ? 'bg-green-200' : 'bg-red-200'}`}>
            <p className="font-semibold">{skill.skillName}</p>
            <p>Proficiency: {skill.proficiency}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderCertificateTabs = () => {
    return (
      <div className="border rounded p-4 bg-[#4A4E69]">
        <h2 className="text-lg font-semibold mb-2">Certificates</h2>
        {userData && userData.certificates.map((certificate) => (
          <div key={certificate._id} className={`p-2 mb-2 ${certificate.isApproved ? 'bg-green-200' : 'bg-red-200'}`}>
            <p className="font-semibold">{certificate.certificateName}</p>
            <p>Organization: {certificate.organization}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderProjectTabs = () => {
    return (
      <div className="bg-[#4A4E69] border rounded p-4">
        <h2 className="text-lg font-semibold mb-2">Projects</h2>
        {userData && userData.projects.map((project) => (
          <div key={project._id} className={`p-2 mb-2 ${project.isApproved ? 'bg-green-200' : 'bg-red-200'}`}>
            <p className="font-semibold">{project.projectName}</p>
            <p>Description: {project.description}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "skills":
        return userData && userData.skills.length > 0 ? renderSkillTabs() : <NoDataMessage />;
      case "certificates":
        return userData && userData.certificates.length > 0 ? renderCertificateTabs() : <NoDataMessage />;
      case "projects":
        return userData && userData.projects.length > 0 ? renderProjectTabs() : <NoDataMessage />;
      default:
        return null;
    }
  };

  const NoDataMessage = () => {
    return (
      <div className="text-center bg-black text-white p-4 rounded">
        <p className="text-lg">Nothing to show here yet!</p>
        <p>😞</p>
      </div>
    );
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-md mx-auto my-10 p-5 border rounded shadow-lg relative bg-[#22223B]">
      <div className="flex justify-between mb-5">
        <button onClick={() => onClose()} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Close</button>
        <div className="flex">
          <button onClick={() => handleTabClick("skills")} className={`w-1/3  mx-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${activeTab === "skills" ? "bg-blue-600" : ""}`}>Skills</button>
          <button onClick={() => handleTabClick("certificates")} className={`w-1/3 mx-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${activeTab === "certificates" ? "bg-blue-600" : ""}`}>Certificates</button>
          <button onClick={() => handleTabClick("projects")} className={`w-1/3 mx-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${activeTab === "projects" ? "bg-blue-600" : ""}`}>Projects</button>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
}

export default UserDetails;
