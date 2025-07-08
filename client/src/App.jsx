import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import Layout from "./layout"
import Findblood from "./pages/findblood"
import Donate from "./pages/donate"
import MyDonations from "./pages/myDonations"
import MyBloodRequests from "./pages/myBloodRequests"
import Leaderboard from "./pages/Leaderboard"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/SignUp"
import Home from "./pages/Home"
import DonationCamps from "./pages/donationCamps" 
import Profile from "./pages/Profile/Profile"
import About from "./pages/About"


function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* <Layout> */}
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signUp' element={<Register/>}/>
            <Route path='/findBlood' element={<Findblood/>}/>
            <Route path='/donate' element={<Donate/>}/>
            <Route path='/myDonations' element={<MyDonations/>}/>
            <Route path='/myRequests' element={<MyBloodRequests/>}/>
            <Route path='/donationCamps' element={<DonationCamps/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/Leaderboard' element={<Leaderboard/>}/>
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/About' element={<About/>}/>
          {/* </Layout> */}

        </Routes>
      </BrowserRouter> 
  )
}

export default App
