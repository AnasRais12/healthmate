"use client";
import React from "react";

export default function PWAHome({ onEnter }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="max-w-md w-full text-center p-6 rounded-lg shadow-lg">
        <img src="/assets/SplashImage.png" alt="HealthMate" className="mx-auto mb-4 w-20 h-20" />
        <h1 className="text-2xl font-bold mb-2">Welcome to HealthMate</h1>
        <p className="mb-4 text-sm text-gray-600">Your personal health assistant on the go.</p>
        <button
          onClick={onEnter}
          className="px-4 py-2 bg-green-600 text-white rounded-md font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
