import { useState } from "react";
import { Connection, PublicKey, ParsedInstruction } from "@solana/web3.js";
import { extractTransferInstruction } from "../utils/extractTransferInstruction";

const connection = new Connection("https://api.mainnet-beta.solana.com");

type TransferInfo = {
  from: PublicKey;
  to: PublicKey;
  lamports: number;
  time: string;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [transactions, setTransactions] = useState<TransferInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransactions([]);
    setError("");
    setLoading(true);

    try {
      const pubkey = new PublicKey(input);
      const signatures = await connection.getSignaturesForAddress(pubkey, { limit: 10 });

      const txs = await connection.getParsedTransactions(signatures.map((s) => s.signature), {
        maxSupportedTransactionVersion: 0,
      });

      const parsedTransfers: TransferInfo[] = [];

      txs.forEach((tx) => {
        if (!tx) return;
        const blockTime = tx.blockTime ?? 0;

        tx.transaction.message.instructions.forEach((ix) => {
          if ("parsed" in ix) {
            const parsed = extractTransferInstruction(ix as ParsedInstruction);
            if (parsed) {
              parsedTransfers.push({
                from: new PublicKey(parsed.from),
                to: new PublicKey(parsed.to),
                lamports: parsed.lamports,
                time: new Date(blockTime * 1000).toLocaleString(),
              });
            }
          }
        });
      });

      setTransactions(parsedTransfers);
    } catch (error) {
      setError("Invalid address or network issue");
      console.log(error)
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl text-black font-bold text-center">Solana Transfers</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter wallet address"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "Loading..." : "Fetch Transfers"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {transactions.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Recent Transfers</h2>
          <ul className="space-y-2">
            {transactions.map((tx, i) => (
              <li key={i} className="p-3 border border-gray-200 rounded">
                <p><strong>From:</strong> {tx.from.toBase58()}</p>
                <p><strong>To:</strong> {tx.to.toBase58()}</p>
                <p><strong>Lamports:</strong> {tx.lamports}</p>
                <p><strong>Time:</strong> {tx.time}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
