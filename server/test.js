const axios = require("axios");

const API_KEY = "dd1e919c-6b75-431b-b12b-da69903127ef";
const walletAddress = "FJGV8msQpbCnoJQc1FABZNbYWJFNmtPZQc31zSWBA4LB";

async function getWalletActivity(address) {
  try {
    const url = `https://api.helius.xyz/v0/transactions?api-key=${API_KEY}`;

    const response = await axios.post(url, {
      addresses: [address],
    });

    console.log("Transactions:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching wallet activity:", error.response?.data || error.message);
  }
}

getWalletActivity(walletAddress);
