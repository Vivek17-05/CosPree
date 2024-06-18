import React, { useState, useEffect } from 'react';

const Player = () => {
  const defaultUrl = 'https://www.loom.com/share/2a742981490b4c649ce429d75f70fd73?sid=b306873a-8b0f-4b4b-a859-51d6d73c4492';
  const id = defaultUrl.match(/(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/)[1];
  const defUrl = `https://www.loom.com/embed/${id}?autoplay=1`;
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [embedUrl, setEmbedUrl] = useState(defUrl);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setShowWarning(false);
  }, [embedUrl]);

  const handleUrlChange = (event) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
    const loomIdMatch = inputUrl.match(/(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/);
    if (loomIdMatch && loomIdMatch[1]) {
      setEmbedUrl(`https://www.loom.com/embed/${loomIdMatch[1]}?autoplay=1`);
    } else {
      setShowWarning(true);
      setEmbedUrl(defUrl);
    }
    if(inputUrl=="")
      setShowWarning(false);
  };

  const handleWidthChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setWidth(value > 0 ? value : 600);
  };

  const handleHeightChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setHeight(value > 0 ? value : 400);
  };

  return (
    <div>
      <div>
        <label>
          Video URL:
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            style={{ margin: '0 10px' }}
          />
        </label>
      </div>
      {showWarning && (
        <div className="alert alert-warning" role="alert" style={{ margin: '10px 0' }}>
          Invalid Loom URL. Please check the link and try again.
        </div>
      )}
      <div>
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={handleWidthChange}
            style={{ margin: '0 10px' }}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={handleHeightChange}
            style={{ margin: '0 10px' }}
          />
        </label>
      </div>
      {embedUrl && (
        <div>
          <iframe
            src={embedUrl}
            width={width}
            height={height}
            frameBorder="0"
            allowFullScreen
            title="Video Player"
            style={{ marginTop: '20px' }}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Player;
