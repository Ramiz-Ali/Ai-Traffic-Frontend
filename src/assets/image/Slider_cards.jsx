import React, { useState, useEffect } from "react";
import Img1 from '../../assets/Img1.jpeg';
import Img2 from '../../assets/IMg2.jpeg';
import Img3 from '../../assets/Img3.jpeg';
import Img4 from '../../assets/Img4.jpeg';
import Img5 from '../../assets/Img5.jpeg';

const Slider_cards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    {
      title: "I pay tribute to Professional Freelancer Training Program",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat delectus ipsam facere ullam, sunt illo autem inventore harum similique hic obcaecati amet ipsum. Dolores eligendi aspernatur porro adipisci pariatur dolorum?",
      img: Img1,
    },
    {
      title: "The Benefits of Professional Freelancer Training",
      content: "Freelancers gain crucial skills, from time management to effective communication, through professional training programs. These skills make them highly competitive in the IT industry.",
      img: Img2,
    },
    {
      title: "Professional Freelancer Training Program Review",
      content: "The program provides in-depth knowledge and practical tools for freelancers to thrive in the competitive marketplace, focusing on real-world applications and business strategies.",
      img: Img3,
    },
    {
      title: "Highly Recommend This Program",
      content: "I highly recommend this program to anyone looking to elevate their freelancing career. The tools and knowledge gained will set you apart from the competition.",
      img: Img4,
    },
    {
      title: "An Excellent Training for Freelancers",
      content: "This training program equips freelancers with the skills needed to succeed in the modern digital economy. From technical expertise to personal branding, it's all covered.",
      img: Img5,
    },
  ];

  // Auto slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000); // Change slide every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[600px] bg-gradient-to-b from-blue-500 to-white">
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-5xl font-extrabold text-white mb-8 drop-shadow-2xl tracking-wide">
          Let&#39;s See What the IT Industry Thinks About Us
        </h1>
        <p className="text-lg text-white mb-12 font-semibold tracking-wider">
          The Remarks
        </p>
        <div className="relative w-[350px] md:w-[450px] lg:w-[500px]">
          <div
            className="relative w-full h-full transform-gpu perspective-1000"
          >
            <div
              className="card-container w-full h-full absolute transform transition-transform duration-500 ease-in-out hover:rotate-y-180"
              style={{
                transformStyle: "preserve-3d", // Enable 3D space for the card
                transform: "rotateX(0deg) rotateY(0deg)", // Initial position of card
              }}
            >
              <div
                className="card front bg-white rounded-lg shadow-2xl p-6"
                style={{
                  backfaceVisibility: "hidden", // Hide the back when rotating
                  transform: "rotateY(0deg)",
                }}
              >
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                  {cards[currentIndex].title}
                </h1>
                <p className="text-gray-600 mb-4 font-medium">
                  {cards[currentIndex].content}
                </p>
                <img
                  src={cards[currentIndex].img}
                  alt="Profile"
                  className="w-28 h-28 rounded-full mx-auto border-4 border-indigo-500 shadow-lg transition-all duration-300"
                />
              </div>
              {/* Back of the card */}
              <div
                className="card back bg-gradient-to-r from-indigo-200 via-pink-300 to-purple-300 rounded-lg shadow-2xl p-6 flex items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <h1 className="text-xl text-white">Thank You for Visiting!</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider_cards;
