"use client";
import React from "react";
import Link from "next/link";

export default function Home() {
    return (
        <div className=" h-screen sm:min-h-screen flex sm:items-center items-start sm:justify-center justify-start bg-gradient-to-br from-gray-100 to-white">
            <div className="bg-white/90 sm:h-fit h-screen flex flex-col sm:justify-start justify-center  backdrop-blur-md p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl shadow-lg  w-full md:w-[90%] mx-2 md:mx-4">
                <h1 className="text-3xl sm:text-4xl  md:text-5xl font-bold text-gray-900 mb-4 text-center ">
                    HealthMate
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 text-center">
                    Your Smart Health Companion 💙 — Manage reports, track progress, and
                    get AI-driven insights all in one place.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                    <Link href="/signup" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-lg">
                            Get Started
                        </button>
                    </Link>
                    <Link href="/signin" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto border border-green-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300 text-lg">
                            Sign In
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">💡 Smart Insights</h3>
                        <p className="text-gray-600 text-sm md:text-base">AI-based analysis of your medical reports.</p>
                    </div>
                    <div className="text-center p-4">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">📊 Health Tracking</h3>
                        <p className="text-gray-600 text-sm md:text-base">Track your progress and improvements over time.</p>
                    </div>
                    <div className="text-center p-4">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">🔒 Secure Storage</h3>
                        <p className="text-gray-600 text-sm md:text-base">All your reports safely stored in the cloud.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}