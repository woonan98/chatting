import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from 'fbase';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
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
        await signInWithPopup(authService, provider);
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