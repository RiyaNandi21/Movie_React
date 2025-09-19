import React, { useState } from "react";

function T2PrimeCheck() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  return (
    <div className="task-box">
      <h2>T2: Prime Number Check</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => {
          const value=e.target.value;
          if(/^[0-9]*$/.test(value)){
          setNumber(value);
          setResult("");
        }}
      }
        placeholder="Enter a number"
      />
      <button
        onClick={() =>
          setResult(
            isPrime(parseInt(number))
              ? "It is a Prime number"
              : "Not a Prime number"
          )
        }
      >
        Check
      </button>
      <p>{result}</p>
    </div>
  );
}

export default T2PrimeCheck;
