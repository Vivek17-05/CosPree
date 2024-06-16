import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const Player = () => {
  const defaultUrl = 'https://www.loom.com/share/2a742981490b4c649ce429d75f70fd73?sid=b306873a-8b0f-4b4b-a859-51d6d73c4492'; // Default video URL (Rick Astley's Never Gonna Give You Up)
  const id = defaultUrl.match(/(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/)[1];
  const defUrl = `https://www.loom.com/embed/${id}?autoplay=1`;
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(600); 
  const [height, setHeight] = useState(400);
  const [embedUrl, setEmbedUrl] = useState(defUrl);
  const [autoplay, setAutoplay] = useState(true); 

  useEffect(() => {
    setAutoplay(true);
  }, [embedUrl]);

  const handleUrlChange = (event) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
    const loomIdMatch = inputUrl.match(/(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/);
    if (loomIdMatch && loomIdMatch[1]) {
      setEmbedUrl(`https://www.loom.com/embed/${loomIdMatch[1]}?autoplay=1`);
    } else {
      setEmbedUrl(defUrl);
    }
  }
  const handleWidthChange = (event) => {
    if(event.target.value>0)
        setWidth(event.target.value);
    else
        setWidth(600);
  };

  const handleHeightChange = (event) => {
    if(event.target.value>0)
        setHeight(event.target.value);
    else
        setHeight(400);
  };
  const isValidUrl = (url && url.trim() !== '');
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
      <div>
        <label>
          Width:
          <input
            type="number"
            value={width}
            defaultValue={600}
            onChange={handleWidthChange}
            style={{ margin: '0 10px' }}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            defaultValue={400}
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