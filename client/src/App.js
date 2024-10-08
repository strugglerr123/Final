import "./App.css"
import { BrowserRouter as Bws, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Profile } from "./pages/Profile"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { UserListing } from "./pages/UserListing"
import Header from "./components/Header"
import { Private_profile } from "./components/Private_profile"
import Listing from "./pages/Listing"
import UpdateListing from "./pages/UpdateListing"

function App() {
  return (
    <Bws>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/listing/:id' element={<UserListing />} />
        <Route element={<Private_profile />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<Listing />} />
          <Route path='/update-listing/:id' element={<UpdateListing />} />
        </Route>
        <Route path='/Sign-in' element={<SignIn />} />
        <Route path='/Sign-up' element={<SignUp />} />
      </Routes>
    </Bws>
  )
}

export default App
