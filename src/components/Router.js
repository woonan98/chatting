import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from 'components/Home/Home';
import Sign from 'components/Sign/Sign';
const AppRouter = ({ isLoggined }) => {
    return (
        <>
            <Router>
                <Routes>
                {isLoggined ?
                    <Route path="/" element={<div>asd</div>}/>
                : null}
                    <Route path="/" element={<Home />} />
                    <Route path="/Sign" element={<Sign />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRouter;