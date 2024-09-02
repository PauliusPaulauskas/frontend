import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');
    const nav = useNavigate();

    const validatePassword = (password) => {
        const lengthValid = password.length >= 4 && password.length <= 20;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*_+]/.test(password);
        return lengthValid && hasUpperCase && hasSpecialChar;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3000/register', { username, password1, password2 });
            localStorage.setItem('secretCode', response.data.secretCode);
            setMessage(response.data.message);

        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'An error occurred.');
        } finally {

        }
    };

    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            border: '2px outset darkgray',
            borderRadius: '10px',
            paddingTop: '120px'
        }}>
            <h1 style={{textAlign: "center", marginBottom: "20px"}}>Register</h1>
            {message && <p>{message}</p>}
            <form style={{textAlign: 'center', border: '2px outset darkgray', padding: '50px', borderRadius: '10px'}} onSubmit={handleRegister}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required/>
                <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} placeholder="Password" required/>
                <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Confirm Password" required/>
                <button className='postLink' type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
