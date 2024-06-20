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
    
    <div className="Container">
    <div className="company">
        <img src={logo} alt="Company logo" />
        <div className="name">
          <h3>App Name</h3>
          <p> by Company name</p>
        </div>
    </div>
        <Player />
    </div>
    <div className="details">
      <div className="info">
        <div >
          <h4>Additional information</h4>
          <p>Discover more resources on how to set up and use the app (incl. videos and troubleshooting guides).</p>
          <button type="button" class="btn btn-primary" style={{width:"130px"}}><a href="">Documentation</a></button>
          
        </div>
        <div>
          <h4>Get premium support</h4>
          <p>Our support team is ready to help you out with any questions. Do not hesitate to contact us!</p>
          <button type="button" class="btn btn-primary" style={{width:"130px"}}><a href="">Support</a></button>
        </div>
      </div>
    </div>
    </>
  );
};

export default App;