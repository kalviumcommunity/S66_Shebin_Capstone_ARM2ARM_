import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@clerk/clerk-react";
import Header from "../../components/Header";
import Sidebar from "../../components/sideBar";
import TopNavBar from "../../components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ProfilePage = () => {
    const { user, isLoaded } = useUser(); 

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        requested_type: "",
        contactNumber: "",
        age: "",
        location: "",
        weight: "",
        bloodType: "",
    });
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const fetchUserProfile = async (contactFromClerk = "") => {
        try {
            if (!user || !user.primaryEmailAddress?.emailAddress) {
                throw new Error("User email not available. Please ensure you are logged in.");
            }

            const email = user.primaryEmailAddress.emailAddress;
            const res = await axios.get("http://localhost:9000/user", { params: { email } });

            if (res.data) {
                setFormData((prev) => ({
                    ...prev,
                    ...res.data,
                    contactNumber: res.data.contactNumber || contactFromClerk,
                    requested_type: res.data.requested_type || "",
                }));
                setUserId(res.data._id);
            }
        } catch (err) {
            console.error("Error fetching user profile:", err);
            setError(err.response?.data?.error || err.message || "Failed to fetch user profile.");
        }
    };

    useEffect(() => {
        if (isLoaded && user) {
            const email = user.primaryEmailAddress?.emailAddress || "";
            const contact = user.primaryPhoneNumber?.phoneNumber || "";
            const name = user.fullName || "";

            setFormData((prev) => ({
                ...prev,
                name,
                email,
                contactNumber: contact,
            }));

            if (email) {
                fetchUserProfile(contact);
            } else {
                setError("User email not found. Please ensure you are logged in.");
            }

            // Update userType in unsafeMetadata instead of publicMetadata
            if (!user.unsafeMetadata?.userType) {
                user.update({
                    unsafeMetadata: { userType: "donor" },
                }).catch((err) => {
                    console.error("Error updating unsafeMetadata:", err);
                    setError("Failed to set user type. Please try again.");
                });
            }
        }
    }, [user, isLoaded]);

    const handleSubmit = async () => {
        try {
            if (userId) {
                await axios.put(`http://localhost:9000/user/${userId}`, formData);
                alert("Profile updated successfully!");
            } else {
                const res = await axios.post("http://localhost:9000/user/ProfileData", formData);
                setUserId(res.data.userId);
                alert("Profile created successfully!");
            }
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to save profile. Please try again.");
        }
    };

    const showAgeWeight = formData.requested_type === "Donor" || formData.requested_type === "Recipient";
    const showBloodType = formData.requested_type === "Donor" || formData.requested_type === "Blood-Banks";

    return (
        <div>
            <TopNavBar />
            <div className="flex flex-1">
                <Sidebar />
                <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
                    <Header title="Profile" subtitle="View & Edit your profile" />

                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl mx-auto mt-6">
                        <div className="flex flex-col items-center mb-8">
                            <img
                                src={user?.imageUrl}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-red-500 shadow-md"
                            />
                            <h2 className="mt-4 text-2xl font-bold text-gray-800">{formData.name || "Unnamed"}</h2>
                            <p className="text-gray-500 text-sm">{formData.email}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                ["Name", "name"],
                                ["Email", "email"],
                                ["Contact Number", "contactNumber"],
                                ["Address", "location"],
                            ].map(([labelText, field]) => (
                                <div key={field}>
                                    <Label className="text-gray-700 font-medium mb-1 block">{labelText}</Label>
                                    <Input
                                        type="text"
                                        value={formData[field] || ""}
                                        onChange={(e) => handleChange(field, e.target.value)}
                                        disabled={field === "email"}
                                        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 w-full"
                                    />
                                </div>
                            ))}

                            {showBloodType && (
                                <div>
                                    <Label className="text-gray-700 font-medium mb-1 block">Blood Type</Label>
                                    <Select
                                        value={formData.bloodType}
                                        onValueChange={(value) => handleChange("bloodType", value)}
                                    >
                                        <SelectTrigger className="w-full border border-gray-300 px-3 py-2 text-sm rounded">
                                            <SelectValue placeholder="Select Blood Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="A+">A+</SelectItem>
                                            <SelectItem value="A-">A-</SelectItem>
                                            <SelectItem value="B+">B+</SelectItem>
                                            <SelectItem value="B-">B-</SelectItem>
                                            <SelectItem value="AB+">AB+</SelectItem>
                                            <SelectItem value="AB-">AB-</SelectItem>
                                            <SelectItem value="O+">O+</SelectItem>
                                            <SelectItem value="O-">O-</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            {showAgeWeight && (
                                <>
                                    <div>
                                        <Label className="text-gray-700 font-medium mb-1 block">Age</Label>
                                        <Input
                                            type="text"
                                            value={formData.age || ""}
                                            onChange={(e) => handleChange("age", e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 w-full"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-gray-700 font-medium mb-1 block">Weight (kg)</Label>
                                        <Input
                                            type="text"
                                            value={formData.weight || ""}
                                            onChange={(e) => handleChange("weight", e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 w-full"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mt-6">
                            <Label className="text-gray-700 font-medium mb-1 block">I want to be a</Label>
                            <div className="flex flex-col w-full md:w-1/2">
                                <Select
                                    value={formData.requested_type}
                                    onValueChange={(value) => handleChange("requested_type", value)}
                                >
                                    <SelectTrigger className="w-full border border-gray-400 px-3 py-2 text-sm rounded">
                                        <SelectValue placeholder="Select User" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Donor">Donor</SelectItem>
                                        <SelectItem value="Blood-Banks">Blood Bank</SelectItem>
                                        <SelectItem value="Hospital">Hospital</SelectItem>
                                        <SelectItem value="Recipient">Recipient</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Button
                                className="w-full bg-red-600 hover:bg-red-700 text-white text-base font-semibold py-3 rounded-xl"
                                onClick={handleSubmit}
                            >
                                {userId ? "Update Profile" : "Create Profile"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;