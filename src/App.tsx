import Router from './router'
import { WalletConnectionProvider } from './context/WalletContext'

export default function App() {
  return (
    <WalletConnectionProvider>
      <Router />
    </WalletConnectionProvider>
  )
}
