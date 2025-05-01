import { PublicKey } from '@solana/web3.js'

export type TransferInfo = {
  to: PublicKey
  lamports: number
  signature: string
  time: string
}