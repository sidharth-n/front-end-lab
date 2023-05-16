import React from "react";

const Quote = ({ verse, explanation }) => {
  return (
    <div className="bg-white shadow-md rounded p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Verse:</h2>
      <p className="text-gray-700 mb-4">{verse}</p>
      <h2 className="text-xl font-bold mb-4">Explanation:</h2>
      <p className="text-gray-700">{explanation}</p>
    </div>
  );
};

export default Quote;
