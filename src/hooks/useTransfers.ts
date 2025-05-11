import { useState } from 'react'
import { TransferInfo } from '../types/TransferInfo'

export function useTransfers(limit = 5) {
  const [transfers, setTransfers] = useState<TransferInfo[]>([])

  const addTransfer = (t: TransferInfo) => {
    setTransfers(prev => [t, ...prev.slice(0, limit - 1)])
  }

  return { transfers, addTransfer }
}