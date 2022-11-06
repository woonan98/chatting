import React from 'react';


const Chatting = ({ userObj }) => {
    console.log(userObj.photoURL);
    return(
        <>
            <div>
                <img src={userObj.photoURL} width="150px" style={{ borderRadius : "50%" }} />
                <p>{userObj.displayName}</p>
                
            </div>
        </>
    )
}

export default Chatting;