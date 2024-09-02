import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setUsers(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            paddingTop: "100px",
        }}>
            <h1 style={{textAlign: "center", marginBottom: "20px"}}>User List</h1>
            <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", padding: "20px"}}>
                {users.map(user => (
                    <div style={{textAlign: "center"}} key={user.username}>
                        <Link to={`/users/${user.username}`}>
                            <img src={user.profileImage} alt={user.username}
                                 style={{
                                     width: 200,
                                     height: 200,
                                     borderRadius: "5px",
                                     border: "1px solid black"
                                 }}/>
                            <p>{user.username}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;
