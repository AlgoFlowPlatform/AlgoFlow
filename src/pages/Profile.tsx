import { useWallet } from '@solana/wallet-adapter-react'

export default function Profile() {
  const { publicKey } = useWallet()

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      {publicKey ? (
        <p>Wallet Address: {publicKey.toBase58()}</p>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  )
}
