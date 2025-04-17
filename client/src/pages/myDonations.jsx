import React from 'react'
import Sidebar from "../components/sideBar";
import TopNavBar from "../components/navbar";

const MyDonations = () => {
    return (
        <div className="h-screen flex flex-col py-2">
          <TopNavBar/>
          <div className="flex flex-1">
            <Sidebar/>
            <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
              <h1 className="text-2xl font-bold py-1">My Donations</h1>
              </div>
          </div>
        </div>
      )
}

export default MyDonations
