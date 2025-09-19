import React, { useState } from "react";

function T4CountVowels() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(null);

  function countVowels(str) {
    return str.match(/[aeiouAEIOU]/g)?.length || 0;
  }

  return (
    <div className="task-box">
      <h2>T4: Count Vowels in a String</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          const value=e.target.value;
          if(/^[a-zA-Z]*$/.test(value)){
          setText(value);
          setCount("");
        }}
      }
        placeholder="Enter text"
      />
      <button onClick={() => setCount(countVowels(text))}>
        Count 
      </button>
      <p>Vowel Count: {count}</p>
    </div>
  );
}

export default T4CountVowels;
