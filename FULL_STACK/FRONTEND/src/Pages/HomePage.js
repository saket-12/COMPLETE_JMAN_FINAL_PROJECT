import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import landingPageVideo from '../assets/landingPageVideo.mp4';

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const videoStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
    filter: isHovered ? 'blur(5px)' : 'none', // Apply blur effect on hover
    transition: 'filter 0.3s ease',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    zIndex: -1,
  };

  const centerTextStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%', // Make the div wider
    height: '40%', // Make the div longer
    backgroundColor: 'rgba(128, 128, 128, 0.5)', // Transparent grey background
    color: 'white',
    padding: '20px',
    borderRadius: '5px',
    zIndex: 1, // Ensure text is on top of video
    textAlign: 'center', // Center align text horizontally
    fontFamily: 'Arial, sans-serif', // Apply a different font family
    fontSize: '40px', // Apply a font size
    fontWeight: 'bold', // Apply font weight
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  

  const buttonStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
    borderRadius: '5px',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    zIndex: 1, // Ensure button is on top of video
  };

  return (
    <div>
      <video style={videoStyle} autoPlay loop muted>
        <source src={landingPageVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={overlayStyle}></div>
      <div style={centerTextStyle}>
        <h2>Welcome to Skill Matrix</h2>
      </div>
      <button
        style={buttonStyle}
        onClick={handleLogin}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        Login
      </button>
    </div>
  );
};

export default HomePage;
