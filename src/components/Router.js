import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Sign from 'routes/Sign';
import Chatting from 'routes/Chatting';
const AppRouter = ({ isLoggined, userObj }) => {
    console.log(`${isLoggined} 로그인 상태`)
    return (
        <>
            <Router>
                <Routes>
                {isLoggined ?
                    <Route path="/" element={<Home userObj={userObj}/>}/>
                :   <Route path="/" element={<Auth />} />
                    }
                    <Route path="/Sign" element={<Sign />} />
                    <Route path="/chat" element={<Chatting />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRouter;