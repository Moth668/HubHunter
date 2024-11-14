import { Link } from "react-router-dom";

const Nav: FC = () => {
  return (
    <nav>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/SavedCandidates">Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
