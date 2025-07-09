import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Filter, Map, Users2, Droplet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import Sidebar from "../components/sideBar";
import TopNavBar from "../components/navbar";
import RequestDetails from "../components/requestDetails";

const Findblood = () => {
  const [donors, setDonors] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [filteredBloodBanks, setFilteredBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bloodTypeFilter, setBloodTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerTitleRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const findBloodResponse = await axios.get(`${API_BASE_URL}/findBlood`);
        const findBloodData = findBloodResponse.data.data;

        const userResponse = await axios.get(`${API_BASE_URL}/user`);
        const userData = userResponse.data; 

        const findBloodDonors = findBloodData.filter(item => item.requested_type === "Donor");
        const findBloodBloodBanks = findBloodData.filter(item => item.requested_type === "Blood-Banks");

        const userDonors = userData.filter(user => user.requested_type === "Donor");
        const userBloodBanks = userData.filter(user => user.requested_type === "Blood-Banks");

        const allDonors = [...findBloodDonors, ...userDonors];
        const allBloodBanks = [...findBloodBloodBanks, ...userBloodBanks];

        setDonors(allDonors);
        setBloodBanks(allBloodBanks);
        setFilteredDonors(allDonors);
        setFilteredBloodBanks(allBloodBanks);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch Details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const bloodType = bloodTypeFilter.toLowerCase();
    const location = locationFilter.toLowerCase();

    const filtered = (item) =>
      (!bloodType || item.bloodType.toLowerCase() === bloodType) &&
      (!location || item.location.toLowerCase().includes(location));

    setFilteredDonors(donors.filter(filtered));
    setFilteredBloodBanks(bloodBanks.filter(filtered));
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    if (isDrawerOpen && drawerTitleRef.current) {
      drawerTitleRef.current.focus({ preventScroll: true });
    }
  }, [isDrawerOpen]);

  return (
    <div>
      <TopNavBar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <h1 className="text-2xl font-bold py-1">Find Blood</h1>
          <p className="text-gray-500 mb-4">
            Search for available blood donations or requests near you
          </p>

          <div className="p-4 h-40 bg-white rounded-lg shadow">
            <div className="flex flex-wrap items-center gap-4 mb-2">
              {/* Blood Type */}
              <div className="flex flex-col w-70">
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
              <div className="flex flex-col w-70">
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

              {/* Urgency */}
              <div className="flex flex-col w-70">
                <label className="text-sm text-gray-600 mb-1">Sort By</label>
                <Select>
                  <SelectTrigger className="w-full border border-gray-400 px-3 py-2 text-sm rounded">
                    <SelectValue placeholder="Urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="mt-6 flex justify-center">
                <button
                  className="w-60 bg-[#E53E3E] text-white px-6 py-2 rounded text-sm flex items-center justify-center gap-2 hover:bg-red-700 transition"
                  onClick={handleSearch}
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-sm text-gray-600 mt-2 px-1 h-20">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Showing {filteredDonors.length + filteredBloodBanks.length} results
              </div>
              <div className="flex items-center gap-1 text-red-600 cursor-pointer hover:underline">
                <Map className="w-4 h-4" />
                View Map
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex flex-col py-10 h-20">
            <h2 className="text-lg font-semibold">Results</h2>
            <Tabs defaultValue="donors" className="h-10">
              <div className="w-full flex justify-end">
                <TabsList className="bg-gray-100 rounded-full justify-end flex items-center p-1 space-x-1">
                  <TabsTrigger
                    value="donors"
                    className="flex items-center px-4 py-2 rounded-full text-sm font-medium transition data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow text-gray-600 hover:bg-gray-200"
                  >
                    <Users2 size={16} className="mr-2" />
                    Donors
                  </TabsTrigger>
                  <TabsTrigger
                    value="blood-banks"
                    className="flex items-center px-4 py-2 rounded-full text-sm font-medium transition data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow text-gray-600 hover:bg-gray-200"
                  >
                    <Droplet size={16} className="mr-2" />
                    Blood Banks
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="donors">
                {loading ? (
                  <p className="text-gray-500">Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : filteredDonors.length === 0 ? (
                  <p className="text-gray-500">No donors found.</p>
                ) : (
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredDonors.map((donor) => (
                      <div
                        key={donor._id}
                        className="p-4 bg-white rounded shadow border-l-4 border-red-500 cursor-pointer"
                        onClick={() => handleCardClick(donor)}
                      >
                        <h3 className="font-bold text-lg">{donor.name}</h3>
                        <p className="text-sm text-gray-600">
                          Blood Type: <span className="font-medium">{donor.bloodType}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Contact: <span className="font-medium">{donor.contactNumber}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Location: <span className="font-medium">{donor.location}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="blood-banks">
                {loading ? (
                  <p className="text-gray-500">Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : filteredBloodBanks.length === 0 ? (
                  <p className="text-gray-500">No blood banks found.</p>
                ) : (
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredBloodBanks.map((bank) => (
                      <div
                        key={bank._id}
                        className="p-4 bg-white rounded shadow border-l-4 border-red-500 cursor-pointer"
                        onClick={() => handleCardClick(bank)}
                      >
                        <h3 className="font-bold text-lg">{bank.name}</h3>
                        <p className="text-sm text-gray-600">
                          Blood Type: <span className="font-medium">{bank.bloodType}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Contact: <span className="font-medium">{bank.contactNumber}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Location: <span className="font-medium">{bank.location}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Drawer for Details */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
            <DrawerContent>
              {selectedItem && <RequestDetails item={selectedItem} />}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Findblood;