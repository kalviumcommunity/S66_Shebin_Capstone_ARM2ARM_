import React, { useEffect, useState } from 'react'
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search,Users2,Hospital} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import Sidebar from "../components/sideBar";
import TopNavBar from "../components/navbar";
import RequestDetails from "../components/requestDetails";


const Donate = () => {
  const [hospitals,setHospitals]=useState([])
  const [recipients,setRecipients]=useState([])
  const [filteredHospital, setFilteredHospital] = useState([]);
  const [filteredRecipients, setFilteredRecipients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bloodTypeFilter, setBloodTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  

  useEffect(()=>{
    const fetchRequest=async()=>{
      try {
        const response=await axios.get("http://localhost:9000/BloodRequest")
        const reqData=response.data.data
  
        const hospitalData=reqData.filter((item)=>item.requested_type ==="Hospital")
        const recipientData=reqData.filter((item)=>item.requested_type ==="Recipient")
  
        setHospitals(hospitalData)
        setRecipients(recipientData)
        setFilteredHospital(hospitalData)
        setFilteredRecipients(recipientData)
      } catch (error) {
          console.error(error);
          setError("Failed to fetch blood requests.");
      }finally {
        setLoading(false);
      }
    }
    fetchRequest()
  },[])

  const handleSearch=()=>{
    const bloodType=bloodTypeFilter.toLowerCase()
    const location=locationFilter.toLowerCase()

    const filtered = (item) =>
      (!bloodType || item.bloodType.toLowerCase() === bloodType) &&
      (!location || item.location.toLowerCase().includes(location));

      setFilteredHospital(hospitals.filter(filtered))
      setFilteredRecipients(recipients.filter(filtered))
  }
  
  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };
    

  return (
    <div className="h-screen flex flex-col py-2">
      <TopNavBar/>
      <div className="flex flex-1">
        <Sidebar/>
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <h1 className="text-2xl font-bold py-1">Donate Blood</h1>
          <p className="text-gray-500 mb-4">Your Donation Information</p>

          <div className='p-4  bg-white rounded-lg shadow'>
            {/*All inputs and search buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-2 ">
                {/* Blood Type */}
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

                {/* Location */}
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

                {/* Search Button */}
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

          {/* Requests */}
          <div className='flex flex-col py-10 h-20'>
            <h2 className='text-lg font-semibold'>Donation Request</h2>
            <Tabs defaultValue="hospital" className="h-10">
              <div className="w-full flex justify-end">
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
                  <p className="text-gray-500">No Hospital requsts found.</p>
                ) : (
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredHospital.map((request) => (
                      <div
                        key={request._id}
                        className="p-4 bg-white rounded shadow border-l-4 border-red-500 cursor-pointer"
                        onClick={() => handleCardClick(request)}
                      >
                        <h3 className="font-bold text-lg">{request.name}</h3>
                        <p className="text-sm text-gray-600">
                          Blood Type: <span className="font-medium">{request.bloodType}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Contact: <span className="font-medium">{request.contactNumber}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Location: <span className="font-medium">{request.location}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Needed: <span className="font-medium">{request.units} units</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{request.status}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{dayjs(request.createdAt).fromNow()}</span>
                        </p>

                      </div>
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
                    {filteredRecipients.map((requests) => (
                      <div
                        key={requests._id}
                        className="p-4 bg-white rounded shadow border-l-4 border-red-500 cursor-pointer"
                        onClick={() => handleCardClick(requests)}
                      >
                        <h3 className="font-bold text-lg">{requests.name}</h3>
                        <p className="text-sm text-gray-600">
                          Blood Type: <span className="font-medium">{requests.bloodType}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Contact: <span className="font-medium">{requests.contactNumber}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Location: <span className="font-medium">{requests.location}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Needed: <span className="font-medium">{requests.units} units</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{requests.status}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{dayjs(requests.createdAt).fromNow()}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Drawer */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
            <DrawerContent>
              {selectedItem && <RequestDetails item={selectedItem} />}
            </DrawerContent>
          </Drawer>
          
        </div>
      </div>
    </div>
  )
}

export default Donate
