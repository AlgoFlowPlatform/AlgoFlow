import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">AlgoFlow</h1>
      <p>Mirror top traders on Solana with one click</p>
      <WalletMultiButton />
    </div>
  )
}
