// import React from 'react';

const Samples = () => {
  // Dummy data for samples
  const sampleData = [
    {
      title: 'Programming Assignment',
      description: 'Explore this programming assignment sample to see our approach and expertise in tackling coding challenges.',
      link: '#'
    },
    {
      title: 'Business Plan',
      description: 'Check out our business plan sample to get insights into our strategic thinking and planning capabilities.',
      link: '#'
    },
    {
      title: 'Environmental Science',
      description: 'Dive into our environmental science sample to understand how we communicate complex scientific concepts.',
      link: '#'
    },
    {
      title: 'Discussion Research',
      description: 'Read our discussion research sample to see how we analyze and present information in a clear and concise manner.',
      link: '#'
    },
    // Add more dummy sample data as needed
  ];

  return (
    <section id="samples" className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
          Explore Our Samples
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Take a moment to explore some of our recent writing samples to get a
          taste of our writing style and quality:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-col">
          {sampleData.map((sample, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{sample.title}</h3>
              <p className="text-gray-700 mb-4">{sample.description}</p>
              <a href={sample.link} className="text-blue-400">
                View Sample
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Samples;
