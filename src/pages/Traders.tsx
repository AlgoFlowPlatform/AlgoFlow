import TraderCard from '../components/TraderCard'

const topTraders = [
  { name: "AlphaTrader", address: "5N9HhcPyiVvVjJGc5r41DhqQwG2ydNRidFVXmy6tqvVJ" },
  { name: "SmartWhale", address: "DdhwnqvxPWBXAPnTtA7czFjVX3EBSkWJ5cUyGq7rUGPu" },
]

export default function Traders() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Top Traders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topTraders.map(trader => (
          <TraderCard key={trader.address} {...trader} />
        ))}
      </div>
    </div>
  )
}

  