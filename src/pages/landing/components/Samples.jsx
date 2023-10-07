// import React from 'react';

const Samples = () => {
  return (
    <section id="samples" className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Explore Our Samples</h2>
        <p className="text-lg text-gray-700 mb-8">
          Take a moment to explore some of our recent writing samples to get a taste of our writing style and quality:
        </p>
        {/* Placeholder for sample content or links to sample documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          Sample 1
          <div className="bg-white p-6 rounded-lg shadow-lg">
            Add content or link for sample 1
          </div>
          {/* Sample 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Add content or link for sample 2 */}
          </div>
          {/* Sample 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Add content or link for sample 3 */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Samples;
