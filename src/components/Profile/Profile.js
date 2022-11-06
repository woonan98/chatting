import React, { useState } from 'react';
import { authService } from 'fbase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import EditProfile from 'components/EditProfile/EditProfile';


const Profile = ({ userObj }) => {
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    const onClickSignOut = () => {
        signOut(authService);
    }

    const onClickChat = () => {
        navigate('/chat');
    }

    const onClickEdit = () => {
        setEdit(true);
    }

    return (
        <>
            { edit ?
                <EditProfile userObj={userObj} setEdit={setEdit}/>
            : 
                <>
                <img src={userObj.photoURL} width="150px" style={{ borderRadius : "50%" }}/>
                <p>{userObj.displayName}</p>
                <p>{userObj.email}</p>
                <button onClick={onClickSignOut}>LogOut</button>
                <button onClick={onClickChat}>start chat</button>
                <button onClick={onClickEdit}>Edit Profile</button>
                </>
            }
        </>
    )
}

export default Profile;