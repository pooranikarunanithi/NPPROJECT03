import { BrowserRouter, Routes, Route} from "react-router-dom"
import TopNav from "./components/TopNav"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import PrivateRoute from "./components/PrivateRoute";


//components
import Home  from "./booking/Home"
import Login from "./auth/Login"
import Register  from "./auth/Register"
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";
import Navbar from './components/Navbar';
import About from './Pages/About';
import SignUp from './Pages/Signup';
import RegisterForm from "./components/RegisterFom";
import EditHotel from "./hotels/Edithotel";
import Viewhotel from "./hotels/Viewhotel";



function App() {
  return (
    
    
    <BrowserRouter>
    <TopNav />
    <ToastContainer position="top-center" />
    <Routes >
    <Route exact path ="/" element = {<Home />} />
    <Route exact path ="/login" element = {<Login />} />
    <Route exact path ="/register" element = {<Register />} />
    <Route path="/dashboard"  element={ <PrivateRoute> <Dashboard /> </PrivateRoute> } />
    <Route path="/dashboard/seller"  element={ <PrivateRoute> <DashboardSeller /> </PrivateRoute> } />
    <Route path="/hotels/new"  element={ <PrivateRoute> <NewHotel /> </PrivateRoute> } />
    <Route path="/stripe/callback"  element={ <PrivateRoute> <StripeCallback /> </PrivateRoute> } />
    <Route path="/hotel/edit/:hotelId"  element={ <PrivateRoute> <EditHotel /> </PrivateRoute> } />
    <Route exact path ="/hotel/:hotelId" element = {<Viewhotel />} />
    <Route path='/about' element={<About/>} />
    <Route path='/sign-up' element={<RegisterForm/>} />
    </Routes> 
    </BrowserRouter>

    
  );
  }

export default App;
//<Route exact path="/dashboard"  element={<PrivateRoute> <Dashboard /> </PrivateRoute> }/>