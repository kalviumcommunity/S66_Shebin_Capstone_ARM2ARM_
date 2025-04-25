import React from 'react'
import Sidebar from "./components/sideBar"
import TopNavBar from "./components/navbar"

const Layout = () => {
  return (
    <div>
        <TopNavBar/>
        <div>
            <Sidebar/>
        </div>
    </div>
  )
}

export default Layout
