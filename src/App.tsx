import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Traders from './pages/Traders';
import TraderDetails from './pages/TraderDetails';
import Profile from './pages/Profile';


export default function App() {
  return (
    
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/traders" element={<Traders />} />
          <Route path="/trader/:id" element={<TraderDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
 
  )
}
