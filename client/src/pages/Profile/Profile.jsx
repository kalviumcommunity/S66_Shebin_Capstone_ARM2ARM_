import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import Header from "../../components/Header";
import Sidebar from "../../components/sideBar";
import TopNavBar from "../../components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const ProfilePage = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    age: "",
    address: "",
    weight: "",
    bloodType: "",
  });

  const [userId, setUserId] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fetchUserProfile = async (contactFromClerk = "") => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      const res = await axios.get("http://localhost:9000/user", {
        params: { email },
      });

      if (res.data) {
        setFormData((prev) => ({
          ...prev,
          ...res.data,
          contactNumber: res.data.contactNumber || contactFromClerk,
        }));
        setUserId(res.data._id);
      }
    } catch (err) {
      console.log("User not found in DB, might be a new user.");
    }
  };

  useEffect(() => {
    if (user) {
      const email = user.primaryEmailAddress?.emailAddress || "";
      const contact = user.primaryPhoneNumber?.phoneNumber || "";
      const name = user.fullName || "";

      setFormData((prev) => ({
        ...prev,
        name,
        email,
        contactNumber: contact,
      }));

      fetchUserProfile(contact);

      // Clerk metadata set only if not set already
      if (!user.publicMetadata?.userType) {
        user.update({
          publicMetadata: { userType: "donor" },
        });
      }
    }
  }, [user]);

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
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <TopNavBar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Header title="Profile" subtitle="View & Edit your profile" />

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
                ["Age", "age"],
                ["Weight (kg)", "weight"],
                ["Address", "address"],
                ["Blood Type", "bloodType"],
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
