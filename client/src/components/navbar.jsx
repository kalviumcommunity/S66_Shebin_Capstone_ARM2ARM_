import React from "react";
import { Bell } from "lucide-react";
import logo from "/logo.png";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const TopNavBar = () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.userType;

  return (
    <div className="sticky top-0 w-full bg-white h-14 flex items-center justify-between px-4 md:px-6 py-1 shadow-sm z-10">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="size-10 md:size-12" />
        <h1 className="text-lg md:text-xl font-semibold text-gray-800 ml-2">Arm2Arm</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="text-gray-600 hover:text-black transition">
          <Bell size={20} />
        </button>

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                userButtonBox: "scale-90 sm:scale-100",
              },
            }}
            showName={false}
            userProfileMode="navigation"
            userProfileUrl={
              userRole === "hospital" ? "/hospital/profile" : "/user/profile"
            }
          />
        </SignedIn>

        <SignedOut>
          <Link
            to="/login"
            className="bg-gray-100 text-[#E53E3E] font-semibold rounded-2xl px-2 md:px-3 py-1 md:py-2 text-sm md:text-base hover:bg-gray-200"
          >
            Login
          </Link>
          <Link
            to="/signUp"
            className="bg-[#E53E3E] text-white font-semibold rounded-2xl px-2 md:px-3 py-1 md:py-2 text-sm md:text-base hover:bg-red-700"
          >
            Sign Up
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default TopNavBar;