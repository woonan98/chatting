import React, { useState } from 'react';
import Profile from 'components/Profile/Profile';


const Home = ({ userObj }) => {
    const [edit, setEdit] = useState(false);
    
    return (
        <>
                <Profile userObj={userObj} edit={edit} />
        </>
    )
}

export default Home;