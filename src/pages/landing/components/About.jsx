import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-gray-100 px-6  pt-20 min-h-screen" id="about">
       <h1 className="text-xl font-bold text-gray-800 text-center">
        About Us
      </h1>
    <section className="container mx-auto   gap-3 flex flex-col md:flex-row justify-around bg-gray-100 rounded-lg" >
      {/* <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"> */}
     
        <div className="flex flex-col justify-center max-w-lg items-start">
          <h1 className="text-lg  text-gray-900 mb-4">
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
        <div className="items-center max-w-lg ">
          <img src="./Illustration2.png" alt="Illustration representing Academic Solutions Hub" className="mb-10 w-96 h-96" />
        </div>
      {/* </article> */}
    </section>
    </div>
  );
}
export default About;
