import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import { HeartPulse, Trophy, CalendarHeart, Droplet, Mail, Phone } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavbar />
      <div className="flex justify-center items-start p-6">
        <div className="w-full max-w-5xl bg-white p-10 rounded-2xl shadow-md text-center">
          {/* Title */}
          <h1 className="text-4xl font-bold text-red-500 mb-6">
            About Us
          </h1>

          <p className="text-gray-700 mb-6 text-lg">
            This full-stack blood donation platform connects donors, hospitals, and blood banks — making blood availability faster and smarter. It helps users find donation opportunities, track donation history, and get recognized for contributions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Why This Matters
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-6">
            Many willing donors don’t know where or how to donate. This platform provides easy access to donation events, locations, and a motivational leaderboard to drive meaningful impact.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-6">
            Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start gap-4 bg-red-50 p-4 rounded-lg">
              <HeartPulse className="text-red-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Easy Blood Donation</h3>
                <p className="text-sm text-gray-600">
                  Register, select your blood type, and get matched to requests or events near you.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg">
              <CalendarHeart className="text-purple-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Donation Camps</h3>
                <p className="text-sm text-gray-600">
                  Browse upcoming donation drives hosted by hospitals, colleges, and NGOs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-yellow-50 p-4 rounded-lg">
              <Trophy className="text-yellow-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Leaderboard & Rewards</h3>
                <p className="text-sm text-gray-600">
                  Earn badges and track your ranking with gamified rewards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-blue-50 p-4 rounded-lg">
              <Droplet className="text-blue-500 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Track & Manage</h3>
                <p className="text-sm text-gray-600">
                  See your donation stats and get reminders for your next eligibility date.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-left">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Contact Us</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="text-red-500 w-5 h-5" />
                <span>support@arm2arm.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-red-500 w-5 h-5" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-left">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-3xl mx-auto text-sm text-gray-700">
              <div>
                <h4 className="font-semibold">Is this platform free to use?</h4>
                <p>Yes. This app is completely free for all users including donors and hospitals.</p>
              </div>

              <div>
                <h4 className="font-semibold">Who can register as a donor?</h4>
                <p>Anyone aged 18–65 who meets basic health requirements can register and start donating.</p>
              </div>

              <div>
                <h4 className="font-semibold">How does the leaderboard work?</h4>
                <p>You earn points and badges for each donation and can see your rank across your city, state, and the nation.</p>
              </div>

              <div>
                <h4 className="font-semibold">Can hospitals or NGOs host donation camps?</h4>
                <p>Yes. Verified hospitals, colleges, and NGOs can organize camps through our platform.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-gray-600 italic text-center">
            Together, we make saving lives easier, faster, and more impactful.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
