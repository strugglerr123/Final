import './App.css';
import { BrowserRouter as Bws ,Route,Routes } from 'react-router-dom';
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Profile} from "./pages/Profile";
import {SignIn} from "./pages/SignIn";
import {SignUp} from "./pages/SignUp";
import Header from './components/Header';

function App() {
  return (
    <Bws>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/Sign-in' element={<SignIn/>}/>
        <Route path='/Sign-up' element={<SignUp/>}/>
      </Routes>
    </Bws>
  );
}

export default App;
