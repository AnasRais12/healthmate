import React from "react";

export default function PWAHome({ onEnter }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-green-600 text-white text-center">
      <h1 className="text-3xl font-bold mb-3">Welcome to HealthMate</h1>
      <p className="text-lg mb-5">Your personal health assistant on the go.</p>
      <button
        onClick={onEnter}
        className="bg-white text-green-700 font-semibold px-5 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        Continue
      </button>
    </div>
  );
}
