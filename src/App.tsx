import Router from './router'
import { WalletConnectionProvider } from './context/WalletContext'
import Navbar from './components/Navbar';

export default function App() {
  return (
    <WalletConnectionProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/traders" element={<Traders />} />
          <Route path="/trader/:id" element={<TraderDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </WalletConnectionProvider>
  )
}
