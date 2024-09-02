import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserProfile() {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const loggedInUsername = localStorage.getItem('username');
    const secretCode = localStorage.getItem('secretCode');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${username}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/messages/${username}`, {
                    headers: { Authorization: `Bearer ${secretCode}` } // Adjust if using a different method for auth
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [username, secretCode]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (username === loggedInUsername) {
            alert("You can't send a message to yourself.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/messages', {
                recipient: username,
                message: newMessage,
                secretCode
            });
            setMessages([...messages, { sender: loggedInUsername, content: newMessage, timestamp: new Date().toISOString() }]);
            setNewMessage('');
            alert(response.data.message);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            paddingTop: "50px",
            backgroundColor: "#f4f4f4"
        }}>
            {userData ? (
                <>
                    <h2>{userData.username}</h2>
                    <img
                        src={userData.profileImage}
                        alt={userData.username}
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            border: "2px solid #ddd",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            marginBottom: '20px'
                        }}
                    />
                    {loggedInUsername !== username && (
                        <form style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                            maxWidth: "600px"
                        }} onSubmit={handleSendMessage}>
                            <textarea 
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your message here..."
                                required
                                style={{
                                    width: "100%",
                                    height: "100px",
                                    padding: "10px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    resize: "none",
                                    fontSize: "16px",
                                    marginBottom: "10px"
                                }}
                            ></textarea>
                            <button 
                                type="submit"
                                style={{
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "8px",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    fontSize: "16px",
                                    cursor: "pointer"
                                }}
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                    <div style={{
                        width: "100%",
                        maxWidth: "600px",
                        marginTop: "20px",
                        padding: "10px",
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                        maxHeight: "600px",
                        overflowY: "auto" // Enables vertical scrolling
                    }}>
                        <h3>Messages</h3>
                        {messages.length > 0 ? (
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px"
                            }}>
                                {messages.map((message, index) => (
                                    <div key={index} style={{
                                        border: "1px solid #ddd",
                                        backgroundColor: "#f9f9f9",
                                        borderRadius: "8px",
                                        padding: "10px",
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                                    }}>
                                        <div style={{
                                            fontWeight: "bold",
                                            marginBottom: "5px"
                                        }}>{message.sender}:</div>
                                        <p style={{ margin: "0 0 5px 0" }}>{message.content}</p>
                                        <p style={{
                                            fontSize: "0.8em",
                                            color: "#888",
                                            margin: "0"
                                        }}>{new Date(message.timestamp).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No messages yet.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default UserProfile;
