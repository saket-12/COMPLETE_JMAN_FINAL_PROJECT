import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });

  const [adminData, setAdminData] = useState({});

  const location = useLocation();
  const login_email = location.state.email;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
      password: Math.random().toString(36).slice(-8),
    });
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdminDetails = async () => {
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
          `http://localhost:3000/admin-details`,
          config
        );
        console.log(response.data.isApprover);
        setAdminData(response.data);
        //console.log(userDetails);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchAdminDetails();
  }, [token, navigate]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming "/user" is the endpoint for creating a user
      console.log(userData);
      const response = await axios.post(
        "http://localhost:3000/api/user",
        userData
      );
      alert("User created successfully!");
      console.log(response.data);
      // Optionally clear form or navigate
      //setUserData({ name: "", email: "", password: "" });
      //navigate("/send-email");
    } catch (error) {
      console.error("There was an error creating the user:", error.message);
      alert("Failed to create user.");
    }
    // let userEmail;
    // let userPassword;
    // try {
    //   //getting user data for email
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     console.log("No token found");
    //     return;
    //   }
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
    //   const response1 = await axios.get(
    //     "http://localhost:3000/user-details",
    //     config
    //   );
    //   let userEmail = response1.data.email;
    //   let userPassword = response1.data.password;
    // } catch (error) {
    //   console.error("There was an error getting the email:", error.message);
    //   alert("Failed to get emailID.");

    try {
      let email = userData.email;
      let password = userData.password;
      console.log(email, password);
      //send email
      const response2 = await axios.post(
        "http://localhost:3000/api/send-email",
        {
          email: email,
          password: password,
        }
      );
      alert(response2.data.message);
      setUserData({ name: "", email: "", password: "", role: "", phone: "" });
    } catch (error) {
      console.error("There was an error sending the email:", error.message);
      alert("Failed to send email.");
    }
  };

  const goToMakeApprover = () => {
    navigate("/makeApprover");
  };

  const goToRemoveApprover = () => {
    navigate("/removeApprover");
  };

  const goToAdminDashboard = () => {
    navigate("/admindashboard", { state: login_email });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8 mt-3 mx-2">
      <div className="text-lg font-bold">
          <span style={{ color: "#22223B", fontSize: "1.6rem" }}>SM </span>
          <span style={{ color: "#4A4E69", fontSize: "1.4rem" }}>
            Skill Matrix
          </span>
        </div>
        <div>
          <button onClick={goToMakeApprover} className="mr-2 bg-[#9A8C98] text-white p-2 rounded hover:bg-green-600">
            Assign an Approver
          </button>
          <button onClick={goToRemoveApprover} className="mr-2 bg-[#9A8C98] text-white p-2 rounded hover:bg-green-600">
            Remove an Approver
          </button>
          <button onClick={goToAdminDashboard} className="mr-2 bg-[#9A8C98] text-white p-2 rounded hover:bg-green-600">
            Admin Dashboard
          </button>
          <button onClick={handleLogOut} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
            Log Out
          </button>
        </div>
      </div>
      <div className="max-w-md mx-auto mt-12 p-5 border rounded shadow-lg bg-[#22223B]">
      <h1 className="text-2xl font-bold mb-5 text-center text-white">Welcome, Admin!</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Create User Profile</h2>
        <div>
          <label className="block font-medium text-white">Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded bg-[#4A4E69] text-white"
          />
        </div>
        <div>
          <label className="block font-medium text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded bg-[#4A4E69] text-white"
          />
        </div>
        <div>
          <label className="block font-medium text-white">Role:</label>
          <input
            type="text"
            name="role"
            value={userData.role}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded bg-[#4A4E69] text-white"
          />
        </div>
        <div>
          <label className="block font-medium text-white">Phone:</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded bg-[#4A4E69] text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#9A8C98] text-white p-2 rounded hover:bg-blue-600"
        >
          Create User
        </button>
      </form>
    </div>
    </>
  );
}

export default AdminPage;
