import { useState } from "react";

const Converter = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async (e) => {
    e.preventDefault();
    setError("");
    setResult("");

    if (!amount || !currency) {
      setError("Please enter amount and currency");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/convert?amount=${amount}&currency=${currency}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Conversion failed");
      }

      setResult(`${amount} USD = ${data.convertedAmount} ${currency.toUpperCase()}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h1>💱 Currency Converter</h1>
      <p>Convert USD to any currency</p>

      <form onSubmit={handleConvert}>
        <input
          type="number"
          placeholder="Amount in USD"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Currency Code (INR, EUR, AUD)"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Converting..." : "Convert"}
        </button>
      </form>

      {result && <div className="result success">{result}</div>}
      {error && <div className="result error">{error}</div>}
    </div>
  );
};

export default Converter;
