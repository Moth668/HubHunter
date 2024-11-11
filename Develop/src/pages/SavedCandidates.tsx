import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';

const PotentialCandidates = () => {
  const location = useLocation();
  const initialCandidates: Candidate[] = location.state?.savedCandidates || [];

  // Load candidates from local storage or initial state
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    const parsedCandidates = storedCandidates ? JSON.parse(storedCandidates) : initialCandidates;
    console.log("Loaded saved candidates:", parsedCandidates); // Debugging initial load
    return parsedCandidates;
  });

  const [filterText, setFilterText] = useState(''); // Filter input state
  const [sortOption, setSortOption] = useState(''); // Sort option state

  // Save candidates to local storage whenever savedCandidates changes
  useEffect(() => {
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  // Handle removing a candidate
  const handleReject = (candidateId: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== candidateId);
    setSavedCandidates(updatedCandidates);
  };

  // Filtered and Sorted Candidates
  const displayedCandidates = savedCandidates
  .filter((candidate) =>
    (candidate.name || candidate.login || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (candidate.company || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (candidate.location || '').toLowerCase().includes(filterText.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOption === 'name') {
      return (a.name || '').localeCompare(b.name || '');
    } else if (sortOption === 'location') {
      return (a.location || '').localeCompare(b.location || '');
    } else if (sortOption === 'company') {
      return (a.company || '').localeCompare(b.company || '');
    }
    return 0;
  });


  console.log("Displayed candidates after filter and sort:", displayedCandidates); // Debugging display logic

  return (
    <div className="potential-candidates">
      <h1>Potential Candidates</h1>

      {/* Sorting and Filtering Controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Filter by name, location, or company"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="">Sort by...</option>
          <option value="name">Name</option>
          <option value="location">Location</option>
          <option value="company">Company</option>
        </select>
      </div>

      {displayedCandidates.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Location</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>
                  <img src={candidate.avatar_url} alt={`${candidate.login} avatar`} width={50} />
                </td>
                <td>{candidate.name || candidate.login}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>{candidate.bio || 'N/A'}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    View Profile
                  </a>
                </td>
                <td>
                  <button onClick={() => handleReject(candidate.id)} className="reject-button">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates found.</p>
      )}
    </div>
  );
};

export default PotentialCandidates;
