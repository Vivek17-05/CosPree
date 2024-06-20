import React, { useState, useEffect, useRef } from 'react';

const Player = () => {
  const defaultUrl = 'https://www.loom.com/share/e00c8856f48049519ca6bece165b449a?sid=92f34792-4d9f-4946-96ed-1d20280abc4c';
  const id = defaultUrl.match(/(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/)[1];
  const defUrl = `https://www.loom.com/embed/${id}?autoplay=false`;
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [embedUrl, setEmbedUrl] = useState(defUrl);
  const [showWarning, setShowWarning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [check, setCheck] = useState(false);
  // const [show, setShow] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    setShowWarning(false);
  }, [embedUrl]);

  const handleUrlChange = (event) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
    const loomIdMatch = inputUrl.match(/(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/);
    if (loomIdMatch && loomIdMatch[1]) {
      setEmbedUrl(`https://www.loom.com/embed/${loomIdMatch[1]}?autoplay=false`);
      setSubmitted(true);
      setCheck(true);
      // setShow(false);
    } else {
      setShowWarning(true);
      setEmbedUrl(defUrl);
      if(!setCheck){
      setSubmitted(false);
      }
    }
    if (inputUrl === "") setShowWarning(false);
  };

  const handleWidthChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setWidth(value > 0 ? value : 600);
  };

  const handleHeightChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setHeight(value > 0 ? value : 400);
  };

  useEffect(() => {
    const checkFocus = setInterval(() => {
      if (document.activeElement === iframeRef.current) {
        setIsPaused(false);
      } else {
        setIsPaused(true);
      }
    }, 500);

    return () => clearInterval(checkFocus);
  }, []);

  return (
    <div>
      {!submitted && (
        isPaused && (
        <div style={{ display: "flex", justifyContent:"flex-start" ,width:"620px" }}>
          <label>
            Video URL:
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              // style={{ margin: '0 10px' }}
            />
          </label>
          <label>
            Width:
            <input
              type="number"
              value={width}
              onChange={handleWidthChange}
              // style={{ margin: '0 10px' }}
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              value={height}
              onChange={handleHeightChange}
              // style={{ margin: '0 10px' }}
            />
          </label>
        </div>
      ))}
      {embedUrl && (
        <div>
          <iframe
            ref={iframeRef}
            src={embedUrl}
            width={width}
            height={height}
            frameBorder="0"
            allowFullScreen
            title="Video Player"
          ></iframe>
        </div>
      )}
      {/* {submitted && (
        isPaused && (
          <button type="button" class="btn btn-primary" onClick={()=>setShow(true)}>Edit</button>
        )
      )} */}
      {submitted && (
        isPaused && (
        <div style={{ display: "flex", justifyContent:"space-between" ,width:"620px" }}>
          <label>
            Video URL:
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              // style={{ margin: '0 10px' }}
            />
          </label>
          <label>
            Width:
            <input
              type="number"
              value={width}
              onChange={handleWidthChange}
              // style={{ margin: '0 10px' }}
            />
          </label>
          <label>
            Height:
            <input
              type="number"
              value={height}
              onChange={handleHeightChange}
              // style={{ margin: '0 10px' }}
            />
          </label>
        </div>
      ))}
      {showWarning && (
        <div className="alert alert-danger" role="alert" style={{ margin:"5px", width:"600px" }}>
          Invalid Loom URL. Please check the link and try again.
        </div>
      )}
    </div>
  );
};

export default Player;
