import React from 'react';
import classes from './SignUp.module.scss';
import Auth from '../../container/Auth/Auth';


const SignUp = () => {
    return (
        <div className={classes.SignUp}>
            <Auth isLoginMode={false}/>
        </div>)
};


export default SignUp;