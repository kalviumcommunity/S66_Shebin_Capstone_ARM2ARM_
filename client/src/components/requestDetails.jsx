import React from 'react';
import axios from "axios";
import { DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MapPin, User, Hospital, Droplet, Tag } from 'lucide-react';
import {Dialog,DialogTrigger,DialogContent,DialogHeader,DialogTitle,DialogFooter} from "@/components/ui/dialog";


const RequestDetails = ({ item, context}) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const typeDisplay = {
    "Donor": "Donor",
    "Blood-Banks": "Blood Bank",
    "Hospital": "Hospital",
    "Recipient": "Recipient"
  };
  const contactText = typeDisplay[item.requested_type] || item.requested_type;

  const showUnitsAndStatus = ["Hospital", "Recipient"].includes(item.requested_type);

const handleRequestClick=async()=>{
  const message= context==="donate" ? `Hello ${item.name},  I’ve seen your request and I’m available to donate blood. Please let me know how I can help."

` : `Hello ${item.name}, your blood type is urgently needed. Kindly respond soon.`

  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const response=await axios.post(`${API_BASE_URL}/api/sendSms`, {
      to:"+918139065748",
      message
    })

    if (response.data.success) {
      alert("SMS sent successfully!");
    } else {
      alert("Failed to send SMS.");
    }

  } catch (error) {
    console.error(error)
    alert("An error occurred while sending the SMS.");
  }
}

  return (
    <div className="p-8 bg-gradient-to-b from-gray-50 to-white min-h-screen flex justify-center">
      <div className="w-full max-w-lg space-y-6 bg-white rounded-xl  p-6">
        {/* Close Button */}
        <div className="flex justify-end">
          <DrawerClose asChild>
            <Button 
              variant="ghost" 
              className="rounded-full p-2 hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </DrawerClose>
        </div>

        {/* Title */}
        <div className="text-2xl font-bold text-gray-800 border-b-2 border-red-500 pb-2">
          Details
        </div>

        {/* Information Section */}
        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {["Donor", "Recipient"].includes(item.requested_type) ? (
                <User className="text-red-500 w-6 h-6" />
              ) : (
                <Hospital className="text-red-500 w-6 h-6" />
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500">{contactText}</p>
              </div>
            </div>
            <div className="text-red-600 font-bold text-lg bg-red-100 px-3 py-1 rounded-full">
              {item.bloodType}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <MapPin className="text-gray-500 mt-1 w-5 h-5" />
          <div>
            <p className="text-sm font-medium text-gray-700">Location</p>
            <p className="text-sm text-gray-600">{item.location}</p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <User className="text-gray-500 mt-1 w-5 h-5" />
          <div>
            <p className="text-sm font-medium text-gray-700">Contact</p>
            <p className="text-sm text-gray-600">{item.contactNumber}</p>
          </div>
        </div>

        {/* Units and Status - Conditional Rendering */}
        {showUnitsAndStatus && (
          <>
            {/* Needed */}
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Droplet className="text-red-500 mt-1 w-5 h-5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Needed:</p>
                <p className="text-sm text-gray-600">{item.units} Units</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Tag className="text-red-500 mt-1 w-5 h-5" />
              <div>
                <p className="text-sm font-medium text-gray-700">Status:</p>
                <p className="text-sm text-gray-600">{item.status}</p>
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button 
            onClick={handleRequestClick}
            className="bg-[#E53E3E] hover:bg-red-700 text-white font-semibold w-full py-3 rounded-lg shadow-md transition-all"
          >
            Respond to Request
          </Button>

            {/* Contact button */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-red-500 hover:text-red-600 font-semibold py-3 rounded-lg transition-all"
                >
                  Call {contactText}
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Confirm Call</DialogTitle>
                </DialogHeader>
                <div className="py-2">
                  Do you want to call <strong>{item.name}</strong> at <strong>{item.contactNumber}</strong>?
                </div>
                <DialogFooter className="flex gap-2">
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button
                    onClick={() => {
                      window.location.href = `tel:${item.contactNumber}`;
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Call Now
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>


        </div>
      </div>
    </div>
  );
};

export default RequestDetails;