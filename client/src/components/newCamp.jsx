import React, { useState } from 'react';
import axios from "axios";
import { CirclePlus } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Dates from "./date";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import dayjs from "dayjs";
import { TimePicker } from 'antd';
import { useUser } from '@clerk/clerk-react';

const format = 'h:mm A';

const NewDonationCamp = ({ onSubmit = (formData) => console.log("Submitted:", formData) }) => {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        requested_type: "",
        name: "",
        organization: "",
        startDate: new Date(),
        endDate: new Date(),
        startTime: dayjs(),
        endTime: dayjs(),
        location: "",
        contactNumber: "",
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
        const payload = {
            ...formData,
            startDate: formData.startDate?.toISOString(),
            endDate: formData.endDate?.toISOString(),
            startTime: formData.startTime?.format("HH:mm"),
            endTime: formData.endTime?.format("HH:mm"),
            createdBy: user.id
        };
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const response = await axios.post(`${API_BASE_URL}/donationCamps`, payload);
        console.log("Request submitted:", response.data);
        alert("Request submitted successfully");
        onSubmit();
        } catch (error) {
        console.error(error);
        alert("Failed to submit request");
        }
    };

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button className="bg-[#E53E3E] hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow">
            <CirclePlus className="mr-2" />
            New Donation Camp
            </Button>
        </DialogTrigger>

        <DialogContent className="max-w-[90vw] sm:max-w-[520px] rounded-2xl p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
            <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600 text-center">
                Create New Donation Camp
            </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 sm:gap-5 py-4">
            {/* Requested Type */}
            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Requested Type</Label>
                <Select onValueChange={(val) => handleChange("requested_type", val)}>
                <SelectTrigger className="rounded-md">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Hospital">Hospital</SelectItem>
                    <SelectItem value="NGO">NGO</SelectItem>
                    <SelectItem value="Educational Institution">Educational Institution</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                </SelectContent>
                </Select>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Name</Label>
                <Input placeholder="Enter name" onChange={(e) => handleChange("name", e.target.value)} />
            </div>

            {/* Organization */}
            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Organization Name</Label>
                <Input placeholder="Enter organization" onChange={(e) => handleChange("organization", e.target.value)} />
            </div>

            {/* Dates */}
            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Start Date</Label>
                <Dates
                label="Select start date"
                value={formData.startDate}
                onChange={(date) => handleChange("startDate", date)}
                />
            </div>

            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">End Date</Label>
                <Dates
                label="Select end date"
                value={formData.endDate}
                onChange={(date) => handleChange("endDate", date)}
                />
            </div>

            {/* Time Picker */}
            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Time</Label>
                <TimePicker.RangePicker
                format={format}
                use12Hours
                minuteStep={5}
                className="w-full"
                getPopupContainer={(trigger) => trigger.parentNode}
                onChange={(values) => {
                    if (values) {
                    const [start, end] = values;
                    handleChange("startTime", start);
                    handleChange("endTime", end);
                    }
                }}
                />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Location</Label>
                <Input placeholder="Enter location" onChange={(e) => handleChange("location", e.target.value)} />
            </div>

            {/* Contact Number */}
            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Contact Number</Label>
                <Input
                type="number"
                placeholder="Enter contact number"
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                />
            </div>
            </div>

            <DialogFooter>
            <Button
                onClick={handleSubmit}
                className="w-full bg-red-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md"
            >
                Submit Request
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
};

export default NewDonationCamp;