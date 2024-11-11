// const Nav = () => {
//   // TODO: Add necessary code to display the navigation bar and link between the pages
//   return (
//     <div>Nav</div>

//   )
// };

// export default Nav;

// import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="'/SavedCandidates'">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
