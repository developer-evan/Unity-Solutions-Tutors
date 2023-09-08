// import React from 'react';

function Dashboard() {
  return (
    <div className="flex">
      <div className="max-w-xs mx-auto p-3">
        <div className="bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xl font-semibold mb-2">Card 1</h2>
          <p className="text-gray-600">
            This is a flexible card component for your dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-xs mx-auto p-3">
        <div className="bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xl font-semibold mb-2">Card 2</h2>
          <p className="text-gray-600">
            You can easily customize the content of each card.
          </p>
        </div>
      </div>

      <div className="max-w-sm mx-auto p-3">
        <div className="bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xl font-semibold mb-2">Card 3</h2>
          <p className="text-gray-600">
            Add more cards as needed for your dashboard.
          </p>
        </div>
      </div>
      <div className="max-w-xs mx-auto p-3">
        <div className="bg-white shadow-md rounded-lg p-3">
          <h2 className="text-xl font-semibold mb-2">Card 3</h2>
          <p className="text-gray-600">
            Add more cards as needed for your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
