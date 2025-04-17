import React from 'react';
import { Bell, User } from 'lucide-react';

const TopNavBar = () => {
  return (
    <div className="w-full h-18 bg-white  shadow-sm flex items-center justify-between px-6 py-1">
      <div className="flex items-center gap-2">
        <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
          B+
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Arm2Arm</h1>
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-black transition">
          <Bell size={22} />
        </button>
        <button className="text-gray-600 hover:text-black transition">
          <User size={22} />
        </button>
      </div>
    </div>
  );
};

export default TopNavBar;
