// src/components/TraderList.tsx
import React from "react";
import { PublicKey } from "@solana/web3.js";
import TraderCard from "./TraderCard";

type Trader = {
  name: string;
  followers: number;
  avatarUrl: string;
  publicKey: PublicKey;
};

type TraderListProps = {
  traders: Trader[];
};

const TraderList: React.FC<TraderListProps> = ({ traders }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {traders.map((trader, index) => (
        <TraderCard
          key={index}
          name={trader.name}
          followers={trader.followers}
          avatarUrl={trader.avatarUrl}
          publicKey={trader.publicKey}
        />
      ))}
    </div>
  );
};

export default TraderList;