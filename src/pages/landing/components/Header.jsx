import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gradient-to-r fixed top-0 left-0 right-0 z-50 from-purple-800 to-blue-600 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white">Unity Solutions</h1>

        {/* Responsive Menu Button */}
        <div className="lg:hidden">
          <button
            className="text-white hover:text-purple-300"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className={`lg:flex ${menuOpen ? "block" : "hidden"}`}>
          <ul className="flex space-x-6 lg:flex">
            <li className="text-white hover:text-purple-300">
              <a href="#how-we-work">How we work</a>
            </li>
            <li className="text-white hover:text-purple-300">
              <a href="#samples">Samples</a>
            </li>
            <li className="text-white hover:text-purple-300">
              <a href="#reviews">Reviews</a>
            </li>
            <li className="text-white hover:text-purple-300">
              <a href="#services">Services</a>
            </li>
            <li className="text-white hover:text-purple-300">
              <a href="#contact-us">Contact us</a>
            </li>
          </ul>
        </nav>

        <button className="text-white hover:text-purple-300">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 w-36 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
