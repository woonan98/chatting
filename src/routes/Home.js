import React, { useState } from 'react';
import { authService } from 'fbase';
import { signOut } from 'firebase/auth';
import Profile from 'components/Profile/Profile';
import EditProfile from 'components/EditProfile/EditProfile';

const Home = ({ userObj }) => {
    const [edit, setEdit] = useState(false);

    return (
        <>
                <Profile userObj={userObj} edit={edit} />
        </>
    )
}

export default Home;