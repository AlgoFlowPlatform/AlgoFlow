// /src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

const Navbar: React.FC = () => {
  const { connected, disconnect } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true); // відкриває модалку з вибором гаманця
    }
  };
  return (
    <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
            <Wallet className="h-4 w-4 text-slate-950" />
          </div>
          <h1 className="text-xl font-bold">Algoflow</h1>
        </div>

        <div className="flex gap-3">
          <Link to="/">Home</Link>
          <Link to="/traders">Traders</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent" onClick={handleClick}>
          {connected ? "Disconnect Wallet" : "Connect Wallet"}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
