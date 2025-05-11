// /src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Traders from './pages/Traders';
import TraderDetails from './pages/TraderDetails';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        {/* Навігаційний бар */}
        <Navbar />
        
        {/* Роутинг */} 
        <div className='max-w-[1200px] m-auto'>
          <div className='w-fit mx-auto my-10'>
            <WalletMultiButton />
          </div>
          
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/traders" element={<Traders />} />
          <Route path="/trader/:id" element={<TraderDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

