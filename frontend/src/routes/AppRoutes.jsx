
import {Routes,Route} from "react-router-dom"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"
import HomePage from "../landing_page/HomePage"
import Dashboard from "../pages/Dashboard"
import ReviewInterface from "../pages/ReviewInterface"


const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/review" element={<ReviewInterface />} />
      </Routes>
    </>
  )
}

export default AppRoutes