import React, { useEffect, useState } from 'react'
import axios from "axios"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const BloodRequest = () => {

    const [requestData,setRequestData]=useState([])

    useEffect(()=>{
        const fetchRequest=async()=>{
            try {
                const response=await axios.get("http://localhost:9000/BloodRequest")
                setRequestData(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRequest()
    },[])


  return (
    <div>
        <h1>Hospital Request</h1>
        <ul>
            {requestData.map((request)=>(
                <li key={request._id}>
                    <h2>{request.name}</h2>
                    <h2>{request.contactNumber}</h2>
                    <h4>{request.bloodType}</h4>
                    <h4>{request.location}</h4>
                    <h4>{dayjs(request.createdAt).fromNow()}</h4>
                    <h4>Needed:{request.units} unit</h4>
                    <h4>{request.status}</h4>
                </li>
            ))}
        </ul>
    
    </div>
  )
}

export default BloodRequest