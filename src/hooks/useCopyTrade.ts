import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

export const useCopyTrade = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const copyTrade = async (topTraderAddress: string) => {
    if (!publicKey) throw new Error("Wallet not connected")

    const trader = new PublicKey(topTraderAddress)

    // Для MVP — просто переказ 0.01 SOL топ-трейдеру
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: trader,
        lamports: 0.01 * LAMPORTS_PER_SOL,
      })
    )

    const signature = await sendTransaction(tx, connection)
    await connection.confirmTransaction(signature, "processed")
    return signature
  }

  return { copyTrade }
}
