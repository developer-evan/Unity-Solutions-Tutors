/* eslint-disable react/no-unescaped-entities */
// import React from 'react';

const Reviews = () => {
  return (
    <section id="reviews" className="bg-gradient-to-r from-purple-100 to-blue-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">What Our Clients Say</h2>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <blockquote className="text-lg text-gray-800 mb-6">
            "Working with Your Writer's Landing has been an incredible experience. Their writing team is
            highly skilled, and they consistently deliver top-notch content."
          </blockquote>
          <p className="text-gray-600 text-lg">- John Doe, CEO of Example Company</p>
        </div>
        {/* Add more reviews here */}
      </div>
    </section>
  );
};

export default Reviews;
