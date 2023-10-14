import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

function Login() {
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://adamsite-c8e88a6bb1a1.herokuapp.com/api/login', {
        email: userData.loginEmail,
        password: userData.loginPassword,
      });

      if (response.status === 200) {
        setLoggedIn(true);
        setError('');

        // Redirect to a different page upon successful login
        navigate('/dashboard'); // Change '/dashboard' to your desired route
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <div>
      <div className="bg-blue-700 p-4">
        <div className="container mx-auto">
          {/* <h1 className="text-white text-2xl font-semibold">Adam Admin</h1> */}
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-400 to-indigo-600 min-h-screen flex items-center justify-center py-16">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-3xl font-semibold mb-4 text-center">Login</h1>
          {loggedIn ? (
            <p className="text-green-600 text-center">Logged in successfully!</p>
          ) : (
            <div>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="loginEmail"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
                    name="loginEmail"
                    className="w-full border rounded-md py-2 px-3"
                    placeholder="Enter your email"
                    required
                    onChange={(e) =>
                      setUserData({ ...userData, loginEmail: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="loginPassword"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="loginPassword"
                    name="loginPassword"
                    className="w-full border rounded-md py-2 px-3"
                    placeholder="Enter your password"
                    required
                    onChange={(e) =>
                      setUserData({ ...userData, loginPassword: e.target.value })
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Login
                </button>
              </form>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
          )}
          <p className="text-gray-600 text-center mt-4">
            Dont have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
