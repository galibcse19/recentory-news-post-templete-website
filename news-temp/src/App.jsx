import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import logo from '../public/logo.png'; // Transparent logo
import ads from '../public/ads.png';
import Card from './Card';
import NewsCard from './NewsCard';

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

      <NewsCard></NewsCard>
      <Card />
    </div>
  );
}

export default App;
