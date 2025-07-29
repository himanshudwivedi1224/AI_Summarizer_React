import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSummarize = async () => {
    setLoading(true);
    setError('');
    setSummary('');
    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Document Summarizer</h1>
      </header>
      <main>
        <textarea
          placeholder="Enter text to summarize..."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          rows={10}
          cols={80}
        ></textarea>
        <button onClick={handleSummarize} disabled={loading}>
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>
        {error && <p className="error-message">{error}</p>}
        {summary && (
          <div className="summary-output">
            <h2>Summary:</h2>
            <p>{summary}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
