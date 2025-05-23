const axios = require("axios");
const bs58 = require("bs58");

const DEVNET_RPC = "https://api.devnet.solana.com";
const walletAddress = "FJGV8msQpbCnoJQc1FABZNbYWJFNmtPZQc31zSWBA4LB"; // 👈 Замінити при потребі

// ⚡ Запит до RPC
async function rpcRequest(method, params = []) {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method,
    params,
  };
  const response = await axios.post(DEVNET_RPC, body);
  return response.data.result;
}

// 🔹 Баланс
async function getBalance(address) {
  const lamports = await rpcRequest("getBalance", [address]);
  return lamports / 1e9; // у SOL
}

// 🔹 Токени
async function getTokenAccounts(address) {
  const result = await rpcRequest("getTokenAccountsByOwner", [
    address,
    { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
    { encoding: "jsonParsed" },
  ]);
  return result?.value || [];
}

// 🔹 Транзакції (останнi 5)
async function getRecentTransactions(address, limit = 5) {
  const signatures = await rpcRequest("getSignaturesForAddress", [
    address,
    { limit },
  ]);

  const txs = [];
  for (const sig of signatures) {
    const tx = await rpcRequest("getTransaction", [
      sig.signature,
      { encoding: "json" },
    ]);
    txs.push({ signature: sig.signature, tx });
  }
  return txs;
}

function parseTransactionDetails(tx) {
  const meta = tx.meta;
  const message = tx.transaction.message;

  const fee = meta?.fee / 1e9 || 0; // в SOL
  const status = meta?.err === null ? "✅ Успішна" : "❌ З помилкою";
  const instructions = message.instructions || [];

  const solTransfers = [];
  const tokenTransfers = [];

  // Перевірка SOL переказів
  if (meta && meta.postBalances && meta.preBalances) {
    for (let i = 0; i < meta.postBalances.length; i++) {
      const diff = (meta.preBalances[i] - meta.postBalances[i]) / 1e9;
      if (diff !== 0) {
        solTransfers.push({
          account: message.accountKeys[i],
          change: -diff,
        });
      }
    }
  }

  // Перевірка SPL токенів
  if (meta && meta.postTokenBalances && meta.preTokenBalances) {
    meta.postTokenBalances.forEach((post, i) => {
      const pre = meta.preTokenBalances[i];
      const amount = post.uiTokenAmount.uiAmount - pre?.uiTokenAmount?.uiAmount;
      if (amount !== 0) {
        tokenTransfers.push({
          mint: post.mint,
          owner: post.owner,
          change: amount,
        });
      }
    });
  }

  return {
    fee,
    status,
    solTransfers,
    tokenTransfers,
  };
}

// 🔹 Показати все
async function getWalletInfo(address) {
  try {
    console.log("🔍 Отримуємо дані про гаманець:", address);

    const [balance, tokens, transactions] = await Promise.all([
      getBalance(address),
      getTokenAccounts(address),
      getRecentTransactions(address),
    ]);

    console.log("\n💰 Баланс:", balance, "SOL");

    console.log("\n🪙 SPL токени:");
    if (tokens.length === 0) {
      console.log("  Немає токенів.");
    } else {
      tokens.forEach((token, i) => {
        const info = token.account.data.parsed.info;
        console.log(
          `  ${i + 1}. Мета: ${info.mint}, Баланс: ${info.tokenAmount.uiAmount}`
        );
      });
    }

    console.log("\n📜 Останні транзакції:");
    if (transactions.length === 0) {
      console.log("  Немає транзакцій.");
    } else {
      transactions.forEach((tx, i) => {
        const details = parseTransactionDetails(tx.tx);
        console.log(`  ${i + 1}. Підпис: ${tx.signature}`);
        console.log(
          `     Статус: ${details.status}, Комісія: ${details.fee} SOL`
        );

        details.solTransfers.forEach((t) => {
          console.log(`     🔄 SOL: ${t.account} зміна: ${t.change} SOL`);
        });
        details.tokenTransfers.forEach((t) => {
          console.log(
            `     🪙 SPL: ${t.owner} ${t.change > 0 ? "+" : ""}${
              t.change
            } токенів (${t.mint})`
          );
        });

        console.log(
          `     Slot: ${tx.tx.slot}, Success: ${
            tx.tx.meta?.err === null ? "✅" : "❌"
          }`
        );
      });
    }
  } catch (err) {
    console.error("❌ Помилка:", err.message || err);
  }
}

getWalletInfo(walletAddress);
