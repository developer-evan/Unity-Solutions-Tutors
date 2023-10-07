/* eslint-disable react/no-unescaped-entities */
// import React from 'react';

const ContactUs = () => {
  return (
    <section id="contact-us" className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-6">
          If you have any questions or need assistance, don't hesitate to get in touch with our team:
        </p>
        <p className="text-xl text-gray-500">
          Email: <a className="text-blue-600 hover:underline" href="mailto:info@writerslanding.com">info@writerslanding.com</a>
        </p>
        <p className="text-xl text-gray-500 mt-4">
          Phone: <a className="text-blue-600 hover:underline" href="tel:+11234567890">+1 (123) 456-7890</a>
        </p>
      </div>
    </section>
  );
};

export default ContactUs;
