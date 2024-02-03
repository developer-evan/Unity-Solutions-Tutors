import  { useState } from 'react';
import { Link } from 'react-router-dom';
function  Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className='fixed top-0 w-full bg-slate-900 md:flex md:justify-between md:items-center md:px-4'>
      <header className='flex justify-between p-3 items-center '>
        <h2 className=' text-white text-lg md:text-2xl'>Unity Solutions</h2>
        {/* <img src='./tutor.png' alt='logo' className='h- w-28' /> */}

        <div className='md:hidden flex flex-row justify-center gap-2 items-center'>
        <button
          className='block md:hidden text-white p-2'
          onClick={toggleMenu}
        >
          <svg
            className='h-6 w-6 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            {menuOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>
        <button className="text-white hover:text-purple-300">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 w-36 rounded-lg hover:bg-blue-600"
          >
            Get Started
          </Link>
        </button>
    </div>
        
      </header>
      <ul
        className={`${
          menuOpen ? 'block' : 'hidden'
        } md:flex md:w-auto text-start text-white  p-4 md:p-0 md:static md:space-x-4`}
      >
     <a href='#home'  >      
      <li className='mx-2  hover:translate-x-2' onClick={closeMenu}>
          Home
        </li>
        </a>
        <a href='#about'  >      
      <li className='mx-2  hover:translate-x-2' onClick={closeMenu}>
          About Us
        </li>
        </a>
        {/* <a href='#samples'  >
        <li className='mx-4  hover:translate-x-2' onClick={closeMenu}>
          Samples
        </li>
        </a> */}
        <a href='#how-we-work'  > 
        <li className='mx-  hover:translate-x-2' onClick={closeMenu}>
          Our Work
        </li>
        </a>
        <a href='#reviews'  > 
        <li className='mx-2  hover:translate-x-2' onClick={closeMenu}>
          Reviews
        </li>
        </a>
        <a href='#services'  > 
        <li className='mx-2  hover:translate-x-2' onClick={closeMenu}>
          Services
        </li>
        </a>
        <a href='#contact-us'  > 
        <li className='mx-2  hover:translate-x-2
        
        ' onClick={closeMenu}>
          Contact Us
        </li>
        </a>
      </ul>     
      <button className="hidden md:block text-white hover:text-purple-300">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 w-36 rounded-lg hover:bg-blue-600"
          >
            Get Started
          </Link>
        </button>
    </div>
  );
}

export default Header;