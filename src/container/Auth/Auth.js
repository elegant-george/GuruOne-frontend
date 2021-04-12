import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Auth.module.scss';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/validators';
import { useForm } from '../../shared/hooks/form-hook';


const Auth = (props) => {
  const formTemplate = props.isLoginMode? 
    {
      email: {value: '', isValid: false},
      password: {value: '', isValid: false}
    } :
    {
      email: {value: '', isValid: false},
      password: {value: '', isValid: false},
      name: {value: '', isValid: false},
      icon: {value: null, isValid: false}
    };

  const [formState, inputHandler] = useForm(formTemplate, false);

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (props.isLoginMode) {
      try {

        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        props.onAuth(formData, props.isLoginMode);
      } catch (err) { console.log(err)}
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('icon', formState.inputs.icon.value);
        props.onAuth(formData, props.isLoginMode);
      } catch (err) {}
    }

  };

  return (
    <div className={classes.Auth}>
      {props.loading ? <Spinner size="Big" /> :
        <form onSubmit={authSubmitHandler}>
          {!props.isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          {!props.isLoginMode && (
            <ImageUpload
              center
              icon
              id="icon"
              onInput={inputHandler}
              buttonText="Pick Icon"
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <button className={classes.Submit} type="submit" disabled={!formState.isValid}>
            <input type="submit" style={{display: "none"}} />
            {props.isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </button>
        </form>
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isLogined: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (authForm, isLoginMode) =>
      dispatch(actions.auth(authForm, isLoginMode)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    onClearError: () => dispatch(actions.authClearError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);