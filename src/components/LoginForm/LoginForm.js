import React, { useState } from 'react';

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
                    <input type="submit" />
                </div>
            </form>
        </>
    )
}

export default LoginForm;