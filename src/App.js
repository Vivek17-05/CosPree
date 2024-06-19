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
        <img src={logo} alt="Company logo" />
        <div className="name">
          <h3>App Name</h3>
          <p>Company name</p>
        </div>
    </div>
    <div className="Container">
        <Player />
    </div>
    </>
  );
};

export default App;