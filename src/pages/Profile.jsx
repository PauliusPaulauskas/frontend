import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);
    const secretCode = localStorage.getItem('secretCode');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/profile?secretCode=${secretCode}`);
                setUser(response.data);
                console.log(response.data);
            } catch (error) {
                alert('Error fetching user data:', error.response.data.message);
            }
        };

        if (secretCode) {
            fetchUserData();
        }
    }, [secretCode]);

    const handleProfileImageUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/profile', {
                secretCode,
                imageUrl: user.profileImage,
            });
            alert(response.data.message);
            setUser(response.data.user);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleUsernameUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/profile', {
                secretCode,
                newUsername,
            });
            alert(response.data.message);
            setUser(response.data.user);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3000/profile', {
                secretCode,
                newPassword,
            });
            alert(response.data.message);
            setNewPassword('');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
            <div style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                {user ? (
                    <>
                        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{user.username} Profile</h1>
                        <img
                            src={user.profileImage}
                            alt={user.username}
                            style={{ width: 300, height: 300, borderRadius: '50%', border: "1px solid black" }}
                        />
                        <h3>{user.username}</h3>

                        <input
                            type="text"
                            value={user.profileImage}
                            onChange={(e) => setUser({ ...user, profileImage: e.target.value })}
                            placeholder="New Profile Image URL"
                        />
                        <button onClick={handleProfileImageUpdate}>Update Image</button>

                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="New Username"
                        />
                        <button onClick={handleUsernameUpdate}>Update Username</button>

                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                        />
                        <button onClick={handlePasswordUpdate}>Update Password</button>
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>

    );
}

export default Profile;
