// import { Link } from 'react-router-dom';
import Header from './components/Header';
import HowWeWork from './components/HowWeWork';
import Samples from './components/Samples';
import Reviews from './components/Reviews';
import Services from './components/Services';
import ContactUs from './components/ContactUs';
import Hero from './components/Hero';
// import MainLayout from '../../layout/MainLayout';

const Landing = () => {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen scroll-smooth">
      <Header />
      <Hero />
      <HowWeWork />
      <Samples />
      <Reviews />
      <Services />
      <ContactUs />
      {/* <Header />
      <div className="bg-gradient-to-r from-blue-400 to-indigo-600 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-3xl font-semibold mb-4 text-center">Welcome to Our Website</h1>
          <p className="text-gray-600 text-center mb-8">Discover amazing features of our platform.</p>
          <div className="flex justify-between">
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Get started
            </Link> */}
            {/* <Link to="/login" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
              Sign Up
            </Link> */}
          {/* </div>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default Landing;
