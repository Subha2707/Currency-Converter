import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const apiKey = "fca_live_vDXH3lWKHCmOLJIlfExAfXMqduXHwUxefeY9U98Q";
const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;

app.get("/convert", async (req, res) => {
  const { amount, currency } = req.query;

  if (!amount || !currency) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const response = await axios.get(url, {
      timeout: 20000,
    });

    const rates = response.data.data;
    const rate = rates[currency.toUpperCase()];

    if (!rate) {
      return res.status(400).json({ error: "Invalid currency code" });
    }

    const convertedAmount = (Number(amount) * rate).toFixed(4);
    res.json({ convertedAmount });

  } catch (error) {
    console.error("Currency API error:", error.message);
    res.status(503).json({ error: "Currency service unavailable" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
