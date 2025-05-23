"use client"

import type React from "react"

import { useState } from "react"
import { Connection, PublicKey, type ParsedInstruction } from "@solana/web3.js"
import { extractTransferInstruction } from "../utils/extractTransferInstruction"
import { ArrowDownUp, BarChart3, Clock, Search, Wallet, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"

const connection = new Connection("https://api.mainnet-beta.solana.com")

type TransferInfo = {
  from: PublicKey
  to: PublicKey
  lamports: number
  time: string
}

export default function Home() {
  const [input, setInput] = useState("")
  const [transactions, setTransactions] = useState<TransferInfo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [totalValue, setTotalValue] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTransactions([])
    setError("")
    setLoading(true)

    try {
      const pubkey = new PublicKey(input)
      const signatures = await connection.getSignaturesForAddress(pubkey, { limit: 15 })

      const txs = await connection.getParsedTransactions(
        signatures.map((s) => s.signature),
        {
          maxSupportedTransactionVersion: 0,
        },
      )

      const parsedTransfers: TransferInfo[] = []
      let totalLamports = 0

      txs.forEach((tx) => {
        if (!tx) return
        const blockTime = tx.blockTime ?? 0

        tx.transaction.message.instructions.forEach((ix) => {
          if ("parsed" in ix) {
            const parsed = extractTransferInstruction(ix as ParsedInstruction)
            if (parsed) {
              parsedTransfers.push({
                from: new PublicKey(parsed.from),
                to: new PublicKey(parsed.to),
                lamports: parsed.lamports,
                time: new Date(blockTime * 1000).toLocaleString(),
              })

              // Calculate total value (simplified for demo)
              if (parsed.to === pubkey.toString()) {
                totalLamports += parsed.lamports
              } else if (parsed.from === pubkey.toString()) {
                totalLamports -= parsed.lamports
              }
            }
          }
        })
      })

      setTotalValue(totalLamports / 1000000000) // Convert lamports to SOL
      setTransactions(parsedTransfers)
    } catch (error) {
      setError("Invalid address or network issue")
      console.log(error)
    }

    setLoading(false)
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <div >
     

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Solana Transfers Explorer</h2>
            <p className="text-slate-400">Cutting through the noise with clear transaction data</p>
          </div>

          <Card className="bg-slate-900 border-slate-800 shadow-lg mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter Solana wallet address"
                    className="pl-10 bg-slate-950 border-slate-800 text-slate-300 placeholder:text-slate-600 focus-visible:ring-cyan-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Fetch Transfers"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {error && (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-8 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-red-900 flex items-center justify-center flex-shrink-0">
                <X className="h-4 w-4 text-red-300" />
              </div>
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {transactions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-400 flex items-center gap-2">
                    <Wallet className="h-4 w-4" /> Your Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{totalValue.toFixed(4)} SOL</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-400 flex items-center gap-2">
                    <ArrowDownUp className="h-4 w-4" /> Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{transactions.length}</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-400 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Last Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-medium text-white">{transactions[0]?.time.split(",")[0] || "N/A"}</div>
                </CardContent>
              </Card>
            </div>
          )}

          {transactions.length > 0 && (
            <Card className="bg-slate-900 border-slate-800 shadow-lg overflow-hidden">
              <CardHeader className="border-b border-slate-800 bg-slate-950/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-cyan-500" />
                    Transaction History
                  </CardTitle>
                  <Tabs defaultValue="all">
                    <TabsList className="bg-slate-950 border border-slate-800">
                      <TabsTrigger value="all" className="data-[state=active]:bg-slate-800">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="incoming" className="data-[state=active]:bg-slate-800">
                        Incoming
                      </TabsTrigger>
                      <TabsTrigger value="outgoing" className="data-[state=active]:bg-slate-800">
                        Outgoing
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-950/30">
                        <th className="text-left p-4 text-xs font-medium text-slate-400">FROM</th>
                        <th className="text-left p-4 text-xs font-medium text-slate-400">TO</th>
                        <th className="text-right p-4 text-xs font-medium text-slate-400">AMOUNT (SOL)</th>
                        <th className="text-right p-4 text-xs font-medium text-slate-400">TIME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx, i) => (
                        <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                          <td className="p-4 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center">
                                <Wallet className="h-3 w-3 text-slate-400" />
                              </div>
                              <span className="font-mono">{truncateAddress(tx.from.toBase58())}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center">
                                <Wallet className="h-3 w-3 text-slate-400" />
                              </div>
                              <span className="font-mono">{truncateAddress(tx.to.toBase58())}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-right font-medium">
                            {(tx.lamports / 1000000000).toFixed(6)}
                          </td>
                          <td className="p-4 text-sm text-right text-slate-400">{tx.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
