import React, { useState, useEffect } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, PublicKey } from '@solana/web3.js'


const Profile: React.FC = () => {
  const { publicKey } = useWallet()

  const [transactions, setTransactions] = useState<string[]>([])

  useEffect(() => {
    if (!publicKey) return

    const connection = new Connection('https://api.devnet.solana.com')


    

    const fetchTransactions = async () => {
      try {
        const sigs = await connection.getSignaturesForAddress(publicKey, { limit: 5 })
        const txs = sigs.map(sig => sig.signature)
        setTransactions(txs)
      } catch (error) {
        console.error('Failed to fetch transactions:', error)
      }
    }

  
    fetchTransactions()
  }, [publicKey])

  if (!publicKey) {
    return <div className="p-4">Please connect your wallet.</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Profile</h1>
      <p><strong>Wallet:</strong> {publicKey.toBase58()}</p>
     
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Latest Transactions</h2>
        <ul className="list-disc ml-5">
          {transactions.length > 0 ? (
            transactions.map(tx => (
              <li key={tx}>
                <a
                  href={`https://explorer.solana.com/tx/${tx}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {tx.slice(0, 10)}...
                </a>
              </li>
            ))
          ) : (
            <li>No recent transactions found.</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Profile
