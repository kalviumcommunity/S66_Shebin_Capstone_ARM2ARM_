import React, { useEffect, useState } from 'react'
import axios from "axios";
import Sidebar from "../components/sideBar";
import TopNavBar from "../components/navbar";
import { MapPin, Search,CalendarIcon} from "lucide-react";
import Dates from "../components/date"
import NewDonationCamp from "../components/newCamp"
import VerticalOptionsMenu from "../components/MoreVertical"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import EditCamp from "../components/EditCamp"
import { useUser } from '@clerk/clerk-react';

function formatDate(date) {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

const DonationCamps = () => {
    const { user } = useUser();
    const [locationFilter, setLocationFilter] = useState('');
    const [campData, setCampData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editCamp, setEditCamp] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleSearch = () => {
        const location = locationFilter.toLowerCase()
        const filtered = campData.filter(item =>
            (!location || item.location.toLowerCase().includes(location))
        );
        setFilteredData(filtered);
    };

    const fetchData=async()=>{
        try {
            const response=await axios.get(`${API_BASE_URL}/donationCamps`)
            setLoading(true);
            const allData = response.data.data;
            setCampData(allData)
            setFilteredData(allData)
        } catch (error) {
            console.error("Failed to fetch camps", err);
            setError("Something went wrong while fetching donation camps.");
        }finally {
            setLoading(false); 
        }
    }
    
    useEffect(()=>{
        fetchData()
    },[])

    const handleEdit = (camp) => {
        setEditCamp(camp);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (campId) => {
        try {
            await axios.delete(`${API_BASE_URL}/donationCamps/${campId}`);
            fetchData();
        } catch (error) {
            console.error(error);
            alert('Failed to delete camp');
        }
    };


    return (
        <div>
            <TopNavBar/>
            <div className="flex flex-1">
                <Sidebar/>
                <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                <div className='flex items-center justify-between mb-4'>
                    <div>
                    <h1 className="text-2xl font-bold py-1">Blood Donation Camps</h1>
                    <p className="text-gray-500 mb-4">Find and register for upcoming blood donation camps near you.</p>
                    </div>
                    <NewDonationCamp onSubmit={fetchData}/>
                </div>

                    <div className="p-4 bg-white rounded-lg shadow">
                        <div className="flex flex-wrap items-center gap-4 mb-2">
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

                            <div className='flex flex-col w-90'>
                                <label className="text-sm text-gray-600 mb-1">Sort By</label>
                                    <Dates/>
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

                    {/* Results */}
                    <div className='flex flex-col py-10 h-20'>
                        <h2 className="text-lg font-semibold">Results</h2>
                        {loading ? (
                            <p className="text-gray-500">Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : filteredData.length === 0 ? (
                            <p className="text-gray-500">No Camps Data Found</p>
                        ) :(
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                            {filteredData.map((camp) => (
                                <div key={camp._id} className="p-4 bg-white rounded shadow border-l-4 border-red-500 cursor-pointer relative min-h-[200px] overflow-visible">
                                    <h3 className="text-lg font-bold">{camp.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                        <span className="font-medium">{camp.organization}</span>
                                        <span className="px-2 py-0.5 bg-gray-200 text-gray-800 rounded-full text-xs font-semibold">{camp.requested_type}</span>
                                    </div>
                        
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-700 my-2">
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="w-4 h-4 text-red-500" />
                                            <div>
                                                <div className="font-semibold">Date</div>
                                                <div>{formatDate(new Date(camp.startDate))} - {formatDate(new Date(camp.endDate))}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="w-4 h-4 text-red-500" />
                                            <div>
                                                <div className="font-semibold">Time</div>
                                                <div>{camp.startTime} - {camp.endTime}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            <div>
                                                <div className="font-semibold">Location</div>
                                                <div>{camp.location}</div>
                                            </div>
                                        </div>
                                    </div>
                        
                                    {user && camp.createdBy === user.id && (
                                        <div className="absolute top-2 right-2 z-10">
                                            <VerticalOptionsMenu
                                                onEdit={() => handleEdit(camp)}
                                                onDelete={() => handleDelete(camp._id)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        )}
                    </div>

                </div>
            </div>
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    {editCamp && (
                        <EditCamp
                            camp={editCamp}
                            onSubmit={() => {
                                setIsEditModalOpen(false);
                                fetchData();
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
        )
}

export default DonationCamps
