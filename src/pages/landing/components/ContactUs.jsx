/* eslint-disable react/no-unescaped-entities */
// import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
const ContactUs = () => {
  return (
    <div id="contact-us" className="bg-slate-900 py-16 px-4 text-white">
    <section>
       <h2 className="text-3xl  text-center text-gray-100 mb-6">Contact Us</h2>
      <div className="container mx-auto item-center text-start">
       
        <p className="text-lg text-gray-100 mb-6">
          If you have any questions or need assistance, don't hesitate to get in touch with our team:
        </p>
        <p className="text-xl text-gray-500">
          Email: <a className="text-white hover:underline" href="mailto:info@writerslanding.com">info@unitysolutions.com</a>
        </p>
        <p className="text-xl text-gray-500 mt-4">
          Phone: <a className="text-white hover:underline" href="tel:+11234567890">+1 (123) 456-7890</a>
        </p>
        {/* social media icons fa react icons */}
        <div className="flex flex-row mt-8">
          <a href="#" className="text-white hover:underline text-3xl mr-4">
            <FaFacebook />
          </a>
          <a href="#" className="text-white hover:underline text-3xl mr-4">
            <FaTwitter />
          </a>
          <a href="#" className="text-white hover:underline text-3xl mr-4">
            <FaInstagram />
          </a>
          <a href="#" className="text-white hover:underline text-3xl">
            <FaLinkedin />
          </a>
          </div>
      </div>
    </section>
    </div>
  );
};

export default ContactUs;
