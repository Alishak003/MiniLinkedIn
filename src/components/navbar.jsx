import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import { logout } from "../services/authService";
import { auth } from "../config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // for hamburger toggle

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    logout();               // sign out user (assumes it clears Firebase auth)
    setUserId(null);        // clear local userId
    setMenuOpen(false);     // close mobile menu
    navigate("/");          // redirect to login/home page
  };

  return (
    <nav className="navbar">
      {/* Hamburger & Logo Section */}
      <div className="nav-left">
        <h2 className="nav-logo">MiniLinkedIn</h2>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        {/* <li><Link to="/" onClick={() => setMenuOpen(false)}>Feed</Link></li> */}
        {userId && (
          <li><Link to={`/profile/${userId}`} onClick={() => setMenuOpen(false)}>Profile</Link></li>
        )}
        {!userId && (
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Login</Link></li>
        )}
        {userId && (
          <li><button onClick={handleLogout} className="logout-link">Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
