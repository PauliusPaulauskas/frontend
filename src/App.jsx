import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import UserList from './pages/UserList.jsx';
import Navbar from './components/Navbar.jsx';
import UserProfile from "./pages/UserProfile.jsx";
import Conversations from "./pages/Conversations.jsx";
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/users" element={<UserList />} />
                    <Route path="/users/:username" element={<UserProfile />} />
                    <Route path="/conversations/:username" element={<Conversations />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
