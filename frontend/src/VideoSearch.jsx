import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoSearch = () => {
  const [batters, setBatters] = useState([]);
  const [selectedBatter, setSelectedBatter] = useState('');
  const [selectedPitcher, setSelectedPitcher] = useState('');
  const [batterData, setBatterData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get list of batters on component mount
  useEffect(() => {
    axios.get('https://braves.onrender.com/api/batters')
      .then(response => {
        setBatters(response.data);
      })
      .catch(error => console.error('Error fetching batters:', error));
  }, []);

  // When batter is selected, fetch their data
  const handleBatterChange = async (e) => {
    const batter = e.target.value;
    setSelectedBatter(batter);
    setSelectedPitcher(''); // Reset pitcher selection
    setBatterData([]); // Reset data

    if (!batter) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://braves.onrender.com/api/search?batter=${encodeURIComponent(batter)}`);
      setBatterData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique pitchers from the batter's data
  const getPitchers = () => {
    const uniquePitchers = [...new Set(batterData.map(row => row.PITCHER))].sort();
    return uniquePitchers;
  };

  // Get videos for selected batter and pitcher
  const getVideos = () => {
    if (!selectedBatter || !selectedPitcher) return [];
    return batterData.filter(row => 
      row.PITCHER === selectedPitcher && row.VIDEO_LINK
    );
  };

  return (
    <div className="container">
      <h1 className="mb-4">Baseball Video Search</h1>
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <label htmlFor="batter-select" className="form-label">Select Batter</label>
          <select
            id="batter-select"
            className="form-select"
            value={selectedBatter}
            onChange={handleBatterChange}
          >
            <option value="">Choose a batter</option>
            {batters.map(batter => (
              <option key={batter} value={batter}>{batter}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="pitcher-select" className="form-label">Select Pitcher</label>
          <select
            id="pitcher-select"
            className="form-select"
            value={selectedPitcher}
            onChange={(e) => setSelectedPitcher(e.target.value)}
            disabled={!selectedBatter || loading}
          >
            <option value="">
              {loading ? 'Loading...' : selectedBatter ? 'Choose a pitcher' : 'Select a batter first'}
            </option>
            {getPitchers().map(pitcher => (
              <option key={pitcher} value={pitcher}>{pitcher}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="video-results">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            {selectedBatter && selectedPitcher && (
              <div className="row">
                {getVideos().map((video, index) => (
                  <div key={index} className="col-md-6 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{video.BATTER} vs {video.PITCHER}</h5>
                        <div className="card-text">
                          <p className="mb-1">Date: {video.GAME_DATE}</p>
                          <p className="mb-1">Exit Speed: {video.EXIT_SPEED.toFixed(1)} mph</p>
                          <p className="mb-1">Launch Angle: {video.LAUNCH_ANGLE.toFixed(1)}°</p>
                          <p className="mb-1">Hit Distance: {video.HIT_DISTANCE.toFixed(1)} ft</p>
                          <p className="mb-1">Outcome: {video.PLAY_OUTCOME}</p>
                        </div>
                        <a href={video.VIDEO_LINK} className="btn btn-primary mt-2" target="_blank" rel="noopener noreferrer">
                          Watch Video
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VideoSearch;