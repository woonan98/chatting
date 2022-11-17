import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { authService, storage, db } from 'fbase';
import { doc, setDoc } from 'firebase/firestore';

const SignForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickName, setNickName] = useState("");
    const [avatar, setAvatar] = useState("");

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            let data;
            let avatarUrl = "";
            data = await createUserWithEmailAndPassword(
                authService, email, password
                );
                const avatarRef = await ref(storage, `${data.user.uid}/avatar`);
                const response = await uploadString(avatarRef, avatar, 'data_url');
                avatarUrl = await getDownloadURL(response.ref);
                const userData = {
                    avatarUrl,
                };
                await setDoc(doc(db, "user", `${data.user.uid}`), userData);
                await updateProfile(data.user, {
                    displayName: `${nickName}`, photoURL : `${avatarUrl}`
                });
        }catch(error){
            console.log(error.message);
        }
        
    }
    const onChangeFile = (e) => {
        const { target : { files } } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget : { result } } = finishedEvent;
            setAvatar(result);
        }
        reader.readAsDataURL(theFile);
    }

    const onChangeInput = (e) => {
        const { target : { value, name } } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        } else if (name === "nickName"){
            setNickName(value);
        }
    }

    return (
        <form>
                <img src={avatar} width="150px" style={{ borderRadius : "50%" }}/>
                <input 
                    type="file"
                    except="image/*"
                    onChange={onChangeFile} 
                />
                <input 
                    type="text"
                    value={nickName}
                    onChange={onChangeInput}
                    name="nickName" 
                />
                <input 
                    type="text"
                    onChange={onChangeInput}
                    value={email}
                    name="email"
                />
                <input 
                    type="password"
                    onChange={onChangeInput}
                    value={password}
                    name="password"
                />
                <input 
                    type="submit" 
                    onClick={onSubmit}
                />
        </form>
    )
}

export default SignForm;