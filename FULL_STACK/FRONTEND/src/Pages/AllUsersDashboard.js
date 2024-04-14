import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import UserDetails from "./UserDetails"; // Import the UserDetails component

function AllUsersDashboard() {
  const [usersData, setUsersData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/all-users");
        setUsersData(response.data);
      } catch (error) {
        console.error("Failed to fetch users data:", error);
      }
    };

    fetchUsersData();
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };
  
  const handleCloseUserDetails = () => {
    setSelectedUserId(null); // Reset selectedUserId to close UserDetails component
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-5 text-center">All Users Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4"> {/* Adjusted grid columns to show 3 cards */}
        {usersData.map((user) => (
          <div key={user._id} className={`bg-[#4A4E69] hover:bg-[#22223B] text-white text-xl border rounded shadow p-10 m-2 cursor-pointer relative ${user.isApprover ? 'flex justify-between items-center' : ''}`} onClick={() => handleUserClick(user._id)}> {/* Added relative class to handle emoji positioning */}
            {user.isApprover && <span className="absolute top-0 right-0 text-xl">✍️</span>} {/* Added emoji for approver */}
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-black">{user.email}</p>
          </div>
        ))}
      </div>

      {selectedUserId && <UserDetails userId={selectedUserId} onClose={handleCloseUserDetails} />} {/* Render UserDetails component if a user is selected */}
    </>
  );
}

export default AllUsersDashboard;
