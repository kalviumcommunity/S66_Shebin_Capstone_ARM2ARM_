import React, { useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import logo from "/logo.png";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Link, NavLink, useLocation } from "react-router-dom";

const HomeNavbar = () => {
    const { user } = useUser();
    const userRole = user?.publicMetadata?.userType;
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = [
        { path: "/", label: "Home" },
        { path: "/findBlood", label: "Find Blood" },
        { path: "/donate", label: "Donate" },
        { path: "/donationCamps", label: "Camps" },
        { path: "/About", label: "About" },
    ];

    return (
        <div className="sticky top-0 z-10 w-full bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
            {/* Logo and Title */}
            <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
            <h1 className="text-lg md:text-xl font-bold text-gray-800">Arm2Arm</h1>
            </div>

            {/* Navigation Links - Hidden on Mobile */}
            <nav className="hidden md:flex gap-4">
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

            {/* User Controls */}
            <div className="flex items-center gap-4">
            {/* Bell Icon - Hidden on Mobile, Visible on Medium+ */}
            <SignedIn>
                <button className="hidden md:block text-gray-600 hover:text-black transition">
                <Bell size={20} />
                </button>
            </SignedIn>

            {/* User Button - Always Visible for SignedIn */}
            <SignedIn>
                <UserButton
                appearance={{
                    elements: {
                    userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
                    userButtonBox: "scale-90 md:scale-100",
                    },
                }}
                showName={false}
                userProfileMode="navigation"
                userProfileUrl={
                    userRole === "hospital" ? "/hospital/profile" : "/user/profile"
                }
                />
            </SignedIn>

            {/* Login/SignUp Buttons - Hidden on Mobile, Visible on Medium+ */}
            <SignedOut>
                <div className="hidden md:flex gap-2">
                <Link to="/login" className="bg-gray-100 text-[#E53E3E] font-semibold text-sm rounded-md px-4 py-2 hover:bg-gray-200">
                    Log In
                </Link>
                <Link to="/signUp" className="bg-[#E53E3E] text-white font-semibold text-sm rounded-md px-4 py-2 hover:bg-red-700">
                    Sign Up
                </Link>
                </div>
            </SignedOut>

            {/* Hamburger Menu - Visible on Mobile */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-600 hover:text-black transition"
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4 z-20">
            <nav className="flex flex-col gap-2">
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
                    onClick={() => setIsMenuOpen(false)}
                    >
                    {link.label}
                    </NavLink>
                );
                })}
                {/* Login/SignUp Links for SignedOut in Mobile Menu */}
                <SignedOut>
                <Link
                    to="/login"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Log In
                </Link>
                <Link
                    to="/signUp"
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Sign Up
                </Link>
                </SignedOut>
            </nav>
            </div>
        )}
        </div>
    );
};

export default HomeNavbar;