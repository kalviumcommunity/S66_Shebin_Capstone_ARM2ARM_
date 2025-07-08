import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  HeartHandshake,
  CalendarDays,
  Droplets,
  FileHeart,
  Trophy,
  User,
  HouseIcon
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home", icon: <HouseIcon className="w-5 h-5" /> },
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: "/findBlood", label: "Find Blood", icon: <Search className="w-5 h-5" /> },
    { path: "/donate", label: "Donate", icon: <HeartHandshake className="w-5 h-5" /> },
    { path: "/donationCamps", label: "Donation Camps", icon: <CalendarDays className="w-5 h-5" /> },
    // { path: "/myDonations", label: "My Donations", icon: <Droplets className="w-5 h-5" /> },
    // { path: "/myRequests", label: "My Requests", icon: <FileHeart className="w-5 h-5" /> },
    { path: "/leaderboard", label: "Leaderboard", icon: <Trophy className="w-5 h-5" /> },
    { path: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="sticky left-0 h-[calc(100vh-3.5rem)] w-64 bg-white  px-4 py-6">
      
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
            >
              {link.icon}
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
