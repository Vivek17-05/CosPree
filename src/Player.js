import React, { useState, useEffect, useRef } from 'react';
import mondaySdk from 'monday-sdk-js';

const Player = () => {
  const monday = mondaySdk();
  monday.setApiVersion("2023-10") ;
  // monday.listen("settings", res=> {
  //   console.log(res.data);
  // }) ;
  // const callback = res => console.log(res) ;
  // monday.listen(['settings'],callback) ;
  const defaultUrl = 'https://www.loom.com/share/e00c8856f48049519ca6bece165b449a?sid=92f34792-4d9f-4946-96ed-1d20280abc4c';
  const id = defaultUrl.match(/(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/)[1];
  const defUrl = `https://www.loom.com/embed/${id}?autoplay=false`;
  const [urlSetting, setUrlSetting] = useState(false);
  const [widthSetting, setWidthSetting] = useState(false);
  const [heightSetting, setHeightSetting] = useState(false);
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [embedUrl, setEmbedUrl] = useState(defUrl);
  const [showWarning, setShowWarning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  const iframeRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setShowWarning(false);
  }, [embedUrl]);

  useEffect(() => {
    monday.listen("settings", res => {
      console.log(res.data) ;
      const settings = res.data ;
      if(settings.url){
        setUrl(settings.url) ;
        setUrlSetting(true) ;
        const inputUrl = settings.url ;
        const loomIdMatch = inputUrl.match(/(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/);
        if (loomIdMatch && loomIdMatch[1]) {
          setEmbedUrl(`https://www.loom.com/embed/${loomIdMatch[1]}?autoplay=false`);
          // setShow(false);
          setShowWarning(false);
        } else {
          setShowWarning(true);
          setEmbedUrl(defUrl);
        }
        if (inputUrl === "") setShowWarning(false);
      }
      if(settings.width){
        const value = parseInt(settings.width, 10);
        setWidthSetting(true) ;
        setWidth(value > 0 ? value : 600);
      }
      if(settings.height){
        const value = parseInt(settings.height, 10);
        setHeightSetting(true) ;
        setHeight(value > 0 ? value : 400);
      }
    }) ;
  }) ;
  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!showWarning && url) {
        setShow(false);
        setSubmitted(true);
      }
    }, 10000); // 10 second
  };

  useEffect(() => {
    resetTimeout();
    const handleActivity = () => {
      resetTimeout();
    };

    // Listen for keypresses and mouse movements to detect activity
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('mousemove', handleActivity);

    return () => {
      // Clean up event listeners on unmount
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [show, submitted, showWarning]);

  const handleUrlChange = (event) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
    setUrlSetting(false) ; 
    const loomIdMatch = inputUrl.match(/(?:loom\.com\/share\/|loom\.com\/embed\/)([a-zA-Z0-9]+)/);
    if (loomIdMatch && loomIdMatch[1]) {
      setEmbedUrl(`https://www.loom.com/embed/${loomIdMatch[1]}?autoplay=false`);
      // setShow(false);
      setShowWarning(false);
    } else {
      setShowWarning(true);
      setEmbedUrl(defUrl);
    }
    if (inputUrl === "") setShowWarning(false);
  };

  const handleWidthChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setWidthSetting(false) ;
    setWidth(value > 0 ? value : 600);
  };

  const handleHeightChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setHeightSetting(false) ;
    setHeight(value > 0 ? value : 400);
  };

  return (
    <div>
      {!submitted && (
        <div style={{ display: "flex", justifyContent: "flex-start", width: "600px", marginTop: "20px" }}>
          <label style={{ color: "#212529" }}>
            Video URL:
            <input
              type="text"
              value={urlSetting ? url :}
              onChange={handleUrlChange}
            />
          </label>
          <label style={{ color: "#212529" }}>
            Width:
            <input
              type="number"
              value={width}
              onChange={handleWidthChange}
              style={{ marginLeft: "10px" }}
            />
          </label>
          <label style={{ color: "#212529" }}>
            Height:
            <input
              type="number"
              value={height}
              onChange={handleHeightChange}
              style={{ marginLeft: "10px" }}
            />
          </label>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => { if (!showWarning && url) { setSubmitted(true); setShow(false); } }}
            style={{ height: "42px", marginTop: "36px", marginLeft: "80px", width: "100px" }}
          >
            Done
          </button>
        </div>
      )}
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
            style={{ marginBottom: "10px" }}
          ></iframe>
        </div>
      )}
      {submitted && !show && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShow(true)}
          style={{ height: "42px", width: "100px" }}
        >
          Edit
        </button>
      )}
      {show && (
        <div style={{ display: "flex", justifyContent: "space-between", width: "620px" }}>
          <label style={{ color: "#212529" }}>
            Video URL:
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              style={{ marginLeft: "10px" }}
            />
          </label>
          <label style={{ color: "#212529" }}>
            Width:
            <input
              type="number"
              value={width}
              onChange={handleWidthChange}
              style={{ marginLeft: "10px" }}
            />
          </label>
          <label style={{ color: "#212529" }}>
            Height:
            <input
              type="number"
              value={height}
              onChange={handleHeightChange}
              style={{ marginLeft: "10px" }}
            />
          </label>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => { if (!showWarning && url) setShow(false); }}
            style={{ height: "42px", marginTop: "36px", marginLeft: "80px", width: "100px" }}
          >
            Done
          </button>
        </div>
      )}
      {showWarning && (
        <div className="alert alert-danger" role="alert" style={{ margin: "5px", width: "600px" }}>
          Invalid Loom URL. Please check the link and try again.
        </div>
      )}
    </div>
  );
};

export default Player;
