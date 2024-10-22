import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseballFieldPlot from './BaseballFieldPlot';
import VideoSearch from './VideoSearch';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [batters, setBatters] = useState([]);
  const [selectedBatter, setSelectedBatter] = useState('');
  const [hits, setHits] = useState([]);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    axios.get('http://localhost:5000/api/batters')
      .then(response => {
        setBatters(response.data);
      })
      .catch(error => console.error('Error fetching batters:', error));
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedBatter) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/search?batter=${encodeURIComponent(selectedBatter)}`);
      setHits(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {/* Full-width navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Baseball Stats</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('home')}>Baseball Plot</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${activeTab === 'video' ? 'active' : ''}`} href="#" onClick={() => setActiveTab('video')}>Videos</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div className="content-container mt-4">
        {activeTab === 'home' && (
          <div className="container">
            <h1 className="mb-4">Baseball Stats Search</h1>
            <form onSubmit={handleSearch} className="search-form mb-4">
              <div className="form-group">
                <label htmlFor="batter-select">Select a Batter</label>
                <select 
                  id="batter-select"
                  value={selectedBatter} 
                  onChange={(e) => setSelectedBatter(e.target.value)}
                  className="form-select form-select-lg"
                >
                  <option value="">Choose a batter</option>
                  {batters.map(batter => (
                    <option key={batter} value={batter}>{batter}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-3">Search</button>
            </form>

            <main className="app-main mt-4">
              {hits.length > 0 ? (
                <>
                  <p>Hit data available below.</p>
                  <BaseballFieldPlot hits={hits} />
                </>
              ) : (
                <p className="no-results">No results found. Please select a batter and search.</p>
              )}
            </main>
          </div>
        )}

        {activeTab === 'video' && (
          <VideoSearch />
        )}
      </div>
    </div>
  );
}

export default App;
