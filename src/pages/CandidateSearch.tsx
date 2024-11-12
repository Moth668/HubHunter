import React, { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { useNavigate } from 'react-router-dom';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input
  const navigate = useNavigate();

  // Function to fetch a random candidate
  const fetchRandomCandidate = async () => {
    const randomStart = Math.floor(Math.random() * 100000000) + 1;
    const candidates = await searchGithub(randomStart);
    if (candidates.length > 0) {
      const detailedCandidate = await searchGithubUser(candidates[0].login);
      setCandidate(detailedCandidate);
    }
  };

  // Function to fetch a specific candidate by username
  const fetchSpecificCandidate = async (username: string) => {
    try {
      const detailedCandidate = await searchGithubUser(username);
      setCandidate(detailedCandidate);
    } catch (error) {
      console.error("Candidate not found:", error);
      setCandidate(null);
    }
  };

  // Handle the search button click
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // If there's a search term, fetch a specific candidate
      fetchSpecificCandidate(searchTerm.trim());
    } else {
      // If no search term, fetch a random candidate
      fetchRandomCandidate();
    }
  };

  // Handle Save (Green Button)
  const handleSave = () => {
    if (candidate) {
      setSavedCandidates([...savedCandidates, candidate]);
      fetchRandomCandidate();
    }
  };

  // Handle Skip (Red Button)
  const handleSkip = () => {
    fetchRandomCandidate();
  };

  // Navigate to Potential Candidates page with saved candidates
  const goToSavedCandidates = () => {
    navigate('/SavedCandidates', { state: { savedCandidates } });
  };

  return (
    <div className="candidate-search">
      <h1>Candidate Search</h1>

      {/* Search Input and Button */}
      <div className="search-box">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="leave empty for random"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display Candidate Info */}
      {candidate ? (
        <div className="candidate-card">
          <img src={candidate.avatar_url} alt={`${candidate.login} avatar`} className="candidate-avatar" />
          <div className="candidate-info">
            <h2>{candidate.name || candidate.login}</h2>
            <p>Location: {candidate.location ?? 'N/A'}</p>
            <p>Email: {candidate.email ?? 'N/A'}</p>
            <p>Company: {candidate.company ?? 'N/A'}</p>
            <p>Bio: {candidate.bio ?? 'N/A'}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
          <div className="action-buttons">
            <button className="reject-button" onClick={handleSkip}>-</button>
            <button className="save-button" onClick={handleSave}>+</button>
          </div>
        </div>
      ) : (
        <p>No candidate found. Try another search.</p>
      )}

      {/* Button to navigate to Potential Candidates page */}
      <button onClick={goToSavedCandidates}>View Potential Candidates</button>
    </div>
  );
};

export default CandidateSearch;
