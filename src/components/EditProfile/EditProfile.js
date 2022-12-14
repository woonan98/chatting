import React, { useEffect, useState } from 'react';
import { authService, storage, db } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString, deleteObject } from 'firebase/storage';

const EditProfile = ({ userObj, setEdit }) => {
    const [changeName, setChangeName] = useState(userObj.displayName);
    const [fileImage, setFileImage] = useState("");
    const [userAvatar, setUserAvatar] = useState("");


    useEffect(()=>{
        const getUserDoc = async() => {
            const userRef = doc(db, "user", `${userObj.uid}`);
            const docSnap = await getDoc(userRef);
            setUserAvatar(docSnap.data().avatarUrl);
        }
        getUserDoc();
    },[]);


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
        const ok = window.confirm("프로필을 변경하시겠습니까?");
        if(ok) {
            let attachmentURL = "";
            const avatarRef = ref(storage, `${userObj.uid}/avatar`);
            await deleteObject(avatarRef);
            const response = await uploadString(avatarRef, fileImage, 'data_url');
            attachmentURL = await getDownloadURL(response.ref);
            const testRef = doc(db, "user", `${userObj.uid}`);
            await updateDoc(testRef, {
            avatarUrl: `${attachmentURL}`
            });
            await updateProfile(authService.currentUser, {
                displayName: `${changeName}`, photoURL: `${attachmentURL}`
            });
            setEdit(false);
            window.location.reload(true);
        }
    }

    return (
        <>
            <form>
                { fileImage ?
                    <img 
                        src={fileImage}
                        width="150px"
                        style={{ borderRadius : "50%" }}
                    />
                :       
                    <img 
                        src={userAvatar}
                        width="150px"
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
        </>
    )
}


export default EditProfile;