import React, { useEffect, useState } from 'react';
import { IoCopy } from 'react-icons/io5';
import { FaChessBoard } from 'react-icons/fa6';

const Advice = () => {
  const [advice, setAdvice] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  const fetchAdvice = async () => {
    try {
      const data = await fetch('https://api.adviceslip.com/advice');
      if (!data.ok) {
        throw new Error('Failed to fetch advice');
      }
      const adviceData = await data.json();
      setAdvice(adviceData.slip);
    }
     catch (error) {
      console.error('Error fetching advice:', error);
      // Handle error, show a message to the user, etc.
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(advice.advice);
    setShowNotification(true);

    // Hide the notification after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const getRandomAdvice = () => {
    fetchAdvice();
  };

  useEffect(() => {
    // Fetch random advice initially
    fetchAdvice();

    // Set a timeout to fetch random advice every, for example, 10 seconds
    const intervalId = setInterval(() => {
      fetchAdvice();
    }, 20000); // 10 seconds

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-DarkGrayish rounded-lg">
      <div className="flex justify-start flex-col shadow-2xl md:p-10 p-4 md:w-[475px] w-[275px]">
        <p className="text-center text-NeonGreen font-light mb-3 text-sm">Advice #{advice.id}</p>

        <h1 className="text-[#fff] text-center italic my-3 md:text-[24px] text-[14px]">{`"${advice.advice}"`} </h1>

        <div className="h-[1px] w-full text-[#fff] bg-LightCyan my-8 flex items-center justify-center">
          <IoCopy
            onClick={copyToClipboard}
            className="bg-DarkGrayish my-4 p-2 h-[40px] w-[40px] rounded-full cursor-pointer"
            size={20}
          />
        </div>

        <FaChessBoard
          onClick={getRandomAdvice}
          className="bg-NeonGreen  p-2 h-[40px] w-[40px] rounded-full absolute -bottom-2 left-[50%] transform -translate-x-[50%] cursor-pointer"
          size={26}
        />

        {showNotification && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-NeonGreen text-white py-2 px-4 rounded-md">
            Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
};

export default Advice;
