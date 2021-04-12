import React from 'react';
import classes from './LogIn.module.scss';
import Auth from '../../container/Auth/Auth';


const LogIn = () => {
    return (
        <div className={classes.LogIn}>
            <Auth isLoginMode={true}/>
        </div>)
};


export default LogIn;