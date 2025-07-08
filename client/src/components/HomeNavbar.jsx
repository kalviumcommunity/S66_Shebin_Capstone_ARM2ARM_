import React from "react";
import { Bell } from "lucide-react";
import logo from "/logo.png";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link, NavLink, useLocation } from "react-router-dom";

const HomeNavbar = () => {
    const { user } = useUser();
    const userRole = user?.publicMetadata?.userType;
    const location = useLocation();

    const links = [
        { path: "/", label: "Home" },
        { path: "/findBlood", label: "Find Blood" },
        { path: "/donate", label: "Donate" },
        { path: "/donationCamps", label: "Camps" },
        { path: "/About", label: "About" },
    ];

    return (
        <div className="sticky top-0 z-10 w-full bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <h1 className="text-xl font-bold text-gray-800">Arm2Arm</h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex gap-4">
            {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                        ? "bg-red-100 text-red-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    {link.label}
                </NavLink>
                );
            })}
            </nav>

            <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-black transition">
                <Bell size={22} />
            </button>

            <SignedIn>
                <UserButton
                appearance={{
                    elements: {
                    userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                    userButtonBox: "scale-90 sm:scale-100",
                    },
                }}
                showName={true}
                userProfileMode="navigation"
                userProfileUrl={
                    userRole === "hospital" ? "/hospital/profile" : "/user/profile"
                }
                />
            </SignedIn>

            <SignedOut>
                <Link to="/login" className="bg-gray-100 text-[#E53E3E] font-semibold text-sm rounded-md px-4 py-2 hover:bg-gray-200">
                Log In
                </Link>
                <Link to="/signUp" className="bg-[#E53E3E] text-white font-semibold text-sm rounded-md px-4 py-2 hover:bg-red-700">
                Sign Up
                </Link>
            </SignedOut>
            </div>
        </div>
        </div>
    );
};

export default HomeNavbar;
