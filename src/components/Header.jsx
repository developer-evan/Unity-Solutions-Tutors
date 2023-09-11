import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="bg-blue-700 p-4 justify-around flex items-center">
      <div className="container mx-auto">
        <h1 className="text-white text-2xl font-semibold">Adam Admin</h1>
      </div>
      <div className="flex justify-evenly space-x-10">
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 w-36 rounded-lg hover:bg-blue-600">
              Login
            </Link>
            <Link to="/login" className="bg-indigo-500 text-white px-4 py-2 w-36 rounded-lg hover:bg-indigo-600">
              Sign Up
            </Link>
          </div>
    </header>
  );
};

export default Header;
