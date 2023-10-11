import { FaAccusoft, FaAcquisitionsIncorporated, FaAddressBook, FaAdjust, FaBookmark,  } from "react-icons/fa";



const HowWeWork = () => {
  return (
    <section id="how-we-work" className="bg-gradient-to-r from-blue-400 to-purple-600 py-16 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">
          Our Efficient Writing Process
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="p-6 rounded-full bg-white text-blue-400 text-4xl">
              <FaBookmark />
            </div>
            <p className="text-lg mt-4">
              Understand your writing needs
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-6 rounded-full bg-white text-blue-400 text-4xl">
              <FaAcquisitionsIncorporated />
            </div>
            <p className="text-lg mt-4">
              Conduct thorough research and brainstorming
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-6 rounded-full bg-white text-blue-400 text-4xl">
              <FaAdjust />
            </div>
            <p className="text-lg mt-4">Write and edit your content</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="flex flex-col items-center">
            <div className="p-6 rounded-full bg-white text-blue-400 text-4xl">
              <FaAccusoft />
            </div>
            <p className="text-lg mt-4">
              Gather client feedback and make revisions
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-6 rounded-full bg-white text-blue-400 text-4xl">
              <FaAddressBook />
            </div>
            <p className="text-lg mt-4">Deliver high-quality content</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
