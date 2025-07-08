import React from 'react';
import Sidebar from "../components/sideBar";
import TopNavBar from "../components/navbar";
import { Trophy } from "lucide-react";

const Leaderboard = () => {
    return (
        <div>
            <TopNavBar />
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 bg-gradient-to-br from-red-50 to-white p-6 overflow-y-auto flex flex-col items-center justify-center min-h-screen">
                    <div className="bg-white rounded-3xl shadow-2xl px-12 py-16 max-w-3xl w-full text-center border border-red-100">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-yellow-100 rounded-full p-5 shadow-md">
                                <Trophy size={72} className="text-yellow-500" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold  mb-4 tracking-tight">
                            Leaderboard Coming Soon!
                        </h1>
                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            🚀 We’re building something exciting! Soon, you’ll be able to compete with fellow donors, earn badges like <strong>Life Saver</strong>, keep donation streaks, and rise in the leaderboard across your city, state, and country.
                        </p>
                        <p className="mt-6 text-gray-500 text-base italic">
                            Stay tuned, your next donation might take you to the top 🩸
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
