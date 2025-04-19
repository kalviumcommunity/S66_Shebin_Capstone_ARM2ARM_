import React from 'react';
import { DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MapPin, User, Hospital, Droplet, Tag } from 'lucide-react';

const RequestDetails = ({ item }) => {
  return (
    <div className="p-6 space-y-4">
      {/* Close Button */}
      <div className="flex justify-end">
        <DrawerClose asChild>
          <Button variant="ghost">Close</Button>
        </DrawerClose>
      </div>
      <div className="text-xl font-semibold">Details</div>

      {/* Donor or Blood Bank Information */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {item.requested_type === "Donor" ? (
            <User className="text-red-500" />
          ) : (
            <Hospital className="text-red-500" />
          )}
          <div>
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-500">{item.requested_type}</p>
          </div>
        </div>
        <div className="text-red-600 font-bold text-sm bg-gray-100 px-2 py-1 rounded">
          {item.bloodType}
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-3">
        <MapPin className="text-gray-500 mt-1" />
        <div>
          <p className="text-sm font-medium">Location</p>
          <p className="text-sm text-gray-600">{item.location}</p>
        </div>
      </div>

      {/* Contact */}
      <div className="flex items-start gap-3">
        <User className="text-gray-500 mt-1" />
        <div>
          <p className="text-sm font-medium">Contact</p>
          <p className="text-sm text-gray-700">{item.contactNumber}</p>
        </div>
      </div>

      {/* Needed */}
      <div className="flex items-start gap-3">
        <Droplet className="text-gray-500 mt-1" />
        <div>
          <p className="text-sm font-medium">Needed:</p>
          <p className="text-sm text-gray-700">{item.units} Units</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-start gap-3">
        <Tag className="text-gray-500 mt-1" />
        <div>
          <p className="text-sm font-medium">Status:</p>
          <p className="text-sm text-gray-700">{item.status}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-col gap-3">
        <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold w-full">
          Respond to Request
        </Button>
        <Button variant="outline" className="w-full text-gray-700">
          Contact {item.requested_type === "Donor" ? "Donor" : "Blood Bank"}
        </Button>
      </div>
    </div>
  );
};

export default RequestDetails;