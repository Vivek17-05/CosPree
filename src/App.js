import React, { useState } from 'react';
import Player from './Player';
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
    <div className="Container">
        <h1>Loom Player</h1>
        <Player />
    </div>
  );
};

export default App;