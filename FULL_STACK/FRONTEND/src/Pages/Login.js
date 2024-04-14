import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      console.log(response.config.data);
      const data1 = JSON.parse(response.config.data);
      console.log(data1.email);
      //const login_email = data1.email;
      const data = response.data;
      alert(data.message);
      // Save token in local storage or context for future requests
      localStorage.setItem("token", data.token);
      // Redirect based on user type
      if (data.userType === "admin") {
        navigate("/admin", {
          state: { email: data1.email },
        });
      } else {
        navigate("/user", {
          state: { email: data1 },
        });
      }
    } catch (error) {
      console.error("login failed", error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-lightgrey flex flex-col justify-center items-center relative bg-[#F2E9E4]">
      <h1 className="text-2xl font-bold absolute top-0 left-0 mt-4 ml-4">
        <span style={{ color: "#22223B", fontSize: "1.6rem" }}>SM </span>
        <span style={{ color: "#4A4E69", fontSize: "1.4rem" }}>
          Skill Matrix
        </span>
      </h1>
      <div className="w-full max-w-md bg-[#22223B] text-white rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block mb-2"
            style={{ color: "white" }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
          <label
            htmlFor="password"
            className="block mb-2"
            style={{ color: "white" }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="appearance-none block w-full bg-[#4A4E69] text-white border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none  focus:border-gray-500"
          />
          <button
            type="submit"
            className="bg-[#9A8C98] hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
        {/* <Link to={""} element={<ForgetPassword />} /> */}
      </div>
    </div>
  );
};

export default LoginPage;
