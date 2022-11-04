import React, { useState } from 'react';
import { authService } from 'fbase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Profile from 'components/Profile/Profile';

const Home = ({ userObj }) => {

    const navigate = useNavigate();

    const onClickSignOut = () => {
        signOut(authService);
        
    }

    return (
        <>
            <Profile userObj={userObj} />
        </>
    )
}

export default Home;