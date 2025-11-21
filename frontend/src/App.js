import React from 'react';
import NewsList from './components/NewsList';
import './styles.css';

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>NewsRadar</h1>
      </header>
      <main>
        <NewsList />
      </main>
    </div>
  );
}

export default App;
