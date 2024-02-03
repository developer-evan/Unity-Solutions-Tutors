/* eslint-disable react/no-unescaped-entities */
// import React from 'react';

const Reviews = () => {
  // Dummy data for reviews
  const reviewsData = [
    {
      quote: "Working with Unity Solutions has been an incredible experience. Their writing team is highly skilled, and they consistently deliver top-notch content.",
      author: "John Njau",
      position: "Software Developer"
    },
    {
      quote: "Unity Solutions exceeded my expectations. Their commitment to quality and attention to detail is unmatched.",
      author: "Ben Dennis",
      position: "Data Analyst"
    },
    // Add more dummy review data as needed
  ];

  return (
    <section id="reviews" className="bg-gradient-to-r from-purple-100 to-blue-100 py-16 px-4 ">
      <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">What Our Clients Say</h2>
      <div className="container  text-center gap-6 flex flex-col md:flex-row">
        {reviewsData.map((review, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
            <blockquote className="text-lg text-gray-800 mb-6">
              "{review.quote}"
            </blockquote>
            <p className="text-gray-600 text-lg">- {review.author}, {review.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
