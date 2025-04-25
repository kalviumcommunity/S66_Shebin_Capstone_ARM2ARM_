import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import Layout from "./layout"
import BloodRequest from "./components/BloodRequest"
import Findblood from "./pages/findblood"
import Donate from "./pages/donate"
import MyDonations from "./pages/myDonations"
import MyBloodRequests from "./pages/myBloodRequests"



function App() {

  return (
      <BrowserRouter>
        <Routes>
          {/* <Layout> */}
            <Route path='/bloodRequest' element={<BloodRequest/>}/>
            <Route path='/findBlood' element={<Findblood/>}/>
            <Route path='donate' element={<Donate/>}/>
            <Route path='/myDonations' element={<MyDonations/>}/>
            <Route path='/myRequests' element={<MyBloodRequests/>}/>
          {/* </Layout> */}

        </Routes>
      </BrowserRouter> 
  )
}

export default App
