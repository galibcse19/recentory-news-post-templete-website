import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { FaGem, FaCrown, FaMedal, FaStar } from 'react-icons/fa';

const Card = () => {
    const cardRef = useRef(null);

    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('Diamond');
    const [listedDate, setListedDate] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const getCardStyle = (category) => {
        switch (category) {
            case 'Diamond':
                return 'bg-gradient-to-r from-purple-700 to-blue-600 text-white';
            case 'Gold':
                return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
            case 'Silver':
                return 'bg-gradient-to-r from-gray-300 to-gray-500 text-gray-800';
            case 'Bronze':
                return 'bg-gradient-to-r from-orange-400 to-yellow-700 text-white';
            default:
                return 'bg-white text-gray-800 border';
        }
    };

    const getIcon = (category) => {
        switch (category) {
            case 'Diamond':
                return <FaGem className="text-4xl mb-2" />;
            case 'Gold':
                return <FaCrown className="text-4xl mb-2" />;
            case 'Silver':
                return <FaMedal className="text-4xl mb-2" />;
            case 'Bronze':
                return <FaStar className="text-4xl mb-2" />;
            default:
                return null;
        }
    };

    const downloadCard = () => {
        if (cardRef.current) {
            html2canvas(cardRef.current, {
                useCORS: true,
                scale: 3 // High-resolution fix
            }).then((canvas) => {
                const link = document.createElement('a');
                link.download = `${name || 'fan'}_card.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold mb-4 text-orange-600">Recentory Fan Card Generator</h2>

            {/* Inputs */}
            <div className="mb-6 space-y-4 max-w-md">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <input
                    type="text"
                    placeholder="Enter Name"
                    className="border border-gray-400 px-4 py-2 w-full rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Location"
                    className="border border-gray-400 px-4 py-2 w-full rounded"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Listed Date (e.g., April 2025)"
                    className="border border-gray-400 px-4 py-2 w-full rounded"
                    value={listedDate}
                    onChange={(e) => setListedDate(e.target.value)}
                />
                <select
                    className="border border-gray-400 px-4 py-2 w-full rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="Diamond">Diamond</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Bronze">Bronze</option>
                </select>
            </div>

            {/* Card Preview */}
            <div
                ref={cardRef}
                className={`p-6 w-[400px] mx-auto shadow-2xl ${getCardStyle(category)} relative`}
                style={{ boxSizing: 'border-box' }}
            >
                {/* Top Tag */}
                <div className="absolute top-0 left-0 w-full pb-6 bg-black bg-opacity-30 text-center py-2 text-sm font-bold">
                    {category.toUpperCase()} | Listed Fan on <span className="">RECENTORY</span>
                </div>

                <div className="flex flex-col items-center text-center mt-10">
                    {getIcon(category)}
                    {image && (
                        <div className="h-40 w-40 mb-4 rounded-full overflow-hidden border-4 border-white shadow-xl">
                            <img
                                src={image}
                                alt="User"
                                className="h-full w-full object-cover"
                                crossOrigin="anonymous"
                            />
                        </div>
                    )}
                    <h3 className="text-2xl font-bold mb-1">{name || 'Name'}</h3>
                    <p className="text-md mb-1">Location: {location || 'N/A'}</p>
                    <p className="text-md font-semibold">Level: {category}</p>
                    <p className="text-sm mt-1 italic">Listed: {listedDate || '---'}</p>
                </div>
            </div>

            {/* Download Button */}
            <div className="text-center">
                <button
                    onClick={downloadCard}
                    className="mt-6 bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
                >
                    Download Card
                </button>
            </div>
        </div>
    );
};

export default Card;
