import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/sideBar";
import TopNavBar from "../components/navbar";
import { Droplet, Users, CalendarHeart, Flame } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
    const { user } = useUser();
    const [donorCount, setDonorCount] = useState(0);
    const [bloodBankCount, setBloodBankCount] = useState(0);
    const [campCount, setCampCount] = useState(0);
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const email = user?.primaryEmailAddress?.emailAddress;
                const userRes = await axios.get("http://localhost:9000/user", { params: { email } });
                const fullUser = userRes.data;
                if (fullUser?.name) setUserName(fullUser.name);

                const allUsersRes = await axios.get("http://localhost:9000/user");
                const users = allUsersRes.data || [];

                const donors = users.filter((u) => u.requested_type === "Donor");
                const banks = users.filter((u) => u.requested_type === "Blood-Banks");

                setDonorCount(donors.length);
                setBloodBankCount(banks.length);

                const campRes = await axios.get("http://localhost:9000/DonationCamps");
                const camps = campRes.data?.data || [];
                setCampCount(camps.length);
            } catch (err) {
                console.error("Error loading dashboard data:", err);
        }
        };

    if (user) fetchAllData();
    }, [user]);

    return (
        <div>
        <TopNavBar />
        <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}</h1>
            <p className="text-gray-600 mb-6">Your blood donation journey makes a difference</p>

            {/* Quote Banner */}
            <div className="bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-xl mb-6">
                <p className="italic">
                "The gift of blood is the gift of life. There is no greater gift than that."
                <br /><span className="font-medium">– World Health Organization</span>
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-5 rounded-xl shadow border">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Blood Types</span>
                    <Flame className="text-red-500 w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">8</h2>
                <Link to="/donate" className="text-sm text-red-500 hover:underline">Find your match</Link>
                </div>

                <div className="bg-white p-5 rounded-xl shadow border">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Community</span>
                    <Users className="text-pink-500 w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">{donorCount}</h2>
                <Link to="/signUp" className="text-sm text-green-500 hover:underline">Join the community</Link>
                </div>

                <div className="bg-white p-5 rounded-xl shadow border">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Blood Banks</span>
                    <Droplet className="text-red-500 w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">{bloodBankCount}</h2>
                <Link to="/findBlood" className="text-sm text-blue-500 hover:underline">Always accessible</Link>
                </div>

                <div className="bg-white p-5 rounded-xl shadow border">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Camps</span>
                    <CalendarHeart className="text-purple-500 w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold">{campCount}</h2>
                <Link to="/donationCamps" className="text-sm text-fuchsia-600 hover:underline">Find camps near you</Link>
                </div>
            </div>

            {/* Ready to Help Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl shadow border">
                <h3 className="text-lg font-semibold mb-4">Ready to Help?</h3>
                <p className="text-sm text-gray-600 mb-4">Start your blood donation journey today</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link to="/donate"><Button variant="outline" className="w-full">Donate Blood</Button></Link>
                    <Link to="/findBlood"><Button variant="outline" className="w-full">Find Blood Banks</Button></Link>
                    <Link to="/donationCamps"><Button variant="outline" className="w-full">Donation Camps</Button></Link>
                </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow border">
                <h3 className="text-lg font-semibold mb-4">Did You Know?</h3>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
                    <li>One blood donation can save up to <strong>3 lives</strong></li>
                    <li>Every <strong>2 seconds</strong> someone needs blood</li>
                    <li>Only <strong>3%</strong> of eligible people donate blood</li>
                    <li>Type O negative is the <strong>universal donor</strong></li>
                </ul>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
