// src/pages/Traders.tsx
import React from "react";
import TraderList from "../components/TraderList";
import { PublicKey } from "@solana/web3.js";

const Traders: React.FC = () => {
  // Тимчасові мок-дані
  const traders = [
    {
      name: "Alice",
      followers: 124,
      avatarUrl: "https://i.pravatar.cc/150?img=5",
      publicKey: new PublicKey("8uEwWbDbs3FRjS7ZkgzAkk2RrHdJXjcZnmT6j4V4m56h"),
    },
    {
      name: "Bob",
      followers: 97,
      avatarUrl: "https://i.pravatar.cc/150?img=10",
      publicKey: new PublicKey("2f3fVxLS5h3xk8Fj5A9GV9sGqGu9X4Eyn35EKhpKf5nA"),
    },
    {
      name: "Carol",
      followers: 221,
      avatarUrl: "https://i.pravatar.cc/150?img=15",
      publicKey: new PublicKey("5e1mS3SAGprbNQo58mRnJWr3j1WEWcqQv8hxGE4G7Ev6"),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Top Traders</h1>
      <TraderList traders={traders} />
    </div>
  );
};

export default Traders;

  