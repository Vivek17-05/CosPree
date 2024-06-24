import React, { useState } from 'react';
import Player from './Player';
import logo from './logo.png';
import './App.css';

const App = () => {
  const [url, setUrl] = useState('');
  const [inputUrl, setInputUrl] = useState('');

  const handleInputChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUrl(inputUrl);
  };

  return (
    <>
    <div className="company">
        <img src={logo} alt="Company logo" style={{ height:"56px",width:"56px"}}/>
        <div className="name">
          <b><span style={{ height:"19px"}}>Loom Integration for monday.com</span></b>
          <span style={{ height:"16px"}}> by Satisfaction Drivers</span>
        </div>
    </div>
    <div className="Container">
    
        <Player />
    </div>
    <div className="details">
      <div className="info">
        <div >
          <h4>Additional information</h4>
          <p style={{ height:"60px", marginBottom:"16px", marginTop:"16px"}}>Discover more resources on how to set up and use the app (incl. videos and troubleshooting guides).</p>
          <button type="button" class="btn btn-primary" style={{width:"140px"}}><a href="">Documentation</a></button>
          
        </div>
        <div>
          <h4>Get premium support</h4>
          <p style={{ height:"60px", marginBottom:"16px", marginTop:"16px"}}>Our support team is ready to help you out with any questions. Do not hesitate to contact us!</p>
          <button type="button" class="btn btn-primary" style={{width:"140px"}}><a href="">Support</a></button>
        </div>
      </div>
    </div>
    </>
  );
};

export default App;