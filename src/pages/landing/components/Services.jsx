// import React from 'react';

const Services = () => {
  return (
    <section id="services" className="bg-slate-900 text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-extrabold mb-6">Our Writing Services</h2>
        <p className="text-lg text-gray-200 mb-8">
          Explore our diverse range of writing services tailored to your needs:
        </p>
        <ul className="text-lg text-gray-200 list-disc list-inside pl-4">
          <li className="mb-4 text-start">Content Writing</li>
          <li className="mb-4 text-start">Copywriting</li>
          <li className="mb-4 text-start">Blog Post Creation</li>
          <li className="mb-4 text-start">Editing and Proofreading</li>
          <li className="mb-4 text-start">Custom Writing Projects</li>
        </ul>
      </div>
    </section>
  );
};

export default Services;
