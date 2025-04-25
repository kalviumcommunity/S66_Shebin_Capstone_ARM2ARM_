import React from "react";
import { Bell, User } from "lucide-react";
import logo from "/logo.png";
const TopNavBar = () => {
  return (
    <div className="sticky top-0 w-full bg-white h-14 flex items-center justify-between px-6 py-1">
      <div className="flex items-center">
        <img src={logo} className="size-12" />
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
