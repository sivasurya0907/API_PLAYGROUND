'use client';

import { useState } from 'react';
import Navbar from './Navbar'; // Assuming Navbar is a pre-built component

const Playground = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('Economical');
  const [modelType, setModelType] = useState('GPT-3'); // New state for Model Type
  const [taskType, setTaskType] = useState('Completion'); // New state for Task Type
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<{ input: string; output: string }[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New states for extra functionalities
  const [temperature, setTemperature] = useState(0.7); // Default to 0.7
  const [maxTokens, setMaxTokens] = useState(100);
  const [topP, setTopP] = useState(1.0);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.0);
  const [presencePenalty, setPresencePenalty] = useState(0.0);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setToastMessage('Submitting API request...');

    try {
      const res = await fetch('/api/playground', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          input, 
          mode, 
          modelType, // Send new selections to the API
          taskType,  // Send new selections to the API
          temperature, 
          maxTokens, 
          topP, 
          frequencyPenalty, 
          presencePenalty 
        }),
      });

      const data = await res.json();
      setResult(data.response);
      setHistory([...history, { input, output: data.response }]);
      setInput('');

      // Show success toast message
      setToastMessage('API call successful!');
    } catch (error) {
      console.error('Error:', error);
      setResult('Error occurred while fetching data.');
      setToastMessage('Error during API call.');
    } finally {
      setLoading(false);

      // Hide the toast after 3 seconds
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    document.body.classList.toggle('dark', !isDarkTheme);
    document.body.classList.toggle('light', isDarkTheme);
  };

  const clearHistory = () => {
    setHistory([]);
    setToastMessage('History cleared!');
    
    // Hide the toast after 3 seconds
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Function to handle saving the result to a file
  const handleSave = () => {
    if (!result) return;

    const blob = new Blob([result], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'result.txt';
    link.click();
  };

  return (
    <>
      <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <div className={`container ${isDarkTheme ? 'dark' : 'light'}`}>
        <header className="header">
          <h1 className="title">API Playground</h1>
        </header>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="toast">
            {toastMessage}
          </div>
        )}

        <div className="card">
          <textarea
            className="textarea"
            rows={4}
            placeholder="Enter your API input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            className="select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="Economical">Economical</option>
            <option value="Commercial">Commercial</option>
          </select>

          {/* New dropdown for model selection */}
          <select
            className="select"
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
          >
            <option value="GPT-3">GPT-3</option>
            <option value="GPT-4">GPT-4</option>
            <option value="Davinci">Davinci</option>
          </select>

          {/* New dropdown for task type selection */}
          <select
            className="select"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
          >
            <option value="Completion">Completion</option>
            <option value="Chat">Chat</option>
            <option value="Summarization">Summarization</option>
          </select>

          {/* Additional Controls for Temperature and Tokens */}
          <div className='labels'>
            <div>
              <label>Temperature: {temperature}</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={temperature} 
                onChange={(e) => setTemperature(parseFloat(e.target.value))} 
              />
            </div>

            <div>
              <label>Max Tokens: {maxTokens}</label>
              <input 
                type="number" 
                value={maxTokens} 
                onChange={(e) => setMaxTokens(Number(e.target.value))} 
                min="10"
                max="500"
              />
            </div>

            <div>
              <label>Top-p: {topP}</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={topP} 
                onChange={(e) => setTopP(parseFloat(e.target.value))} 
              />
            </div>

            <div>
              <label>Frequency Penalty: {frequencyPenalty}</label>
              <input 
                type="range" 
                min="0" 
                max="2" 
                step="0.1" 
                value={frequencyPenalty} 
                onChange={(e) => setFrequencyPenalty(parseFloat(e.target.value))} 
              />
            </div>

            <div>
              <label>Presence Penalty: {presencePenalty}</label>
              <input 
                type="range" 
                min="0" 
                max="2" 
                step="0.1" 
                value={presencePenalty} 
                onChange={(e) => setPresencePenalty(parseFloat(e.target.value))} 
              />
            </div>
          </div>
<br></br>
          <div className="actions">
            <button className="button primary" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
            <button className="button secondary" onClick={clearHistory}>
              Clear History
            </button>
            <button className="button save" onClick={handleSave}>
              Save Result
            </button>
          </div>
        </div>

        <div className="card result-card">
          <p className="font-bold">Result:</p>
          {loading ? <p>Loading...</p> : <p>{result || 'API result will be displayed here.'}</p>}
        </div>

        <div className="card history-card">
          <p className="font-bold">History:</p>
          {history.length === 0 ? (
            <p>No history available.</p>
          ) : (
            history.map((item, index) => (
              <div key={index} className="history-item">
                <strong>Input:</strong> {item.input}<br />
                <strong>Output:</strong> {item.output}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Playground;
