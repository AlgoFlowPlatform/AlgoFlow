import { useCopyTrade } from '../hooks/useCopyTrade'
import { useState } from 'react'

type TraderCardProps = {
  name: string
  address: string
}

export default function TraderCard({ name, address }: TraderCardProps) {
  const { copyTrade } = useCopyTrade()
  const [loading, setLoading] = useState(false)

  const handleCopyTrade = async () => {
    try {
      setLoading(true)
      const sig = await copyTrade(address)
      alert(`Угода скопійована! Tx: ${sig}`)
    } catch (err) {
      alert("Помилка копіювання: " + err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm break-all">{address}</p>
      <button
        onClick={handleCopyTrade}
        disabled={loading}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Копіювання..." : "Copy Trade"}
      </button>
    </div>
  )
}
