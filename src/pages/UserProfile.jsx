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
                console.log(response);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/messages/${username}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, [username]);

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
            paddingTop: "100px"
        }}>
            {userData ? (
                <>
                    <h2>{userData.username}</h2>
                    <img
                        src={userData.profileImage}
                        alt={userData.username}
                        style={{width: 300, height: 300, borderRadius: '50%', border: "1px solid black"}}
                    />
                    {loggedInUsername !== username && (
                        <form style={{display: "grid", marginTop: '20px'}} onSubmit={handleSendMessage}>
                            <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                                      placeholder="Type your message here..." required></textarea>
                            <button type="submit">Send Message</button>
                        </form>
                    )}
                    <div style={{width: "100%", marginTop: "20px", padding: "15px"}}>
                        <h3>Messages</h3>
                        {messages.length > 0 ? (
                            <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr", columnGap: "10px",}}>
                                {messages.map((message, index) => (
                                    <div key={index} style={{
                                        border: "1px solid black",
                                        backgroundColor: "rgba(203,246,189,0.33)",
                                        borderRadius: "10px",
                                        margin: "10px 0",
                                        padding: "10px"
                                    }}>
                                        <h4>{message.sender}:</h4>
                                        <p>{message.content}</p>
                                        <p style={{
                                            fontSize: "0.8em",
                                            color: "#888"
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
