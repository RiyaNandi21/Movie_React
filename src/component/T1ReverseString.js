import React, { useState } from "react";

function T1ReverseString() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  function reverseString(str) {
    return str.split("").reverse().join("");
  }

  return (
    <div className="task-box">
      <h2>T1: Reverse a String</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          const value=e.target.value;
          if(/^[a-zA-Z]*$/.test(value)){
          setText(value);
          setResult("");
        }
      }
      }
        placeholder="Enter text"

      />
      <button onClick={() => setResult(reverseString(text))}>
        Reverse
      </button>
      <p>Result: {result}</p>
    </div>
  );
}

export default T1ReverseString;
