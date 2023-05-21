import React from "react";

const Quote = ({ verse, explanation }) => {
  return (
    <div className="bg-gray-800 shadow-md rounded p-4 mb-8 transition-all duration-500 ease-in-out">
      <h2 className="text-2xl font-bold mb-3">Krishna says: </h2>
      <p className="text-gray-300 mb-8 text-lg">{verse}</p>
      <h2 className="text-2xl font-bold mb-3">Explanation: </h2>
      <p className="text-gray-300 text-lg">{explanation}</p>
    </div>
  );
};

export default Quote;
