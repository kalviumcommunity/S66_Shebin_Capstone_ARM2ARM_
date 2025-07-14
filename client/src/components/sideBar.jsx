import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  HeartHandshake,
  CalendarDays,
  Trophy,
  User,
  HouseIcon,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { path: "/", label: "Home", icon: <HouseIcon className="w-5 h-5" /> },
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: "/findBlood", label: "Find Blood", icon: <Search className="w-5 h-5" /> },
    { path: "/donate", label: "Donate", icon: <HeartHandshake className="w-5 h-5" /> },
    { path: "/donationCamps", label: "Donation Camps", icon: <CalendarDays className="w-5 h-5" /> },
    { path: "/leaderboard", label: "Leaderboard", icon: <Trophy className="w-5 h-5" /> },
    { path: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Floating Action Button (FAB) for Mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed bottom-4 right-4 z-30 p-3 bg-[#E53E3E] text-white rounded-full shadow-lg hover:bg-red-700 focus:outline-none"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:sticky md:left-0 md:h-[calc(100vh-3.5rem)] md:translate-x-0 md:w-64 px-4 py-6 z-20`}
      >
        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-red-100 text-red-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
              >
                {link.icon}
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Backdrop for Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;