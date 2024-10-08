// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/userStore'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {setUser} = userStore()

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', { username, password });
            setUser(response.data); // Set user data in Zustand store
            localStorage.setItem('secretCode', response.data.secretCode);
            localStorage.setItem('username', response.data.username);
            setMessage(response.data.message);
            setTimeout(() => {
                setMessage('');
                navigate('/profile'); // Navigate to profile after successful login
            }, 1000);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", border: '2px outset darkgray', borderRadius: '10px', paddingTop: '120px' }}>
            <h1>Login</h1>
            {message && <p>{message}</p>}
            <form style={{ textAlign: "center", border: '2px outset darkgray', borderRadius: '10px', padding: '50px' }} onSubmit={handleLogin}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button className='postLink' type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
