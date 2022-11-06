import React, { useState } from 'react';
import { authService } from 'fbase';
import { updateProfile } from 'firebase/auth';

const EditProfile = ({ userObj, setEdit }) => {
    const [changeName, setChangeName] = useState(userObj.displayName);
    const [fileImage, setFileImage] = useState(userObj.photoURL);

    const onChangeInput = (e) => {
        const { target : { value } } = e;
        setChangeName(value);
    }

    const saveFileImage = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
    }

    const deleteFileImage = () => {
        URL.revokeObjectURL(fileImage);
        setFileImage("");
    }

    const onClickUpdateProfile = async(e) => {
        e.preventDefault();
        await updateProfile(authService.currentUser, {
            displayName: `${changeName}`, photoURL: `${fileImage}`
        })
        setEdit(false);
        window.location.reload(true);
    }

    return (
        <>
            <form>
                {fileImage &&
                    <img 
                        src={fileImage}
                        width="50px"
                        heihgt="50px"
                    />
                }
                <input type="file" 
                    accept="image/*"
                    onChange={saveFileImage}   
                />
                <input 
                    type="text"
                    value={changeName}
                    onChange={onChangeInput}    
                />
            <input type="submit"
                onClick={onClickUpdateProfile}
            />
            </form>
        </>
    )
}


export default EditProfile;