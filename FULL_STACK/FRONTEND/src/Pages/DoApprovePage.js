import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SkillCertificateApprove() {
  const [id, setId] = useState("");
  const [certificateInfo, setCertificateInfo] = useState(null);
  const [projectInfo, setProjectInfo] = useState(null);
  const [sendEmailId, setSendEmailId] = useState("");
  const location = useLocation();
  const userDetails = location.state.userDetails;
  const approverFor = userDetails.madeApproverFor;
  const approverName = userDetails.name;
  const navigate = useNavigate();
  //console.log(userDetails);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/info/user/${approverFor}`)
      .then((response) => {
        const userId = response.data._id;
        const email = response.data.email;
        setSendEmailId(email);
        setId(userId);

        axios
          .get(`http://localhost:3000/certificates/${userId}`)
          .then((certificateResponse) => {
            setCertificateInfo(certificateResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching certificate info:", error);
          });

        axios
          .get(`http://localhost:3000/projects/${userId}`)
          .then((projectResponse) => {
            setProjectInfo(projectResponse.data);
          })
          .catch((error) => {
            console.error("Error fetching project info:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, [approverFor]);

  const handleToggleApproval = (index, type) => {
    if (type === "certificate") {
      const updatedCertificateInfo = [...certificateInfo];
      updatedCertificateInfo[index].isApproved =
        !updatedCertificateInfo[index].isApproved;
      setCertificateInfo(updatedCertificateInfo);
      //type = typeof certificateInfo
      console.log(certificateInfo);
      //console.log(typeof [1, 2, 3]);
      //console.log(certificateInfo.length);
    } else if (type === "project") {
      const updatedProjectInfo = [...projectInfo];
      updatedProjectInfo[index].isApproved =
        !updatedProjectInfo[index].isApproved;
      setProjectInfo(updatedProjectInfo);
      console.log(projectInfo);
    }
  };

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

  const renderInfo = (info, type) => {
    return (
      <div>
        {info.map((item, index) => (
          <div
            key={index}
            className={`p-4 mb-4 ${
              item.isApproved ? "bg-green-200" : "bg-red-200"
            }`}
          >
            {Object.entries(item)
              .filter(
                ([key]) =>
                  key !== "_id" && key !== "__v" && key !== "isApproved"
              )
              .map(([key, value]) => (
                <p key={key}>
                  <strong>{key}: </strong>{" "}
                  {key === "certificateFile" ? (
                    <span>
                      {value}{" "}
                      <button
                        onClick={() => handleDownload(item._id)}
                        className="border rounded-md bg-[#22223B] text-white hover:bg-blue-300 w-20"
                      >
                        Download
                      </button>
                    </span>
                  ) : (
                    value
                  )}
                </p>
              ))}
            <button
              onClick={() => handleToggleApproval(index, type)}
              className="border border-black rounded-md p-2 mt-4 hover:bg-blue-300"
            >
              {item.isApproved ? "Reject" : "Approve"}
            </button>
          </div>
        ))}
      </div>
    );
  };

  const sendCertificateAndProjectInfoToBackend = async () => {
    axios
      .post("http://localhost:3000/api/update-certificates", certificateInfo)
      .then((response) => {
        console.log("Certificate info sent to backend:", response.data);
      })
      .catch((error) => {
        console.error("Error sending certificate info to backend:", error);
      });

    // second axios call for projects

    axios
      .post("http://localhost:3000/api/update-projects", projectInfo)
      .then((projectResponse) => {
        console.log("Project info sent to backend:", projectResponse.data);
      })
      .catch((projectError) => {
        console.error("Error sending project info to backend:", projectError);
      });

    const response = await axios.post(
      `http://localhost:3000/api/update-approve/${sendEmailId}`,
      { approverName: approverName }
    );
    navigate("/user", { state: { userDetails } });
    alert(response.data.message);
  };

  return (
    <div className="container mx-auto">
      {/* <h1>{certificateInfo.certificateName}</h1> */}
      <h1 className="text-3xl  mb-4 bg-[#22223B] text-white p-2">
        {approverFor}
      </h1>
      <h1 className="text-2xl font-semibold mb-2 text-[#22223B]">
        User ID: {id}
      </h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#4A4E69]">
          Certificate Info:
        </h2>
        {certificateInfo ? (
          renderInfo(certificateInfo, "certificate")
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2 text-[#4A4E69]">
          Project Info:
        </h2>
        {projectInfo ? renderInfo(projectInfo, "project") : <p>Loading...</p>}
      </div>
      <button
        onClick={sendCertificateAndProjectInfoToBackend}
        className="mt-2 border border-black rounded-md mb-2 bg-[#9A8C98] px-2 hover:bg-blue-300"
      >
        Submit
      </button>
    </div>
  );
}

export default SkillCertificateApprove;
