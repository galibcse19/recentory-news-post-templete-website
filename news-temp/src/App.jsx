import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import logo from '../public/logo.png'; // Transparent logo
import ads from '../public/ads.png';
import Card from './Card';

function App() {
  const templateRef = useRef(null);
  const [userImage, setUserImage] = useState(null);
  const [userText, setUserText] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [showDateDetails, setShowDateDetails] = useState(true); // State for checkbox

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString('bn-BD', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setDateTime(formattedDate);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter(URL.createObjectURL(file));
    }
  };

  const downloadTemplate = () => {
    if (templateRef.current) {
      html2canvas(templateRef.current, {
        scale: 3, // High resolution
        useCORS: true
      }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'template.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-3xl text-orange-600 font-bold mb-4">Recentory News Post Template Generator</h1>

      <div className="mb-4">
        <div>
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setUserImage)} />
        </div>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Enter News Title"
            className="border-2 border-orange-600 p-4"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
          />
        </div>
      </div>

      {/* Checkbox to show/hide Bengali Date and Details */}
      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showDateDetails}
            onChange={(e) => setShowDateDetails(e.target.checked)}
            className="form-checkbox"
          />
          <span className="text-xl">Show Bengali Date and Details</span>
        </label>
      </div>

      <div
        ref={templateRef}
        className="mx-auto relative bg-gradient-to-br from-yellow-500 to-orange-700 shadow-xl"
        style={{
          width: '1080px',
          height: '1080px',
          position: 'relative',
          border: '2px solid #333',
          overflow: 'hidden',
        }}
      >
        {/* Top - Logo */}
        <div className="absolute top-4 right-4 z-10">
          <img
            src={logo}
            alt="Logo"
            className="h-40 w-40 object-contain"
          />
        </div>

        {/* First Section: User Uploaded Image (Full Width) */}
        {userImage && (
          <div className="w-[98%] h-[50%] mx-auto mt-2">
            <img
              src={userImage}
              alt="User Uploaded"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        )}

        {/* Second Section: User Text */}
        <div className={`px-6 py-6 w-full h-[50%] flex ${!userImage ? 'items-center justify-center' : ''}`}>
          {userText && (
            <p className="text-[50px] leading-relaxed text-center font-serif font-black text-white drop-shadow-xl">
              {userText}
            </p>
          )}
        </div>

        {/* Bengali Date and Details - Conditional Render */}
        {showDateDetails && (
          <div className="px-6 py-4 pb-10 bg-white rounded-lg shadow-2xl flex flex-col items-center justify-center absolute bottom-32 w-[80%] left-[10%]">
            <div className="flex justify-between w-full">
              <div className="text-3xl font-extrabold text-black">{dateTime}</div>
              <div className="text-3xl font-extrabold text-black">বিস্তারিত কমেন্টে</div>
            </div>
          </div>
        )}

        {/* Bottom - Ad Image and Branding */}
        <div className="absolute bottom-0 w-full bg-black flex items-center justify-between">
          <img src={ads} alt="Ad" className="h-24 w-[60%] rounded object-cover" />
          <p className="text-2xl font-bold pb-6 tracking-widest mx-auto text-orange-600">RECENTORY</p>
        </div>
      </div>

      <button
        onClick={downloadTemplate}
        className="mt-6 bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
      >
        Download Template
      </button>

      <Card />
    </div>
  );
}

export default App;
