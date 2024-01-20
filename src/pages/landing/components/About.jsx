import { Link } from "react-router-dom";

function About() {
  return (
    <div className="container mx-auto my-10 p-8 bg-gray-100 rounded-lg" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Academic Solutions Hub
          </h1>
          <p className="text-gray-600 mb-6">
            At Academic Solutions Hub, we are dedicated to providing top-notch academic assistance. From essays to dissertations, our team of over 500 experts is committed to helping you excel in your academic journey. We understand the importance of your time and academic goals, and we are here to support you every step of the way.
          </p>
          <Link to="/about">
            <button className="bg-blue-500 text-white text-lg py-2 px-4 font-medium rounded-full hover:bg-blue-600">
              Learn More About Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
