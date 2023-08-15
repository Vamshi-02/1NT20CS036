import React, { useState } from 'react';
import './number.css'; // Importing CSS file for styling

function App() {
  const [numbers, setNumbers] = useState([]);

  const fetchNumbers = async (urls) => {
    const aggregatedNumbers = [];

    for (const url of urls) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.numbers && Array.isArray(data.numbers)) {
          aggregatedNumbers.push(...data.numbers);
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message}`);
      }
    }

    setNumbers(aggregatedNumbers);
  };

  const handleFetchNumbers = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urls = urlParams.getAll('url');
    fetchNumbers(urls);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Number Management Service</h1>
        <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      </header>
      <main>
        <div className="numbers-list">
          <h2>Aggregated Numbers:</h2>
          <ul>
            {numbers.map((number, index) => (
              <li key={index}>{number}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default number;
