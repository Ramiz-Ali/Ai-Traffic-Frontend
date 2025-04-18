import React, { useRef } from 'react';
import Header from '../components/Header';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Header_Top from '../components/Header_Top.js';
import { useNavigate } from 'react-router-dom';
import { routes } from '../contant/index.js';
import UploadVideos from '../components/Upload_Videos.js';
import Footer from '../components/Footer.js';
import videoFile from "../assets/image/videoplayback.mp4";

const HomePage = () => {
  const navigate = useNavigate();
  const authenticate = localStorage.getItem('token');
  console.log(authenticate);

  // Create a reference to the "Upload Videos" section
  const uploadVideosRef = useRef(null);

  // Function to scroll to the "Upload Videos" section
  const scrollToUploadVideos = () => {
    uploadVideosRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='font-sans leading-normal text-gray-800 bg-gray-100'>
      <Header_Top />
      <Header />
      <div className="relative w-full h-screen">
        {/* Video Background */}
        <video src={videoFile} autoPlay loop muted className="w-full h-screen object-cover" />
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="p-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] text-transparent bg-clip-text drop-shadow-2xl">
              Optimize Traffic Flow with AI-Powered Tools
            </h1>

            <p className="text-lg sm:text-md md:text-2xl font-medium leading-relaxed text-white drop-shadow-lg">
              Revolutionize urban traffic management with our AI-driven system. 
              <br />
              Reduce congestion, minimize waiting times, and enhance road safety with real-time traffic signal adjustments.
            </p>

            <button
              onClick={scrollToUploadVideos} // Scroll to the "Upload Videos" section
              className="mt-6 px-6 py-3 bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] hover:from-[#1a2a6c] hover:to-[#b21f1f] text-white font-semibold text-lg rounded-lg shadow-lg transform hover:scale-110 transition duration-300"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>

      {/* Attach the ref to the "Upload Videos" section */}
      <section ref={uploadVideosRef} className='relative mt-0 text-center mx-auto'>
        <UploadVideos />
      </section>

      {/* Additional Sections for Project Details */}
      <section className='py-12 bg-white'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center text-gray-800 mb-8'>
            Key Features of Our AI Traffic Management System
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-gray-50 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                Real-Time Traffic Monitoring
              </h3>
              <p className='text-gray-600'>
                Our system uses sensors and cameras to collect real-time traffic data, enabling dynamic adjustments to traffic signals.
              </p>
            </div>
            <div className='bg-gray-50 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                Dynamic Signal Control
              </h3>
              <p className='text-gray-600'>
                Traffic signal timings are adjusted in real-time based on traffic density, reducing congestion and improving flow.
              </p>
            </div>
            <div className='bg-gray-50 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                Predictive Analytics
              </h3>
              <p className='text-gray-600'>
                AI algorithms predict traffic patterns and congestion, allowing proactive adjustments to traffic signals.
              </p>
            </div>
            <div className='bg-gray-50 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                Environmental Sustainability
              </h3>
              <p className='text-gray-600'>
                Reduced idling at intersections lowers fuel consumption and emissions, contributing to cleaner air.
              </p>
            </div>
            <div className='bg-gray-50 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                Scalable and Adaptable
              </h3>
              <p className='text-gray-600'>
                The system is designed to scale across multiple intersections and adapt to changing traffic conditions.
              </p>
            </div>
            <div className='bg-gray-50 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                User-Friendly Interface
              </h3>
              <p className='text-gray-600'>
                Traffic operators can monitor and manage traffic flow through an intuitive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className='py-12 bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]'>
        <div className='max-w-6xl mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center text-white mb-8'>
            Benefits of AI Traffic Management
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                Reduced Congestion
              </h3>
              <p className='text-gray-600'>
                Dynamic signal adjustments minimize traffic jams, especially during peak hours.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                Improved Travel Times
              </h3>
              <p className='text-gray-600'>
                Optimized traffic flow reduces waiting times and improves overall travel efficiency.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                Lower Emissions
              </h3>
              <p className='text-gray-600'>
                Reduced idling at intersections lowers fuel consumption and greenhouse gas emissions.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                Enhanced Road Safety
              </h3>
              <p className='text-gray-600'>
                Real-time adjustments reduce the likelihood of accidents caused by congestion.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                Economic Benefits
              </h3>
              <p className='text-gray-600'>
                Smoother traffic flow improves productivity and reduces transportation costs.
              </p>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                Scalable Solution
              </h3>
              <p className='text-gray-600'>
                The system can be expanded to cover more intersections and adapt to future urban growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default HomePage;