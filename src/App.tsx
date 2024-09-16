import { Outlet } from "react-router-dom"
import Navbar from "./myComponent/Navbar/Navbar"
import Footer from "./myComponent/Footer/Footer"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <div>
        <Navbar />
        <ToastContainer />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
