import { FC } from 'react'
import { TransferInfo } from '../types/TransferInfo'


type Props = {
  transfers: TransferInfo[]
}

const TransferList: FC<Props> = ({ transfers }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Скопійовані угоди</h2>
      <ul className="space-y-2">
        {transfers.map((t, i) => (
          <li key={i} className="p-2 bg-gray-100 rounded-md">
            <div>💸 {t.lamports / 1e9} SOL → {t.to.toBase58().slice(0, 6)}...</div>
            <div className="text-xs text-gray-500">{t.time}</div>
            <a href={`https://solscan.io/tx/${t.signature}`} target="_blank" rel="noreferrer" className="text-blue-600 text-xs underline">
              Переглянути
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransferList