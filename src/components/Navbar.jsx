import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const loggedInUsername = localStorage.getItem('username');
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('secretCode');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav style={{position:"fixed", }} className="toolbar">
            <div style={{display:"flex", gap:"25px", alignItems:"center"}}>
                {!loggedInUsername && (
                    <div>
                        <button><Link className="nav-link" to="/">Register</Link></button>
                        <button><Link className="nav-link" to="/login">Login</Link></button>
                    </div>
                )};
                {localStorage.getItem('secretCode') && (
                    <div style={{display: "flex", gap:"10px", alignItems:"center"}}>
                        <button><Link className="nav-link" to="/profile">Profile</Link></button>
                        <button className="nav-link" onClick={handleLogout}>x</button>
                        <button><Link className="nav-link" to="/users">User List</Link></button>
                        <button><Link className="nav-link" to={`/conversations/${loggedInUsername}`}>Conversations</Link></button>
                    </div>
                )};

            </div>
        </nav>
    );
}

export default Navbar;