import "./App.css"
import { BrowserRouter as Bws, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Profile } from "./pages/Profile"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import Header from "./components/Header"
import { Private_profile } from "./components/Private_profile"

function App() {
  return (
    <Bws>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route element={<Private_profile/>}>
        <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/Sign-in' element={<SignIn />} />
        <Route path='/Sign-up' element={<SignUp />} />
      </Routes>
    </Bws>
  )
}

export default App
