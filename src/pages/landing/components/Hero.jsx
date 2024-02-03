import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-slate-900 md:min-h-screen md:pt-12 sm:pt-9 pt-16" id="home">
      <div className="max-w-screen mx-auto flex md:flex-row flex-col justify-around items-center pt-6 px-6 xl:px-10">
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 md:gap-8 py-2 sm:py-10"> */}
          <div className="sm:col-span-1 md:w-1/2 max-w-lg flex flex-col justify-center items-start">
            <h5 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-normal text-white dark:text-gray-300">
              Unity Solutions For All Your Academic Needs.
              <span className="text-lg sm:text-2xl text-sky-500">
                Get Assignments Done and Achieve Academic Excellence.
              </span>
            </h5>
            <p className="text-gray-400 mt-4 mb-6 text-base sm:text-lg">
              We are here to save your time and effort. Get help with any type
              of assignment, from a high school essay to a PhD dissertation. Our
              team of 500+ assignment experts will ensure your assignments are
              completed on time.
            </p>
            <div>
              <Link to="#">
                <button className="m-2 bg-sky-600 py-2 px-4 rounded-lg text-white">
                  Order Now
                </button>
              </Link>
              {/* Add additional button if needed */}
              {/* <button className="m-2 border-2 border-gray-300 text-2xl p-3 font-normal rounded-md">
                <span className="text-gray-300">Another Button</span>
              </button> */}
            </div>
          </div>
          <div className="sm:col-span-1 md:py-10 max-w-lg md:w-1/2">
            <img
              src="./Illustration1.png"
              alt="hero"
              className="mb-10 rounded-lg shadow-lg mx-auto"
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
