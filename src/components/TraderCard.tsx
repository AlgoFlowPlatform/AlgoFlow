// src/components/TraderCard.tsx
import React from "react";
import { PublicKey } from "@solana/web3.js";
import { useNavigate } from "react-router-dom";

type TraderCardProps = {
  name: string;
  followers: number;
  avatarUrl: string;
  publicKey: PublicKey;
};

const TraderCard: React.FC<TraderCardProps> = ({ name, followers, avatarUrl, publicKey }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trader/${publicKey.toBase58()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-2xl shadow-md p-4 flex items-center space-x-4 transition hover:shadow-lg"
    >
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="w-14 h-14 rounded-full object-cover"
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-500">{followers} followers</p>
        <p className="text-xs text-gray-400 break-all">{publicKey.toBase58()}</p>
      </div>
    </div>
  );
};

export default TraderCard;
