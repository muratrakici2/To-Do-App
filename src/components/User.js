import React from 'react'
import UserImage from "../images/avatar.jpg"

const User = () => {
    const user = localStorage.getItem("user");
    const result = JSON.parse(user);
    const userDelete = () => {
        localStorage.removeItem('user');
        window.location.reload();
    }
    return (
        <div className="userpage">
            <div className="user">
                <img src={UserImage} alt="avatar" />
                <div className="username">
                    <h3>{result.name}</h3>
                    <h3>{result.surname}</h3>
                </div>
                <button onClick={userDelete}>EXIT</button>
            </div>
        </div>
    )
}

export default User
