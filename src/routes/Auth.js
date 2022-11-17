import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, db, storage } from 'fbase';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import LoginForm from 'components/LoginForm/LoginForm';

const Auth = () => {
    const navigate = useNavigate();

    const onClickSocial = async (e) => {
        const {
            target : { name },
        } = e;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github"){
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(authService, provider)
        .then((result) => {
            const user = result.user;
            setDoc(doc(db, "user", `${user.uid}`), {
                avatarUrl: user.photoURL
            });
        });
    }

    const onClickSign = () => {
        navigate("/Sign");
    }

    return (
        <>
            <LoginForm />
            <button onClick={onClickSign}>회원가입</button>
            <button name="google" onClick={onClickSocial}>Login on Google</button>
            <button name="github" onClick={onClickSocial}>Login on Github</button>
        </>
    )
}

export default Auth;