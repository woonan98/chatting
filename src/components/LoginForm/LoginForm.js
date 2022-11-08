import React, { useState } from 'react';
import { authService } from 'fbase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");

    const onChangeInput = (e) => {
        const { target : { value, name } } = e;
        if (name == "userId") {
            setUserId(value);
        } else if (name == "password"){
            setPassword(value);
        }
    }
    
    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(
                authService, userId, password
            )
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <form>
                <div>
                    <input type="text"
                        onChange={onChangeInput}
                        value={userId}
                        name="userId"
                    />
                    <input type="password"
                        onChange={onChangeInput}
                        value={password}
                        name="password"
                    />
                    <input 
                        type="submit" 
                        onClick={onSubmit}
                    />
                </div>
            </form>
        </>
    )
}

export default LoginForm;