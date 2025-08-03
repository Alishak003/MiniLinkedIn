import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { logout } from "../services/authService";
import { List, X } from "phosphor-react";
import "../css/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid || null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    logout();
    setUserId(null);
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="nav-logo">MiniLinkedIn</h2>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><Link to="/feed" onClick={() => setMenuOpen(false)}>Feed</Link></li>
          {userId && <li><Link to={`/profile/${userId}`} onClick={() => setMenuOpen(false)}>Profile</Link></li>}
          {!userId && <li><Link to="/" onClick={() => setMenuOpen(false)}>Login</Link></li>}
        </ul>
      </div>

      {userId && (
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
      )}
    </nav>
  );
};

export default Navbar;
