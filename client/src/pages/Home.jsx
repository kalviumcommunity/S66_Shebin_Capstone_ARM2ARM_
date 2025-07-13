import React, { useState } from 'react';
import HomeNavbar from "../components/HomeNavbar";
import { InfiniteSlider } from '../components/infiniteSlider';
import { Facebook, Twitter, Instagram, MapPin, Heart, ArrowRight, Info, Flame, Trophy, Building2, UserPlus, BellRing, Clock, Coffee, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import men from "/men.png";
import women from "/women.png";
import logo from "/logo.png";

const BloodTypes = [
  { label: "A+", subtitle: "Most Common" },
  { label: "O-", subtitle: "Universal Donor" },
  { label: "AB+", subtitle: "Universal Recipient" },
];

const BLOOD_TYPES = [
  { label: "O-", percentage: "6.6%" },
  { label: "O+", percentage: "37.4%" },
  { label: "A-", percentage: "6.3%" },
  { label: "A+", percentage: "35.7%" },
  { label: "B-", percentage: "1.5%" },
  { label: "B+", percentage: "8.5%" },
  { label: "AB-", percentage: "0.6%" },
  { label: "AB+", percentage: "3.4%" },
];

const compatibilityData = {
  "O-": { donate: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], receive: ["O-"] },
  "O+": { donate: ["O+", "A+", "B+", "AB+"], receive: ["O+", "O-"] },
  "A-": { donate: ["A-", "A+", "AB-", "AB+"], receive: ["A-", "O-"] },
  "A+": { donate: ["A+", "AB+"], receive: ["A+", "A-", "O+", "O-"] },
  "B-": { donate: ["B-", "B+", "AB-", "AB+"], receive: ["B-", "O-"] },
  "B+": { donate: ["B+", "AB+"], receive: ["B+", "B-", "O+", "O-"] },
  "AB-": { donate: ["AB-", "AB+"], receive: ["AB-", "A-", "B-", "O-"] },
  "AB+": { donate: ["AB+"], receive: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
};

const cards = [
  {
    icon: <Clock className="text-red-500 w-9 h-9" />,
    title: "It takes only an hour",
    desc: "Donate blood save lives!",
  },
  {
    icon: <Coffee className="text-red-500 w-9 h-9" />,
    title: "You will get free refreshments after donation",
    desc: "Donation of blood is safe and healthy",
  },
  {
    icon: <Heart className="text-red-500 w-9 h-9" />,
    title: "It costs nothing",
    desc: "Give blood and stay healthy",
  },
  {
    icon: <Shield className="text-red-500 w-9 h-9" />,
    title: "There is no substitute for human blood",
    desc: "Every donation can save up to 3 lives",
  },
];

const Home = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <HomeNavbar />
      <section className="pt-6 md:pt-12 text-center px-4 md:px-6">
        <span className="inline-block bg-red-100 text-red-600 font-semibold text-xs md:text-sm px-2 md:px-3 py-1 md:py-1 rounded-full mb-2 md:mb-4">
          Every Drop Counts
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Save Lives, <span className="text-[#E53E3E]">Donate Blood</span> Today!
        </h1>
        <p className="mt-2 md:mt-4 max-w-xl sm:max-w-2xl mx-auto text-gray-600 text-sm md:text-lg">
          Connect with donors and recipients in real‑time. Your donation can save up to three lives in your community.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 pt-4 md:pt-6">
          <Link to="/findBlood" className="w-full sm:w-auto bg-[#E53E3E] text-sm md:text-lg text-white font-semibold px-4 md:px-5 py-2 md:py-3 rounded-full shadow hover:bg-red-700 transition text-center">
            Find Blood
          </Link>
          <Link to="/donate" className="w-full sm:w-auto border text-sm md:text-xl border-[#E53E3E] text-[#E53E3E] font-semibold px-4 md:px-5 py-2 md:py-3 rounded-full hover:bg-red-50 transition text-center">
            Donate
          </Link>
        </div>

        <div className="mt-6 md:mt-12 max-w-xl md:max-w-3xl mx-auto px-2 md:px-4">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center mb-4 md:mb-6">Find Blood Availability</h3>
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <select className="w-full md:flex-1 border border-gray-300 rounded-lg px-3 md:px-4 py-2 text-gray-700 text-sm md:text-base">
                <option>Blood Type</option>
                {BLOOD_TYPES.map((type) => (
                  <option key={type.label}>{type.label}</option>
                ))}
              </select>
              <div className="relative w-full md:flex-1">
                <MapPin className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 md:w-5 h-4 md:h-5" />
                <input type="text" placeholder="Enter location" className="w-full pl-8 md:pl-10 border border-gray-300 rounded-lg px-3 md:px-4 py-2 text-gray-700 text-sm md:text-base" />
              </div>
              <Link to="/findBlood" className="w-full md:w-auto bg-[#E53E3E] text-white px-4 md:px-6 py-2 md:py-2 rounded-lg font-medium hover:bg-red-600 transition text-center text-sm md:text-base">
                Find Blood
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-16 flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {BloodTypes.map(({ label, subtitle }) => (
            <div key={label} className="flex flex-col items-center justify-center p-2 md:p-4 rounded-xl w-24 md:w-40 h-20 md:h-32">
              <span className="text-red-400 text-lg md:text-2xl font-bold bg-red-50 px-2 md:px-4 py-1 md:py-2 rounded-lg">{label}</span>
              <span className="text-xs md:text-sm text-gray-600 text-center mt-1 md:mt-2 truncate w-full">{subtitle}</span>
            </div>
          ))}
        </div>
      </section>

      <div>
        {/* Blood Group Compatibility */}
        <div className="py-8 px-4 md:px-6 text-center md:py-20 relative overflow-hidden">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Blood Group Compatibility</h2>
          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Click on any blood group to learn about donation and receiving compatibility.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 max-w-md sm:max-w-2xl md:max-w-4xl mx-auto">
            {BLOOD_TYPES.map(({ label, percentage }) => (
              <div key={label} onClick={() => setSelected(label)} className={`cursor-pointer border rounded-lg p-2 md:p-4 flex flex-col items-center transition ${selected === label ? "border-red-500" : "hover:shadow"}`}>
                <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#E53E3E] text-white text-sm md:text-lg font-bold mb-1 md:mb-2">{label}</div>
                <span className="text-gray-600 text-xs md:text-sm text-center">{percentage} <br /> Population</span>
              </div>
            ))}
          </div>

          {selected && (
            <div className="mt-6 md:mt-10 max-w-md sm:max-w-2xl md:max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg md:text-xl font-bold text-white bg-[#E53E3E] px-3 md:px-4 py-1 md:py-2 rounded-t-lg">Blood Group {selected}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-2 md:p-4">
                <div>
                  <p className="text-green-600 font-semibold mb-1 md:mb-2 flex items-center text-sm md:text-base"><ArrowRight className="mr-1 md:mr-2 w-4 md:w-5 h-4 md:h-5" /> Can Donate To</p>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {compatibilityData[selected].donate.map((type) => (
                      <span key={type} className="px-2 md:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs md:text-sm">{type}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-blue-600 font-semibold mb-1 md:mb-2 flex items-center text-sm md:text-base"><Heart className="mr-1 md:mr-2 w-4 md:w-5 h-4 md:h-5" /> Can Receive From</p>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {compatibilityData[selected].receive.map((type) => (
                      <span key={type} className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm">{type}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-2 md:mt-4 text-xs md:text-sm text-red-500 flex items-center"><Info className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-1" /> Can help {compatibilityData[selected].donate.length} blood group(s)</div>
            </div>
          )}
        </div>

        {/* Why Choose Us */}
        <section className="py-8  px-4 md:px-6 text-center md:py-28 relative overflow-hidden bg-[#f9f9f9]">
          <p className="text-xs md:text-sm text-red-600 font-semibold mb-1 md:mb-2">
            <span className="inline-block bg-red-100 text-red-600 px-2 md:px-3 py-1 md:py-1 rounded-full">Why Choose Us</span>
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 md:mb-4">Key Features</h2>
          <p className="text-gray-600 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto mb-4 md:mb-10 text-sm md:text-base">
            Our platform connects blood donors with those in need, making the donation process
            seamless, efficient, and rewarding.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-xs sm:max-w-3xl md:max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-4 md:p-6 shadow hover:shadow-md transition">
              <div className="bg-red-100 p-2 md:p-3 inline-block rounded-full mb-2 md:mb-4">
                <Flame className="text-red-500 w-5 md:w-6 h-5 md:h-6" />
              </div>
              <h4 className="text-base md:text-lg font-semibold mb-1 md:mb-1">Urgency-Based Requests</h4>
              <p className="text-gray-600 text-xs md:text-sm">
                Fast & reliable blood donation matching for critical situations requiring immediate assistance.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow hover:shadow-md transition">
              <div className="bg-green-100 p-2 md:p-3 inline-block rounded-full mb-2 md:mb-4">
                <MapPin className="text-green-600 w-5 md:w-6 h-5 md:h-6" />
              </div>
              <h4 className="text-base md:text-lg font-semibold mb-1 md:mb-1">Live Donor Tracking</h4>
              <p className="text-gray-600 text-xs md:text-sm">
                Find donors in real-time using location-based matching to reduce response time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow hover:shadow-md transition">
              <div className="bg-purple-100 p-2 md:p-3 inline-block rounded-full mb-2 md:mb-4">
                <Trophy className="text-purple-600 w-5 md:w-6 h-5 md:h-6" />
              </div>
              <h4 className="text-base md:text-lg font-semibold mb-1 md:mb-1">Gamification & Rewards</h4>
              <p className="text-gray-600 text-xs md:text-sm">
                Earn badges for donations, join leaderboards, and track your life-saving impact.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 shadow hover:shadow-md transition">
              <div className="bg-blue-100 p-2 md:p-3 inline-block rounded-full mb-2 md:mb-4">
                <Building2 className="text-blue-600 w-5 md:w-6 h-5 md:h-6" />
              </div>
              <h4 className="text-base md:text-lg font-semibold mb-1 md:mb-1">Blood Bank Integration</h4>
              <p className="text-gray-600 text-xs md:text-sm">
                Check blood bank inventory in real-time and find the nearest available supplies.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-8 md:py-16 px-4 md:px-6 relative overflow-hidden text-center">
          <p className="text-xs md:text-sm text-red-600 font-semibold mb-1 md:mb-2">
            <span className="inline-block bg-red-100 text-red-600 px-2 md:px-3 py-1 md:py-1 rounded-full">Simple Process</span>
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 md:mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-xs sm:max-w-xl md:max-w-2xl mx-auto mb-4 md:mb-10 pt-1 md:pt-3 text-sm md:text-base">
            Getting started with LifeSaver is simple. Follow these steps to either find blood or become a donor.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-start md:items-stretch gap-4 md:gap-8 max-w-xs sm:max-w-2xl md:max-w-6xl mx-auto">
            <div className="flex items-start gap-3 md:gap-4 mt-3 md:mt-5">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full px-2 md:px-4 bg-red-500 text-white flex items-center justify-center font-bold text-xs md:text-base">1</div>
              <div className="text-left">
                <div className="flex items-center gap-1 md:gap-2 mb-1">
                  <UserPlus className="text-red-500 w-4 md:w-5 h-4 md:h-5" />
                  <span className="font-semibold text-sm md:text-base">Sign Up & Verify</span>
                </div>
                <p className="text-gray-600 text-xs md:text-sm">Create an account and verify your identity to ensure security and authenticity.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 md:gap-4 mt-3 md:mt-5">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full px-2 md:px-4 bg-red-500 text-white flex items-center justify-center font-bold text-xs md:text-base">2</div>
              <div className="text-left">
                <div className="flex items-center gap-1 md:gap-2 mb-1">
                  <Heart className="text-red-500 w-4 md:w-5 h-4 md:h-5" />
                  <span className="font-semibold text-sm md:text-base">Find or Donate Blood</span>
                </div>
                <p className="text-gray-600 text-xs md:text-sm">Search for blood or register as a donor to help those in need.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 md:gap-4 mt-3 md:mt-5">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full px-2 md:px-4 bg-red-500 text-white flex items-center justify-center font-bold text-xs md:text-base">3</div>
              <div className="text-left">
                <div className="flex items-center gap-1 md:gap-2 mb-1">
                  <BellRing className="text-red-500 w-4 md:w-5 h-4 md:h-5" />
                  <span className="font-semibold text-sm md:text-base">Get Notified & Track</span>
                </div>
                <p className="text-gray-600 text-xs md:text-sm">Receive real-time notifications and track the status of your request or donation.</p>
              </div>
            </div>
          </div>

          <Link to="/signUp" className="inline-block mt-6 md:mt-12 bg-[#E53E3E] text-white font-semibold px-4 md:px-6 py-2 md:py-3 rounded-full shadow hover:bg-red-700 transition text-sm md:text-base">
            Get Started Today →
          </Link>
        </section>

        {/* Why Donate Blood */}
        <div className="bg-[#a61919] py-8 md:py-10 text-white relative overflow-hidden">
          <div className="text-center px-4 md:px-6">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Why Donate Blood?</h2>
            <p className="text-red-100 mb-6 md:mb-10 text-sm md:text-base">Discover the benefits and impact of blood donation</p>
          </div>

          <InfiniteSlider speedOnHover={20} gap={16} className="py-8 md:py-10 relative overflow-hidden">
            <div className="relative overflow-x-hidden">
              <div className="flex gap-4 md:gap-6 w-max animate-scroll-x group-hover:[animation-play-state:paused]">
                {[...cards, ...cards].map((card, i) => (
                  <div key={i} className="bg-white text-gray-900 rounded-2xl p-4 md:p-6 min-w-[240px] md:min-w-[280px] max-w-xs shadow-md text-center">
                    <div className="bg-red-100 p-2 md:p-3 rounded-full mb-2 md:mb-4 inline-block">{card.icon}</div>
                    <h4 className="font-semibold mb-1 text-sm  md:text-lg">{card.title}</h4>
                    <p className="text-gray-600 text-xs md:text-sm">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </InfiniteSlider>
        </div>

        {/* Success Stories */}
        <section className="bg-white py-10 md:py-20 px-4 md:px-6 text-center">
          <span className="inline-block bg-red-100 text-red-600 font-semibold text-xs md:text-sm px-2 md:px-3 py-1 md:py-1 rounded-full mb-2 md:mb-4">
            Testimonials
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 md:mb-2 text-gray-900">Success Stories</h2>
          <p className="text-gray-600 mb-6 md:mb-12 max-w-xl md:max-w-2xl mx-auto text-sm md:text-base">
            Read about the experiences of donors and recipients who have used our platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-xl md:max-w-6xl mx-auto">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md text-left flex flex-col justify-between">
              <div className="text-red-500 text-2xl md:text-3xl mb-2 md:mb-4">❝</div>
              <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                "I needed a rare blood type for my surgery and LifeSaver connected me with a donor in less than an hour. I'm forever grateful for this platform and the generous donors."
              </p>
              <div className="flex items-center gap-2 md:gap-4">
                <img src={women} className="w-7 md:w-9 h-8 md:h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-xs md:text-sm text-gray-900">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">Blood Recipient</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md text-left flex flex-col justify-between">
              <div className="text-red-500 text-2xl md:text-3xl mb-2 md:mb-4">❝</div>
              <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                "Being able to see the direct impact of my donations is incredible. The gamification aspect keeps me coming back to donate regularly. It's a rewarding experience."
              </p>
              <div className="flex items-center gap-2 md:gap-4">
                <img src={men} className="w-7 md:w-9 h-8 md:h-10 rounded-full" />
                <div>
                  <p className="font-semibold text-xs md:text-sm text-gray-900">Michael Rodriguez</p>
                  <p className="text-xs text-gray-500">Regular Donor</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-white border-t mt-8 md:mt-16">
        <div className="max-w-xs sm:max-w-2xl md:max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <div>
            <div className="flex items-center mb-2 md:mb-4">
              <img src={logo} className="w-8 md:w-10 h-8 md:h-10 rounded-full" alt="Logo" />
              <span className="ml-1 md:ml-2 text-lg md:text-xl font-semibold text-gray-900">Arm2Arm</span>
            </div>
            <p className="text-gray-600 text-xs md:text-sm">
              Connecting blood donors with those in need, saving lives one donation at a time.
            </p>
            <div className="flex gap-2 md:gap-3 mt-2 md:mt-4">
              <div className="bg-gray-100 p-1 md:p-2 rounded-full hover:bg-gray-200 cursor-pointer">
                <Twitter className="w-3 md:w-4 h-3 md:h-4 text-gray-600" />
              </div>
              <div className="bg-gray-100 p-1 md:p-2 rounded-full hover:bg-gray-200 cursor-pointer">
                <Facebook className="w-3 md:w-4 h-3 md:h-4 text-gray-600" />
              </div>
              <div className="bg-gray-100 p-1 md:p-2 rounded-full hover:bg-gray-200 cursor-pointer">
                <Instagram className="w-3 md:w-4 h-3 md:h-4 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 md:mb-4 text-sm md:text-base">Quick Links</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/findBlood">Find Blood</Link></li>
              <li><Link to="/donate">Donate</Link></li>
              <li><Link to="/donationCamps">Donation Camps</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 md:mb-4 text-sm md:text-base">Resources</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600">
              <li>Donation Guide</li>
              <li>Eligibility</li>
              <li>FAQs</li>
              <li>Support</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;