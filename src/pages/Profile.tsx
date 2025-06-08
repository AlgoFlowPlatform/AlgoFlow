"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  ExternalLink,
  User,
  Wallet,
  History,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const Profile = () => {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true); // відкриває модалку з вибором гаманця
    }
  };

  useEffect(() => {
    if (!publicKey) return;

    const connection = new Connection("https://api.devnet.solana.com");
    setLoading(true);
    setError("");

    const fetchTransactions = async () => {
      try {
        const sigs = await connection.getSignaturesForAddress(publicKey, {
          limit: 10,
        });
        const txs = sigs.map((sig) => sig.signature);
        setTransactions(txs);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setError("Failed to fetch transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [publicKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!publicKey ? (
            <Card className="bg-slate-900 border-slate-800 shadow-lg">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-slate-400" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">
                  Wallet Not Connected
                </h2>
                <p className="text-slate-400 mb-6 text-center">
                  Please connect your wallet to view your profile and
                  transaction history.
                </p>
                <Button
                  onClick={handleClick}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                >
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="bg-slate-900 border-slate-800 shadow-lg mb-8">
                <CardHeader className="border-b border-slate-800 bg-slate-950/50">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <User className="h-5 w-5 text-cyan-500 " />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-medium text-slate-300 mb-1">
                        Wallet Address
                      </h2>
                      <div className="flex items-center gap-2 bg-slate-950 rounded-lg p-3 border border-slate-800">
                        <Wallet className="h-4 w-4 text-slate-500" />
                        <code className="text-sm font-mono text-slate-300">
                          {publicKey.toBase58()}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto h-6 w-6 text-slate-500 hover:text-white hover:bg-slate-800"
                          onClick={() =>
                            navigator.clipboard.writeText(publicKey.toBase58())
                          }
                          title="Copy to clipboard"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800 shadow-lg">
                <CardHeader className="border-b border-slate-800 bg-slate-950/50">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <History className="h-5 w-5 text-cyan-500" />
                    Latest Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-8 w-8 text-cyan-500 animate-spin" />
                    </div>
                  ) : error ? (
                    <div className="bg-red-900/20 m-6 border border-red-800 rounded-lg p-4 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-red-900 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-4 w-4 text-red-300" />
                      </div>
                      <p className="text-red-300">{error}</p>
                    </div>
                  ) : transactions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-950/30">
                            <th className="text-left p-4 text-xs font-medium text-slate-400">
                              TRANSACTION SIGNATURE
                            </th>
                            <th className="text-right p-4 text-xs font-medium text-slate-400">
                              ACTIONS
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((tx, i) => (
                            <tr
                              key={tx}
                              className="border-b border-slate-800/50 hover:bg-slate-800/20"
                            >
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center">
                                    <History className="h-3 w-3 text-slate-400" />
                                  </div>
                                  <code className="font-mono text-sm text-slate-300">
                                    {tx.slice(0, 14)}...{tx.slice(-14)}
                                  </code>
                                </div>
                              </td>
                              <td className="p-4 text-right">
                                <a
                                  href={`https://explorer.solana.com/tx/${tx}?cluster=devnet`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-cyan-500 hover:text-cyan-400 transition-colors"
                                >
                                  View
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                        <History className="h-8 w-8 text-slate-600" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        No Transactions Found
                      </h3>
                      <p className="text-slate-400 max-w-md">
                        We couldn't find any recent transactions for this wallet
                        on the Solana devnet.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
};



export default Profile;
