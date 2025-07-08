// import React from 'react'
// import Header from '../../components/Header'
// import { UserProfile } from '@clerk/clerk-react'


// const HospitalProfile = () => {

//     return (
//         <>
//             <Header title="Profile" subtitle="View your profile" />
//                 <UserProfile
//                     path='/hospitalprofile'
//                     routing='path'
//                     appearance={{
//                         elements:{
//                             scrollBox:"bg-customgreys-darkGrey",
//                             navbar: "bg-transparent shadow-none"
//                         }
//                     }}
//                 />
//             </>
//     )
// }

// export default HospitalProfile


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { useUser } from "@clerk/clerk-react";
// import Header from "../../components/Header";
// import Sidebar from "../../components/sideBar";
// import TopNavBar from "../../components/navbar";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";

// const ProfilePage = () => {
//     const { user } = useUser();

//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         requested_type: "",
//         contactNumber: "",
//         age: "",
//         location: "",
//         weight: "",
//         bloodType: "",
//     });

//     const [userId, setUserId] = useState(null);

//     const handleChange = (field, value) => {
//         setFormData((prev) => ({ ...prev, [field]: value }));
//     };

//     const fetchUserProfile = async (contactFromClerk = "") => {
//         try {
//         const email = user?.primaryEmailAddress?.emailAddress;
//         const res = await axios.get("http://localhost:9000/user", {params: { email }});

//         if (res.data) {
//             setFormData((prev) => ({
//             ...prev,...res.data,
//             contactNumber: res.data.contactNumber || contactFromClerk,
//             requested_type: res.data.requested_type || "" }));
//             setUserId(res.data._id);
//         }
//         } catch (err) {
//         console.log("User not found in DB, might be a new user.");
//         }
//     };

//     useEffect(() => {
//         if (user) {
//         const email = user.primaryEmailAddress?.emailAddress || "";
//         const contact = user.primaryPhoneNumber?.phoneNumber || "";
//         const name = user.fullName || "";

//         setFormData((prev) => ({
//             ...prev,
//             name,email,contactNumber: contact,
//         }));

//         fetchUserProfile(contact);

//         if (!user.publicMetadata?.userType) {
//             user.update({
//             publicMetadata: { userType: "donor" },
//             });
//         }}}, [user]);

//     const handleSubmit = async () => {
//         try {
//         if (userId) {
//             await axios.put(`http://localhost:9000/user/${userId}`, formData);
//             alert("Profile updated successfully!");
//         } else {
//             const res = await axios.post("http://localhost:9000/user/ProfileData", formData);
//             setUserId(res.data.userId);
//             alert("Profile created successfully!");
//         }
//         } catch (err) {
//         console.error(err);
//         alert("Something went wrong");
//         }
//     };

//     const showAgeWeight = formData.requested_type === "Donor" || formData.requested_type === "Recipient";
//     const showBloodType = formData.requested_type === "Donor" || formData.requested_type === "Blood-Banks";

//     return (
//         <div>
//         <TopNavBar />
//         <div className="flex flex-1">
//             <Sidebar />
//             <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
//             <Header title="Profile" subtitle="View & Edit your profile" />

//             <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl mx-auto mt-6">
//                 <div className="flex flex-col items-center mb-8">
//                 <img
//                     src={user?.imageUrl}
//                     alt="Profile"
//                     className="w-24 h-24 rounded-full border-4 border-red-500 shadow-md"
//                 />
//                 <h2 className="mt-4 text-2xl font-bold text-gray-800">{formData.name || "Unnamed"}</h2>
//                 <p className="text-gray-500 text-sm">{formData.email}</p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {[
//                     ["Name", "name"],
//                     ["Email", "email"],
//                     ["Contact Number", "contactNumber"],
//                     ["Address", "location"],
//                 ].map(([labelText, field]) => (
//                     <div key={field}>
//                     <Label className="text-gray-700 font-medium mb-1 block">{labelText}</Label>
//                     <Input
//                         type="text"
//                         value={formData[field] || ""}
//                         onChange={(e) => handleChange(field, e.target.value)}
//                         disabled={field === "email"}
//                         className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 w-full"
//                     />
//                     </div>
//                 ))}

//                 {/* Conditionally Render Blood Type */}
//                 {showBloodType && (
//                     <div>
//                     <Label className="text-gray-700 font-medium mb-1 block">Blood Type</Label>
//                     <Select
//                         value={formData.bloodType}
//                         onValueChange={(value) => handleChange("bloodType", value)}
//                     >
//                         <SelectTrigger className="w-full border border-gray-300 px-3 py-2 text-sm rounded">
//                         <SelectValue placeholder="Select Blood Type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                         <SelectItem value="A+">A+</SelectItem>
//                         <SelectItem value="A-">A-</SelectItem>
//                         <SelectItem value="B+">B+</SelectItem>
//                         <SelectItem value="B-">B-</SelectItem>
//                         <SelectItem value="AB+">AB+</SelectItem>
//                         <SelectItem value="AB-">AB-</SelectItem>
//                         <SelectItem value="O+">O+</SelectItem>
//                         <SelectItem value="O-">O-</SelectItem>
//                         </SelectContent>
//                     </Select>
//                     </div>
//                 )}

//                 {/* Conditionally Render Age & Weight */}
//                 {showAgeWeight && (
//                     <>
//                     <div>
//                         <Label className="text-gray-700 font-medium mb-1 block">Age</Label>
//                         <Input
//                         type="text"
//                         value={formData.age || ""}
//                         onChange={(e) => handleChange("age", e.target.value)}
//                         className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 w-full"
//                         />
//                     </div>
//                     <div>
//                         <Label className="text-gray-700 font-medium mb-1 block">Weight (kg)</Label>
//                         <Input
//                         type="text"
//                         value={formData.weight || ""}
//                         onChange={(e) => handleChange("weight", e.target.value)}
//                         className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 w-full"
//                         />
//                     </div>
//                     </>
//                 )}
//                 </div>

//                 <div className="mt-6">
//                 <Label className="text-gray-700 font-medium mb-1 block">I want to be a</Label>
//                 <div className="flex flex-col w-full md:w-1/2">
//                     <Select
//                     value={formData.requested_type}
//                     onValueChange={(value) => handleChange("requested_type", value)}
//                     >
//                     <SelectTrigger className="w-full border border-gray-400 px-3 py-2 text-sm rounded">
//                         <SelectValue placeholder="Select User" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="Donor">Donor</SelectItem>
//                         <SelectItem value="Blood-Banks">Blood Bank</SelectItem>
//                         <SelectItem value="Hospital">Hospital</SelectItem>
//                         <SelectItem value="Recipient">Recipient</SelectItem>
//                     </SelectContent>
//                     </Select>
//                 </div>
//                 </div>

//                 <div className="mt-10">
//                 <Button
//                     className="w-full bg-red-600 hover:bg-red-700 text-white text-base font-semibold py-3 rounded-xl"
//                     onClick={handleSubmit}
//                 >
//                     {userId ? "Update Profile" : "Create Profile"}
//                 </Button>
//                 </div>
//             </div>
//             </div>
//         </div>
//         </div>
//     );
// };

// export default ProfilePage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import {Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle,DialogDescription} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Search, Users2, Hospital } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import Sidebar from '../components/sideBar';
import TopNavBar from '../components/navbar';
import RequestDetails from '../components/requestDetails';
import NewRequest from "../components/newRequest"
import VerticalOptionsMenu from "../components/MoreVertical"


const RequestCard = ({ request, onClick, onEditRequest, onDeleteRequest, refreshRequests }) => {
  const { user } = useUser(); 
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState(request);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Critical':
        return 'bg-red-700 text-white';
      case 'High':
        return 'bg-orange-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-white';
      case 'Low':
        return 'bg-green-700 text-white';
      default:
        return 'bg-gray-700 text-white';
    }
  };

  const isCreator = user?.id === request.createdBy;

  const handleChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:9000/BloodRequest/${request._id}`, editForm);
      alert("Request updated successfully");
      setIsEditOpen(false);
      refreshRequests(); 
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };
  

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/BloodRequest/${request._id}`);
      onDeleteRequest();
      refreshRequests(); 
    } catch (err) {
      alert("Failed to delete request");
    }
  };


  return (
    <div
      key={request._id}
      className="relative p-4 bg-white rounded-lg shadow-md cursor-pointer"
      onClick={() => onClick(request)}
    >
    {/* Top Section */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-red-600 font-bold text-lg mr-2">{request.bloodType}</span>
          <h3 className="font-bold text-lg text-gray-800">{request.name}</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${getStatusClass(request.status)}`}>
          {request.status}
        </span>
      </div>

      <div className="flex items-center mb-2 text-sm text-gray-600">
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-2.209 0-4 1.791-4 4v1h8v-1c0-2.209-1.791-4-4-4z"
          ></path>
        </svg>
        <span>{request.location}</span>
        <span className="mx-1">•</span>
        <span>{dayjs(request.createdAt).fromNow()}</span>
      </div>

      <p className="text-sm text-red-500 mb-2">Needed: {request.units} units</p>
      <p className="text-sm text-gray-600">
        Contact: <span className="font-medium">{request.contactNumber}</span>
      </p>


      
      {isCreator && (
        <div className="absolute bottom-2 right-2 z-10">
          <VerticalOptionsMenu
            onEdit={(e) => {
              e.stopPropagation();
              setIsEditOpen(true);
            }}
            onDelete={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          />
        </div>
      )}

<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Edit Request</DialogTitle>
            <DialogDescription>Edit and update the blood request details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {["name", "contactNumber", "location", "units"].map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                <Input value={editForm[field]} onChange={(e) => handleChange(field, e.target.value)} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={handleUpdate} className="bg-red-600 hover:bg-red-700 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>

    );
  };

const Donate = () => {
  const [hospitals, setHospitals] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [filteredHospital, setFilteredHospital] = useState([]);
  const [filteredRecipients, setFilteredRecipients] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bloodTypeFilter, setBloodTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  
    const fetchRequest = async () => {
      try {
        const response = await axios.get('http://localhost:9000/BloodRequest');
        const reqData = response.data.data;

        const hospitalData = reqData.filter((item) => item.requested_type === 'Hospital');
        const recipientData = reqData.filter((item) => item.requested_type === 'Recipient');

        setHospitals(hospitalData);
        setRecipients(recipientData);
        setFilteredHospital(hospitalData);
        setFilteredRecipients(recipientData);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch blood requests.');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchRequest();
      }, []);
      

  const handleSearch = () => {
    const bloodType = bloodTypeFilter.toLowerCase();
    const location = locationFilter.toLowerCase();

    const filtered = (item) =>
      (!bloodType || item.bloodType.toLowerCase() === bloodType) &&
      (!location || item.location.toLowerCase().includes(location)) &&

    setFilteredHospital(hospitals.filter(filtered));
    setFilteredRecipients(recipients.filter(filtered));
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  return (
    <div>
      <TopNavBar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h1 className="text-2xl font-bold py-1">Donate Blood</h1>
              <p className="text-gray-500 mb-4">Your Donation Information</p>
            </div>
            <NewRequest onSubmit={fetchRequest} />
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex flex-wrap items-center gap-4 mb-2">
              <div className="flex flex-col w-90">
                <label className="text-sm text-gray-600 mb-1">Blood Type</label>
                <Select onValueChange={(value) => setBloodTypeFilter(value)}>
                  <SelectTrigger className="w-full border border-gray-400 px-3 py-2 text-sm rounded">
                    <SelectValue placeholder="Select blood type" />
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

              <div className="flex flex-col w-90">
                <label className="text-sm text-gray-600 mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="pl-10 border border-gray-400 rounded px-3 py-2 text-sm w-full"
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  className="w-80 bg-[#E53E3E] text-white px-6 py-2 rounded text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition"
                  onClick={handleSearch}
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col py-10 h-20">
            <h2 className="text-lg font-semibold">Donation Request</h2>
            <Tabs defaultValue="hospital" className="h-10">
              <div className="w-full flex items-center justify-between gap-x-4 my-4">
                <div className="flex flex-col w-90 ">
                  <Select
                    onValueChange={(value) => {
                      setStatusFilter(value);
                      const filteredHospitals = hospitals.filter((item) => !value || item.status === value);
                      const filteredRecipients = recipients.filter((item) => !value || item.status === value);
                      setFilteredHospital(filteredHospitals);
                      setFilteredRecipients(filteredRecipients);
                    }}
                  >
                    <SelectTrigger className="w-35 border border-gray-400 px-3 py-2 text-sm rounded-lg">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <TabsList className="bg-gray-100 rounded-full justify-end flex items-center p-1 space-x-1">
                  <TabsTrigger
                    value="hospital"
                    className="flex items-center px-4 py-2 rounded-full text-sm font-medium transition data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow text-gray-600 hover:bg-gray-200"
                  >
                    <Hospital size={16} className="mr-2" />
                    Hospital
                  </TabsTrigger>
                  <TabsTrigger
                    value="recipient"
                    className="flex items-center px-4 py-2 rounded-full text-sm font-medium transition data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow text-gray-600 hover:bg-gray-200"
                  >
                    <Users2 size={16} className="mr-2" />
                    Recipients
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="hospital">
                {loading ? (
                  <p className="text-gray-500">Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : filteredHospital.length === 0 ? (
                  <p className="text-gray-500">No Hospital requests found.</p>
                ) : (
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredHospital.map((request) => (
                      <RequestCard key={request._id} request={request} onClick={handleCardClick} />
                    ))}
                  </div>
                  
                )}
              </TabsContent>

              <TabsContent value="recipient">
                {loading ? (
                  <p className="text-gray-500">Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : filteredRecipients.length === 0 ? (
                  <p className="text-gray-500">No Recipients found.</p>
                ) : (
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredRecipients.map((request) => (
                      <RequestCard key={request._id} request={request} onClick={handleCardClick} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
            <DrawerContent>
              {selectedItem && <RequestDetails item={selectedItem} context="donate"/>}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Donate;
