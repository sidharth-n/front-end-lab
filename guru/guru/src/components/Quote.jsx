import React from "react";

const Quote = ({ verse, explanation }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-8">
      <h2 className="text-xl font-bold mb-3">Jesus says: </h2>
      <p className="text-gray-700 mb-8 text-lg">{verse}</p>
      <h2 className="text-xl font-bold mb-3">Explanation: </h2>
      <p className="text-gray-700 text-lg">{explanation}</p>
    </div>
  );
};

export default Quote;
