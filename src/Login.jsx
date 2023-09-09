/* eslint-disable no-unused-vars */
import  {useState} from 'react';
import {Link} from 'react-router-dom'


function Login() {
    const [showLoginForm, setShowLoginForm] = useState(true);
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.loginEmail,
          password: userData.loginPassword,
        }),
      });

      if (response.ok) {
        setLoggedIn(true);
        setError('');
        // You can also redirect the user to a different page upon successful login.
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Login failed');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: e.target.signupFirstName.value,
          lastName: e.target.signupLastName.value,
          email: e.target.signupEmail.value,
          password: e.target.signupPassword.value,
          username: e.target.signupUsername.value,
        }),
      });

      if (response.ok) {
        // User registration was successful
        // You can also handle success cases here, such as showing a success message
        setError('');
        toggleForm();
      } else {
        const data = await response.json();
        setError(data.message || 'Sign-up failed');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setError('Sign-up failed');
    }
  };

  return (
    <div>
       <header className="bg-blue-700 p-4">
        <div className="container mx-auto">
          <h1 className="text-white text-2xl font-semibold">Adam Admin</h1>
        </div>
      </header>
      <div className="bg-gradient-to-r from-blue-400 to-indigo-600 min-h-screen flex items-center justify-center py-16">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-3xl font-semibold mb-4 text-center">
            {showLoginForm ? 'Login' : 'Sign Up'}
          </h1>
          {loggedIn ? (
            <p className="text-green-600 text-center">Logged in successfully!</p>
          ) : (
            <div>
              <form onSubmit={showLoginForm ? handleLoginSubmit : handleSignUpSubmit}>
                {showLoginForm ? (
            
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loginEmail">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="loginEmail"
                        name="loginEmail"
                        className="w-full border rounded-md py-2 px-3"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loginPassword">
                        Password
                      </label>
                      <input
                        type="password"
                        id="loginPassword"
                        name="loginPassword"
                        className="w-full border rounded-md py-2 px-3"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  // Sign-up form fields
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signupFirstName">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="signupFirstName"
                        name="signupFirstName"
                        className="w-full border rounded-md py-2 px-3"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signupLastName">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="signupLastName"
                        name="signupLastName"
                        className="w-full border rounded-md py-2 px-3"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signupEmail">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="signupEmail"
                        name="signupEmail"
                        className="w-full border rounded-md py-2 px-3"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signupUsername">
                        Username
                      </label>
                      <input
                        type="text"
                        id="signupUsername"
                        name="signupUsername"
                        className="w-full border rounded-md py-2 px-3"
                        placeholder="Enter your username"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signupPassword">
                        Password
                      </label>
                      <input
                        type="password"
                        id="signupPassword"
                        name="signupPassword"
                        className="w-full border rounded-md py-2 px-3"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                )}
                <Link to="/dashboard"
                  type="submit"
                  className={`bg-${showLoginForm ? 'blue' : 'indigo'}-500 text-white px-4 py-2 rounded-lg hover:bg-${showLoginForm ? 'blue' : 'indigo'}-600`}
                >
                  {showLoginForm ? 'Login' : 'Sign Up'}
                </Link>
              </form>
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
          )}
          <p className="text-gray-600 text-center mt-4">
            {showLoginForm
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button
              type="button"
              className="text-blue-500 hover:underline focus:outline-none"
              onClick={toggleForm}
            >
              {showLoginForm ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;
