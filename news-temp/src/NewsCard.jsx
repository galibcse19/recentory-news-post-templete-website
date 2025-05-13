import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import logo from '../public/logo.jpg'; // Adjust if needed

const NewsCard = () => {
    const [userImage, setUserImage] = useState(null);
    const [headline, setHeadline] = useState('');
    const [isRecentNews, setIsRecentNews] = useState(true); // ✅ New state
    const newsCardRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUserImage(imageUrl);
        }
    };

    const handleHeadlineChange = (e) => {
        setHeadline(e.target.value);
    };

    const handleNewsTypeToggle = () => {
        setIsRecentNews(prev => !prev); // ✅ Toggle logic
    };

    useEffect(() => {
        return () => {
            if (userImage) URL.revokeObjectURL(userImage);
        };
    }, [userImage]);

    const today = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    const handleDownload = () => {
        if (newsCardRef.current) {
            html2canvas(newsCardRef.current, {
                useCORS: true,
                logging: false,
                backgroundColor: null,
                letterRendering: true,
                scale: 2,
            }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL();
                link.download = 'news-card.png';
                link.click();
            });
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 py-10 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
            <input
                type="text"
                value={headline}
                onChange={handleHeadlineChange}
                placeholder="Enter your news headline here..."
                className="w-2/3 sm:w-1/2 px-4 py-2 rounded-lg shadow-sm border-4 border-[#F77F00] focus:outline-none focus:ring-2 focus:ring-[#dc4a01] mb-4"
            />

            {/* ✅ Checkbox to toggle between Breaking and Recent News */}
            <label className="flex items-center gap-3 mb-4">
                <input
                    type="checkbox"
                    checked={isRecentNews}
                    onChange={handleNewsTypeToggle}
                    className="w-5 h-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <span className="text-lg font-medium text-gray-700">
                    Show as <span className="font-bold">{isRecentNews ? "Recent News" : "Breaking News"}</span>
                </span>
            </label>

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer bg-white border-4 border-[#F77F00]"
            />

            <div
                ref={newsCardRef}
                className="w-[1080px] shadow-xl overflow-hidden bg-white"
            >
                <div className="relative w-full pt-[56.25%] bg-gray-300 overflow-hidden">
                    <img
                        src={userImage || '/bg.jpg'}
                        alt="Background"
                        className="absolute top-0 left-0 w-full h-full object-cover scale-110"
                    />
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-6">
                        <div className="h-1 bg-[#dc4a01] w-20 sm:w-32" />
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-36 h-36 rounded-full border-6 border-white shadow-lg transform hover:scale-105 transition"
                        />
                        <div className="h-1 bg-[#dc4a01] w-20 sm:w-32" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                </div>

                <div className="px-12 pb-8 bg-[#dc4a01] text-white flex flex-col sm:flex-row justify-between items-center">
                    {/* ✅ Dynamic text here */}
                    <h2 className="text-4xl font-semibold uppercase tracking-widest">
                        {isRecentNews ? "Recent News" : "Breaking News"}
                    </h2>
                    <span className="text-3xl font-medium uppercase mt-5 sm:mt-0">{today}</span>
                </div>

                <div className="px-2 pb-16 pt-2 bg-[#003049]">
                    <p
                        className="text-5xl text-center text-white font-bold leading-normal"
                        style={{ fontFamily: 'DhonooMJ' }}
                    >
                        {headline || 'Please enter a headline.'}
                    </p>
                </div>
            </div>

            <button
                onClick={handleDownload}
                className="mt-8 px-6 py-3 text-white bg-[#F77F00] rounded-lg shadow-md hover:bg-[#dc4a01] focus:outline-none focus:ring-2 focus:ring-[#dc4a01]"
            >
                Download News Card
            </button>
        </div>
    );
};

export default NewsCard;
