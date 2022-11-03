import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService } from 'fbase';

const SignForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            let data;
            data = await createUserWithEmailAndPassword(
                authService, email, password
                );
                console.log(data);
        }catch(error){
            console.log(error.message);
        }
        
    }
    

    const onChangeInput = (e) => {
        const { target : { value, name } } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }
    }

    return (
        <form>
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