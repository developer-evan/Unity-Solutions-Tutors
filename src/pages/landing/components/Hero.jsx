// import Link from 'next/link';
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-blue-800 md:h-screen" 
    id="home"
    >
      <div className="max-w-screen-xl mx-auto pt-6 px-6 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 gap-8 py-2 sm:py-14">
          <div className="row-start-2 sm:row-start-1 flex flex-col justify-center items-start">
            <h5 className="text-2xl  flex flex-col font-medium text-white dark:text leading-normal">
              Unity Solutions For All Your Academic Needs.
              <span className=""> Get Assignment Done And Achieve All Academic Goals.</span>
            </h5>
            <p className="text-slate-200 mt-4 mb-6">
              We Are Here To
              Save Your Time And Effort. Get Help With Any Type Of Assignment
              From A High School Essay To A PhD Dissertation. We Can Do Any Type
              Of Assignment For You Quickly.
             We Have 500+ Assignment Experts Who
              Will Help You To Do Your Assignment On Time. 
            </p>
            <div>
              <Link href="#">
                <button className="m-2 border-2 border-white text-2xl py-2 px-4 font-medium rounded-full">
                  <span className="text-vesselwhite">About Us</span>
                </button>
              </Link>
              {/* <button className="m-2 border-2 border-vesselwhite text-2xl p-3 font-normal rounded-md">
                <span className="text-vesselwhite"></span>
              </button> */}
            </div>
          </div>
          {/* <div className="w-full lg:w-1/2 flex justify-end items-end"> */}
          <img
            src="https://www.vesselsystems.co.ke/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FIllustration1.07cd1fa9.png&w=1920&q=100"
            alt="hero"
            className="mb-10"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Hero;
