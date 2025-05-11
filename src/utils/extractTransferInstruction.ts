import { ParsedInstruction } from "@solana/web3.js";

export const extractTransferInstruction = (ix: ParsedInstruction) => {
  if (
    "parsed" in ix &&
    ix.program === "system" &&
    ix.parsed?.type === "transfer"
  ) {
    const { source, destination, lamports } = ix.parsed.info;
    return {
      from: source,
      to: destination,
      lamports: Number(lamports),
    };
  }
  return null;
};
