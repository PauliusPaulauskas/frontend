import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Conversations() {
    const {username } = useParams();
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);


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
                        style={{width: 150, height: 150, borderRadius: '50%', border: "1px solid black"}}
                    />
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

export default Conversations;
