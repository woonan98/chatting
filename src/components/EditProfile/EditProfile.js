import React, { useState } from 'react';
import { authService, storage, db } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const EditProfile = ({ userObj, setEdit }) => {
    const [changeName, setChangeName] = useState(userObj.displayName);
    const [fileImage, setFileImage] = useState("");

    const onChangeInput = (e) => {
        const { target : { value } } = e;
        setChangeName(value);
    }

    const onChangeFile = (e) => {
        const { target : { files } } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget : { result } } = finishedEvent;
            setFileImage(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onClickUpdateProfile = async(e) => {
        e.preventDefault();
        await updateProfile(authService.currentUser, {
            displayName: `${changeName}`, photoURL: `${fileImage}`
        })
        setEdit(false);
        window.location.reload(true);
    }

    const onClickStorage = async(e) => {
        e.preventDefault();
        let attachmentURL = "";
            try {
                const imagesRef = ref(storage, `${userObj.uid}/avartar`);
                const response = await uploadString(imagesRef, fileImage, 'data_url')
                attachmentURL = await getDownloadURL(response.ref);
            } catch (error) {
                console.log(error);
            }
    }


    return (
        <>
            <form>
                { fileImage &&
                    <img 
                    src={fileImage}
                    width="150px"
                    heihgt="50px"
                    style={{ borderRadius : "50%" }}
                />
                }
                <input type="file" 
                    accept="image/*"
                    onChange={onChangeFile}   
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
            <button onClick={onClickStorage}>asd</button>
        </>
    )
}


export default EditProfile;