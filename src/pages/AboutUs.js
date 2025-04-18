import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Footur from "../components/footur";
import Header from "../components/Header";
import coverImage from "../assets/image/cover.png";

const Counter = ({ target, title }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 4000; // 4000 milliseconds
    const increment = target / (duration / 16);

    let start = 0;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <motion.div
      className="bg-green-50 shadow-md rounded-lg p-4 hover:scale-105 transition-transform"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-green-600">
        {count.toLocaleString()}+
      </h2>
      <p className="text-gray-600 text-sm sm:text-base">{title}</p>
    </motion.div>
  );
};

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Cover Section */}
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image */}
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] object-cover"
        />

        {/* Overlay Description */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4 sm:px-8 w-full max-w-4xl">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-sans leading-relaxed">
            The Roshan Mustaqbil Hunarmand Program is vital for Pakistan as it bridges the digital skills gap, empowers youth with employable IT skills, and fosters entrepreneurship. By creating a tech-savvy workforce, it boosts economic growth, reduces unemployment, and strengthens Pakistan's global IT presence. The program also aligns with Vision 2025, promotes women’s empowerment, and helps retain talent within the country, ensuring a brighter and more prosperous future for Pakistan.
          </p>
        </div>
      </motion.div>

      {/* "Why choose LeadGenPro!" Section */}
      <motion.div
        className="text-center font-sans mt-12 mb-8 px-4 sm:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800">
          Why Roshan Mustaqbil Hunarmand Program!
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Points List */}
          <div className="px-4 sm:px-6 lg:px-12">
            {[
              "Affordable IT Training",
              "Practical, Industry-Relevant Curriculum",
              "Focus on Entrepreneurship",
              "Inclusive and Equal Opportunities",
              "Contribution to National Development",
              "Personal and Professional Growth",
              "Global Opportunities",
              "Commitment to Innovation",
              "Students for International Certifications",
            ].map((point, idx) => (
              <motion.div
                key={idx}
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center bg-green-600 text-white w-8 h-8 mr-3 rounded-full">
                  <i className="fas fa-check text-sm"></i>
                </div>
                <p className="text-gray-700 mt-3 text-sm sm:text-base">{point}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Vision and Mission Section */}
      <motion.div
        className="text-center font-sans mt-12 mb-20 px-4 sm:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-800 mb-4">
          Vision and Mission
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Our mission is to empower individuals in Pakistan with affordable, high-quality IT
          training that bridges the digital skills gap, fosters innovation, and drives socio-economic
          growth. Our vision is to become Pakistan’s leading platform for inclusive and transformative
          IT education, nurturing a skilled workforce that propels the country into a globally competitive,
          tech-driven economy.
        </p>
      </motion.div>

      {/* Counters Section */}
      <motion.div
        className="grid grid-cols-2 mb-10 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 text-center px-4 sm:px-8 lg:px-24 mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[
          { title: "Seats Available", value: 118276 },
          { title: "Enrolled Students", value: 17000 },
          { title: "Available Courses", value: 20 },
          { title: "No. of Alumni", value: 9000 },
          { title: "Industrial Trainers", value: 26 },
        ].map((counter, index) => (
          <Counter key={index} target={counter.value} title={counter.title} />
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-auto">
        <Footur />
      </div>
    </div>
  );
};

export default AboutUs;