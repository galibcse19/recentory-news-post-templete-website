import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import logo from '../public/logo.png';
import ads from '../public/ads.png';

function App() {
  const templateRef = useRef(null);
  const [userImage, setUserImage] = useState(null);
  const [userText, setUserText] = useState('');
  const [dateTime, setDateTime] = useState('');

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
      html2canvas(templateRef.current).then((canvas) => {
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
        <div className='mt-2'>
        <input
            type="text"
            placeholder="Enter News Title"
            className="border-2 border-orange-600 p-4"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
          />
        </div>
      </div>

      <div
        ref={templateRef}
        className="mx-auto relative bg-gradient-to-br from-gray-200 via-white to-gray-100 shadow-xl"
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
          <img src={logo} alt="Logo" className="h-32 w-32 rounded-full object-contain border-2 border-white shadow" />
        </div>

        {/* Center - Middle Image */}
        <div className="flex flex-col justify-center -mt-24 items-center h-full text-center">
          {userImage && (
            <img
              src={userImage}
              alt="Uploaded"
              className="h-[60%] w-full object-cover"
            />
          )}
          {userText && (
            <p className="text-5xl mt-6 px-16 text-center leading-snug font-extrabold tracking-wide text-black font-serif">
              {userText}
            </p>
          )}
        </div>

        {/* Bengali Date and Details */}
        <div className="px-4 py-2 pb-6 bg-white rounded shadow flex justify-between border border-gray-300 absolute bottom-32 w-[80%] left-[10%] space-x-4">
          <div className="text-xl font-bold text-gray-800">{dateTime}</div>
          <div className="text-xl font-bold text-gray-800">বিস্তারিত কমেন্টে</div>
        </div>

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
    </div>
  );
}

export default App;
