import React, { useState } from 'react'
import axios from "axios"
import { useUser } from "@clerk/clerk-react";
import { CirclePlus } from 'lucide-react';
import {Dialog,DialogContent,DialogFooter,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from "@/components/ui/select";

const NewRequest = ({ onSubmit = (formData) => console.log("Submitted:", formData) }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    requested_type: "",
    name: "",
    contactNumber: "",
    bloodType: "",
    location: "",
    units: "",
    status: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        createdBy: user.id,
      };
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_BASE_URL}/BloodRequest`, payload);
      console.log("Request submitted:", response.data);
      alert("Request submitted successfully");
      onSubmit()
    } catch (error) {
      console.error(error)
      alert("Failed to submit request");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#E53E3E] hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow flex items-center">
          <CirclePlus className="mr-2" />
          New Request
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-sm sm:max-w-md rounded-2xl p-5">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold text-red-600">
            Create New Blood Request
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Requested Type</Label>
            <Select onValueChange={(val) => handleChange("requested_type", val)}>
              <SelectTrigger className="w-full rounded-md">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hospital">Hospital</SelectItem>
                <SelectItem value="Recipient">Recipient</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Name</Label>
            <Input className="w-full" placeholder="Enter name" onChange={(e) => handleChange("name", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Contact Number</Label>
            <Input
              className="w-full"
              type="number"
              placeholder="Enter contact number"
              onChange={(e) => handleChange("contactNumber", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Blood Type</Label>
            <Select onValueChange={(val) => handleChange("bloodType", val)}>
              <SelectTrigger className="w-full rounded-md">
                <SelectValue placeholder="Select blood type" />
              </SelectTrigger>
              <SelectContent>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Location</Label>
            <Input className="w-full" placeholder="Enter location" onChange={(e) => handleChange("location", e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Units Required</Label>
            <Input
              className="w-full"
              type="number"
              placeholder="Number of units"
              onChange={(e) => handleChange("units", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Urgency Status</Label>
            <Select onValueChange={(val) => handleChange("status", val)}>
              <SelectTrigger className="w-full rounded-md">
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
          >
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default NewRequest;