import React from 'react'
import Sidebar from "../components/sideBar";
import TopNavBar from "../components/navbar";
import NewRequest from "../components/newRequest"

const MyBloodRequests = () => {
    return (
        <div>
          <TopNavBar/>
          <div className="flex flex-1">
            <Sidebar/>
            <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
              <div className='flex items-center justify-between mb-4'>
                <h1 className="text-2xl font-bold py-1">My Blood Requests</h1>
                <NewRequest/>
              </div>

              <div className="flex justify-between p-4 bg-white rounded-lg shadow-md">
                <div className="flex-1 text-center bg-green-50 p-4 rounded-lg">
                  <h3 className="text-blue-400 font-sm">Active Requests</h3>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="flex-1 text-center bg-green-50 p-4 rounded-lg mx-2">
                  <h3 className="text-green-600 font-sm">Fulfilled Requests</h3>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="flex-1 text-center bg-red-50 p-4 rounded-lg">
                  <h3 className="text-red-600 font-sm">Total Donors Found</h3>
                  <p className="text-2xl font-bold">9</p>
                </div>
              </div>
              
            </div>

          </div>
        </div>
      )
}

export default MyBloodRequests
