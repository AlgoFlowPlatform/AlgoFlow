"use client";

import type React from "react";
import type { PublicKey } from "@solana/web3.js";
import { useNavigate } from "react-router-dom";
import { Users, Copy, TrendingUp } from "lucide-react";

type TraderCardProps = {
  name: string;
  followers: number;
  avatarUrl: string;
  publicKey: PublicKey;
};

const TraderCard: React.FC<TraderCardProps> = ({
  name,
  followers,
  avatarUrl,
  publicKey,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/trader/${publicKey.toBase58()}`);
  };

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(publicKey.toBase58());
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer relative overflow-hidden"
    >
      {/* Gradient background with hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/80 rounded-2xl transition-all duration-300 group-hover:from-slate-700/60 group-hover:to-slate-800/90" />

      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Main content */}
      <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 transition-all duration-300 group-hover:border-slate-600/70 group-hover:shadow-xl group-hover:shadow-blue-500/10">
        {/* Header with avatar and trending icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <img
              src={avatarUrl || "/placeholder.svg"}
              alt={`${name}'s avatar`}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-600/50 group-hover:ring-blue-500/50 transition-all duration-300"
            />
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Trending icon */}
          <div className="p-2 rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors duration-300">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        {/* Trader info */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
              {name}
            </h3>

            {/* Followers with icon */}
            <div className="flex items-center gap-2 mt-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300 font-medium">
                {formatFollowers(followers)}
              </span>
              <span className="text-slate-500 text-sm">followers</span>
            </div>
          </div>

          {/* Public key with copy functionality */}
          <div className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="text-slate-400 text-sm font-mono truncate">
                {truncateAddress(publicKey.toBase58())}
              </span>
            </div>

            <button
              onClick={handleCopyAddress}
              className="p-1.5 rounded-md hover:bg-slate-700/50 text-slate-400 hover:text-blue-400 transition-colors duration-200 flex-shrink-0"
              title="Copy address"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default TraderCard;
