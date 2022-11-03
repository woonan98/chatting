import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from 'fbase';
import Auth from 'routes/Auth';
import './Home.module.css';

const Home = () => {
    return (
        <>
            <Auth />
        </>
    )
}

export default Home;