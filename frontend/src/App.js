import logo from './logo.svg';
import './App.css';
import LoginPage from '../src/components/Home/home_page';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SignupStudent } from './components/login_and_signup/signup';
import { LoginStudent } from './components/login_and_signup/login';



function App() {
  return (
  

    <Router>
  
   <Routes>
        
        <Route exact path="/" element={<LoginPage/>} />
        <Route path="/sign-up" element={<SignupStudent/>}/>
        <Route path= "/log-in" element={<LoginStudent/>}/>

       

   </Routes>

   </Router>
  );
}

export default App;
