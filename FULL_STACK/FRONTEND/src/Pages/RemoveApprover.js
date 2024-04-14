import React, { useState } from "react";
import axios from "axios";

function DisapproveUser() {
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleDisapprove = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/${userName}/disapprove`
      );

      setMessage(response.data.message);
      alert(`${userName} is no longer an approver`);
      setUserName("");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="text-lg font-bold m-2">
      <span style={{ color: "#22223B", fontSize: "1.6rem" }}>SM </span>
      <span style={{ color: "#4A4E69", fontSize: "1.4rem" }}>
        Skill Matrix
      </span>
      <div className="flex justify-center items-center h-screen  ">
        <div className="max-w-md mx-auto p-5 border rounded shadow-lg bg-[#22223B] ">
          <h1 className="text-center font-bold text-2xl mb-6 text-white">Remove Approver</h1>
          <form>
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-xl text-white">Approver Name:</label>
              <input
                type="text"
                value={userName}
                onChange={handleNameChange}
                required
                className="w-full p-2 border rounded bg-[#4A4E69] text-white"
              />
            </div>
            <button
              type="button"
              onClick={handleDisapprove}
              className="w-full bg-[#9A8C98] text-white p-2 rounded hover:bg-red-600"
            >
              Disapprove User
            </button>
          </form>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
        </div>
      </div>
    </div>
  );
}

export default DisapproveUser;
