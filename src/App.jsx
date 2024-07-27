import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import "./App.css";

const defaultUrl = "https://zackportfolio.netlify.app";

function App() {
  const [colorLight, setColorLight] = useState("#ffffff");
  const [colorDark, setColorDark] = useState("#000000");
  const [text, setText] = useState(defaultUrl);
  const [size, setSize] = useState(400);
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    generateQRCode();
  }, [colorLight, colorDark, text, size]);

  const generateQRCode = () => {
    const canvas = document.getElementById("qr-code").querySelector("canvas");
    const dataUrl = canvas.toDataURL();
    setDownloadUrl(dataUrl);
  };

  const handleShare = async () => {
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const file = new File([blob], "QRCode.png", { type: blob.type });

      await navigator.share({
        files: [file],
        title: text,
      });
    } catch (error) {
      alert("Your browser doesn't support sharing.");
    }
  };

  return (
    <div className="App">
      <section>
        <div className="row">
          <input
            type="color"
            className="light"
            value={colorLight}
            onChange={(e) => setColorLight(e.target.value)}
          />
          <input
            type="color"
            className="dark"
            value={colorDark}
            onChange={(e) => setColorDark(e.target.value)}
          />
          <select
            className="sizes"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
          >
            {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000].map((val) => (
              <option key={val} value={val}>
                {val}×{val}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          className="qr-text"
          placeholder="Enter QR Text"
          value={text}
          onChange={(e) => setText(e.target.value || defaultUrl)}
        />
        <div id="qr-code">
          <QRCode
            value={text}
            size={size}
            bgColor={colorLight}
            fgColor={colorDark}
          />
        </div>
        <div className="action-container">
          <a href={downloadUrl} className="download btn" download="QRCode">
            <span>Download</span>
            <img src="download.svg" alt="" />
          </a>
          <button className="btn share-btn" onClick={handleShare}>
            <span>Share</span>
            <img src="share.svg" alt="" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
