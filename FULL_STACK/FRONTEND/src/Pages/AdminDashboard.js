import React, { useEffect, useState } from "react";
import axios from "axios";
import AllUsersDashboard from "./AllUsersDashboard"; // Import the AllUsersDashboard component

function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/saketsingh.sjv@gmail.com"
        );
        setAdminData(response.data);
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <>
      {/* Add the SM Skill Matrix text at the top with padding */}
      <div className="text-lg font-bold m-5">
          <span style={{ color: "#22223B", fontSize: "1.8rem" }}>SM </span>
          <span style={{ color: "#4A4E69", fontSize: "1.6rem" }}>
            Skill Matrix
          </span>
        </div>

      {/* Display the name of the admin with increased font size */}
      {adminData && (
        <div className="rounded m-2 text-white">
          <p className="text-2xl font-bold pd-2 pl-4 text-[#22223B]  ">Hello, {adminData.name}</p>
          <p className="text-xl pd-2 pl-4 text-[#22223B]">Email: {adminData.email}</p>
        </div>
      )}

      {/* Display the AllUsersDashboard */}
      <AllUsersDashboard />
    </>
  );
}

export default AdminDashboard;
