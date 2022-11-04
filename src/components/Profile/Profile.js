import React from 'react';
import { authService } from 'fbase';
import { signOut } from 'firebase/auth';

const Profile = ({ userObj }) => {
    const onClickSignOut = () => {
        signOut(authService);
    }
    return (
        <>
        <img src={userObj.photoURL} style={{ borderRadius : "50%" }}/>
        <p>{userObj.displayName}</p>
        <p>{userObj.email}</p>
        <button onClick={onClickSignOut}>LogOut</button>
        </>
    )
}

export default Profile;