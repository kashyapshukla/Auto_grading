import logo from './logo.svg';
import './App.css';
import LoginPage from '../src/components/Home/home_page';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


function App() {
  return (
  

    <Router>
  
   <Routes>
        
        <Route exact path="/" element={<LoginPage/>} />
        
       

   </Routes>

   </Router>
  );
}

export default App;
