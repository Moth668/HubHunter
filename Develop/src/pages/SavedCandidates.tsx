import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';

const PotentialCandidates = () => {
  const location = useLocation();
  const initialCandidates: Candidate[] = location.state?.savedCandidates || [];
  
  // Load candidates from local storage, or fall back to initial candidates
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    const storedCandidates = localStorage.getItem('savedCandidates');
    return storedCandidates ? JSON.parse(storedCandidates) : initialCandidates;
  });

  // Save candidates to local storage whenever savedCandidates changes
  useEffect(() => {
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  // Function to handle removing a candidate
  const handleReject = (candidateId: number) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== candidateId);
    setSavedCandidates(updatedCandidates);
  };

  return (
    <div className="potential-candidates">
      <h1>Potential Candidates</h1>

      {savedCandidates.length > 0 ? (
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
            {savedCandidates.map((candidate) => (
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
        <p>No candidates saved.</p>
      )}
    </div>
  );
};

export default PotentialCandidates;
