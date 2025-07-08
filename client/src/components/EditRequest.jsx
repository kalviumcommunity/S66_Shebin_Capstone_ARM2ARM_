import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const EditRequest = ({ request, onSubmit }) => {
    const [formData, setFormData] = useState(request);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpdate = async () => {
        try {
        await axios.put(`http://localhost:9000/BloodRequest/${request._id}`, formData);
        alert('Request updated successfully');
        onSubmit();
        } catch (error) {
        console.error(error);
        alert('Failed to update request');
        }
    };

    return (
        <div className="grid gap-5 py-4">
        <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Requested Type</Label>
            <Select value={formData.requested_type} onValueChange={(val) => handleChange("requested_type", val)}>
            <SelectTrigger className="rounded-md">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Hospital">Hospital</SelectItem>
                <SelectItem value="Recipient">Recipients</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Name</Label>
            <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Contact Number</Label>
            <Input type="number" value={formData.contactNumber} onChange={(e) => handleChange("contactNumber", e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Blood Type</Label>
            <Select value={formData.bloodType} onValueChange={(val) => handleChange("bloodType", val)}>
            <SelectTrigger className="rounded-md">
                <SelectValue />
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
            <Input value={formData.location} onChange={(e) => handleChange("location", e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Units Required</Label>
            <Input type="number" value={formData.units} onChange={(e) => handleChange("units", e.target.value)} />
        </div>

        <div className="flex flex-col gap-1">
            <Label className="text-sm font-medium">Urgency Status</Label>
            <Select value={formData.status} onValueChange={(val) => handleChange("status", val)}>
            <SelectTrigger className="rounded-md">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <Button onClick={handleUpdate} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md">
            Update Request
        </Button>
        </div>
    );
};

export default EditRequest;