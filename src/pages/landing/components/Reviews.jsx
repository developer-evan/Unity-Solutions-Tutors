/* eslint-disable react/no-unescaped-entities */
// import React from 'react';

const Reviews = () => {
  return (
    <section id="reviews" className="bg-gradient-to-r from-purple-100 to-blue-100 py-16">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">What Our Clients Say</h2>
      <div className="container mx-auto text-center gap-6 flex flex-row">
        
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <blockquote className="text-lg text-gray-800 mb-6">
            "Working with  Unity Solutions has been an incredible experience. Their writing team is
            highly skilled, and they consistently deliver top-notch content."
          </blockquote>
          <p className="text-gray-600 text-lg">- John Njau, Sofwtare</p>
        </div>
        {/* Add more reviews here */}
         <div className="bg-white rounded-lg p-6 py-8 shadow-lg mt-3">
          <blockquote className="text-lg text-gray-800 mb-6">
            "Working with  Unity Solutions has been an incredible experience. Their writing team is
            highly skilled, and they consistently deliver top-notch content."
          </blockquote>
          <p className="text-gray-600 text-lg">- Ben Dennis,  Data Analyst</p>  
          </div>
      </div>
    </section>
  );
};

export default Reviews;
