import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Sign from 'routes/Sign';
const AppRouter = ({ isLoggined, userObj }) => {
    return (
        <>
            <Router>
                <Routes>
                {isLoggined ?
                    <Route path="/" element={<Home userObj={userObj}/>}/>
                :   <Route path="/" element={<Auth />} />
                    }
                    <Route path="/Sign" element={<Sign />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRouter;