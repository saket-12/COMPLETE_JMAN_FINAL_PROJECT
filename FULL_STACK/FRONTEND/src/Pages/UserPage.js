import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Dashboard from "./UserDashboard";

function UserPage() {
  const [userDetails, setUserDetails] = useState();
  const [dashboardInfo, setDashboardInfo] = useState();
  const location = useLocation();
  //const details = location.state;
  //setUserDetails(details);
  //const login_email = location.state.email.email;
  // const isApprover = location.state.email;
  // console.log("Before");
  // console.log(isApprover);
  // console.log("After");
  const navigate = useNavigate();
  let certificateInfo;

  const handleSkillClick = () => {
    // Assuming 'data' is the response you want to pass
    const data = { response: userDetails };

    // Navigate to the /addSkill route along with the data
    navigate("/addSkill", { state: { data } });
  };
  const handleCertificateClick = () => {
    // Assuming 'data' is the response you want to pass
    const data = { response: userDetails };

    // Navigate to the /addSkill route along with the data
    navigate("/addCertificate", { state: { data } });
  };
  const handleProjectClick = () => {
    // Assuming 'data' is the response you want to pass
    const data = { response: userDetails };

    // Navigate to the /addSkill route along with the data
    navigate("/addProject", { state: { data } });
  };

  const handleApproveClick = () => {
    navigate("/skill-certificate-approve", { state: { userDetails } });
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!token) {
          alert("Please Login");
          navigate("/login");
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:3000/user-details`,
          config
        );
        //console.log(response.data.isApprover);
        setUserDetails(response.data);

        const id = response.data._id;
        const dashboardResponse = await axios.get(
          `http://localhost:3000/dashboard/${id}`
        );

        //console.log('random1');
        //console.log(dashboardResponse.data.certificates[0].certificateName);
        //console.log('random2');
        //certificateInfo = dashboardResponse.data.certificates;
        setDashboardInfo(dashboardResponse.data);
        //console.log(dashboardInfo);
        //console.log('random3');
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }

      
    };

    fetchUserDetails();
  }, [token, navigate]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top bar */}
      <div className="bg-white flex justify-between items-center px-8 py-4">
        <div className="text-lg font-bold">
          <span style={{ color: "#22223B", fontSize: "1.6rem" }}>SM </span>
          <span style={{ color: "#4A4E69", fontSize: "1.4rem" }}>
            Skill Matrix
          </span>
        </div>
        <div>
          <button
            onClick={handleSkillClick}
            className="bg-[#4A4E69] hover:bg-green-500 text-white font-semibold py-2 px-4 rounded mr-2"
          >
            Add Skill
          </button>
          <button
            onClick={handleCertificateClick}
            className="bg-[#4A4E69] hover:bg-green-500 text-white font-semibold py-2 px-4 rounded mr-2"
          >
            Add Certificates
          </button>
          <button
            onClick={handleProjectClick}
            className="bg-[#4A4E69] hover:bg-green-500 text-white font-semibold py-2 px-4 rounded mr-2"
          >
            Add Project Experience
          </button>
          <button
            onClick={handleLogOut}
            className="bg-[#4A4E69] hover:bg-red-500 text-white font-semibold py-2 px-4 rounded"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Welcome message */}
      {userDetails && (
        <div className="bg-white py-4 px-8">
          <p className="text-2xl font-semibold text-[#22223B]">
            Hello, {userDetails.name}!
          </p>
          {userDetails.isApprover && (
            <div className="flex items-center mt-4">
              <p className="text-[#22223B]">You have been made an approver.</p>
              <button
                onClick={handleApproveClick}
                className="bg-[#4A4E69] hover:bg-green-500 text-white font-semibold py-2 px-4 rounded ml-4"
              >
                Go to Skill Certificate Approve
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      {/* <div className="flex bg-[#4A4E69] text-white">
        <button className="py-2 px-4 flex-1">Skills</button>
        <button className="py-2 px-4 flex-1">Certificates</button>
        <button className="py-2 px-4 flex-1">Projects</button>
      </div> */}

      {/* Dashboard */}
      {dashboardInfo && <Dashboard dashboardInfo={dashboardInfo} />}
    </div>
  );
}

export default UserPage;
