import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import { useUser } from '@clerk/clerk-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Search, Users2, Hospital } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "@/components/ui/dialog"
import Sidebar from '../components/sideBar';
import TopNavBar from '../components/navbar';
import RequestDetails from '../components/requestDetails';
import NewRequest from "../components/newRequest";
import EditRequest from "../components/EditRequest";
import { RequestCard } from '../components/RequestCard';

const API_BASE_URL = import.meta.env.VITE_API_URL;


const Donate = () => {
  const { user } = useUser();
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
  const [editRequest, setEditRequest] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchRequest = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/BloodRequest`);
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
      (!location || item.location.toLowerCase().includes(location));

    setFilteredHospital(hospitals.filter(filtered));
    setFilteredRecipients(recipients.filter(filtered));
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  const handleEdit = (request) => {
    setEditRequest(request);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (requestId) => {
    try {
      await axios.delete(`${API_BASE_URL}/BloodRequest/${requestId}`);
      fetchRequest();
    } catch (error) {
      console.error(error);
      alert('Failed to delete request');
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

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
                      <RequestCard
                        key={request._id}
                        request={request}
                        onClick={handleCardClick}
                        onEdit={request.createdBy === user.id ? () => handleEdit(request) : null}
                        onDelete={request.createdBy === user.id ? () => handleDelete(request._id) : null}
                      />
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
                      <RequestCard
                        key={request._id}
                        request={request}
                        onClick={handleCardClick}
                        onEdit={request.createdBy === user.id ? () => handleEdit(request) : null}
                        onDelete={request.createdBy === user.id ? () => handleDelete(request._id) : null}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
            <DrawerContent>
              {selectedItem && <RequestDetails item={selectedItem} context="donate" />}
            </DrawerContent>
          </Drawer>

          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Blood Request</DialogTitle>
                </DialogHeader>
                <DialogDescription>Update the details of your blood request here.</DialogDescription>
              {editRequest && (
                <EditRequest
                  request={editRequest}
                  onSubmit={() => {
                    setIsEditModalOpen(false);
                    fetchRequest();
                  }}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Donate;