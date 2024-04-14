import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [approverEmail, setApproverEmail] = useState("");
  const [approveeEmail, setApproveeEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    console.log(name);

    try {
      // Make API call to approve user
      const response = await axios.put(
        `http://localhost:3000/api/user/${name}/${userName}/approve`
      );
      console.log("------------------------", response.data);
      //setName("")
      //setUserName("")
      const response2 = await axios.get(
        `http://localhost:3000/info/user/${userName}`
      ); //to get email for approvee
      const approverEmail = response.data.user.email;
      const approveeEmail = response2.data.email;
      setApproverEmail(approverEmail);
      setApproveeEmail(approveeEmail);
      const response3 = await axios.post(
        `http://localhost:3000/api/automate/${approverEmail}/${approveeEmail}`,
        {
          approverName: name,
          approveeName: userName,
        }
      );
      alert(response3.data.message);
      setName("");
      setUserName("");
      // Handle success if needed
    } catch (error) {
      if (error.response.data === "Approver already present") {
        alert("Approver already present");
      } else {
        setError("Failed to approve user. Please try again.");
        console.error("Error approving user:", error);
      }

      // Handle error if needed
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <>
      <div className="text-lg font-bold m-5">
          <span style={{ color: "#22223B", fontSize: "1.6rem" }}>SM </span>
          <span style={{ color: "#4A4E69", fontSize: "1.4rem" }}>
            Skill Matrix
          </span>
        </div>
        
      <div className="max-w-md mx-auto my-10 p-5 border rounded shadow-lg bg-[#22223B]">
      
        <h2 className="text-center font-semibold text-2xl mb-6 text-white">Approve User</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <label className="block mb-2 font-semibold text-xl text-white">Approver Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
              className="w-full p-2 border rounded bg-[#4A4E69] text-white"
            />
          </div>
          <div className="mb-6 mt-4">
            <label className="block mb-2 font-semibold text-xl text-white">User Name:</label>
            <input
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              required
              className="w-full p-2 border rounded bg-[#4A4E69] text-white"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#9A8C98] text-white p-2 rounded hover:bg-blue-600"
          >
            {isLoading ? "Loading..." : "Make Approver"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    
    </>
  );
}

export default CreateUser;
