import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Dates from "./date";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import dayjs from "dayjs";
import { TimePicker } from 'antd';

const format = 'h:mm A';

const EditCamp = ({ camp, onSubmit }) => {
    const [formData, setFormData] = useState({
        ...camp,
        startDate: new Date(camp.startDate),
        endDate: new Date(camp.endDate),
        startTime: dayjs(camp.startTime, "HH:mm"),
        endTime: dayjs(camp.endTime, "HH:mm")
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                ...formData,
                startDate: formData.startDate?.toISOString(),
                endDate: formData.endDate?.toISOString(),
                startTime: formData.startTime?.format("HH:mm"),
                endTime: formData.endTime?.format("HH:mm"),
            };
            const API_BASE_URL = import.meta.env.VITE_API_URL;
            await axios.put(`${API_BASE_URL}/donationCamps/${camp._id}`, payload);
            alert('Camp updated successfully');
            onSubmit();
        } catch (error) {
            console.error(error);
            alert('Failed to update camp');
        }
    };

    return (
        <div className="grid gap-5 py-4">
            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Requested Type</Label>
                <Select value={formData.requested_type} onValueChange={(val) => handleChange("requested_type", val)}>
                    <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Hospital">Hospital</SelectItem>
                        <SelectItem value="NGO">NGO</SelectItem>
                        <SelectItem value="Educational Institition">Educational Institition</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="others">others</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Name</Label>
                <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>

            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Organization Name</Label>
                <Input value={formData.organization} onChange={(e) => handleChange("organization", e.target.value)} />
            </div>

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

            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Time</Label>
                <TimePicker.RangePicker
                    format={format}
                    use12Hours
                    minuteStep={5}
                    value={[formData.startTime, formData.endTime]}
                    getPopupContainer={trigger => trigger.parentNode}
                    onChange={(values) => {
                        if (values) {
                            const [start, end] = values;
                            handleChange("startTime", start);
                            handleChange("endTime", end);
                        }
                    }}
                />
            </div>

            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Location</Label>
                <Input value={formData.location} onChange={(e) => handleChange("location", e.target.value)} />
            </div>

            <div className="flex flex-col gap-1">
                <Label className="text-sm font-medium">Contact Number</Label>
                <Input type="number" value={formData.contactNumber} onChange={(e) => handleChange("contactNumber", e.target.value)} />
            </div>

            <Button onClick={handleUpdate} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md">
                Update Camp
            </Button>
        </div>
    );
};

export default EditCamp;