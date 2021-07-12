import React, { Component, useState } from 'react';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';
import ButtonWithProggress from '../components/ButtonWithProggress';
import { withApiProgress } from '../shared/ApiProgress';
import { connect } from 'react-redux';
import { signupHandler } from '../redux/authActions';
const UserSignUpPage = (props) => {
  const [form, setForm] =useState({
    username: null,
    displayName: null,
    password: null,
    repassword: null
  });
  const [errors, setErrors] = useState({});

    const onChange = event => {
      const{ name, value } = event.target;

      setErrors((previousErrors) => ({...previousErrors, [name]: undefined}));
    
      setForm((previousForm) =>({ ...previousForm,[name] : value}));
    };

    const onClickSignup = async event =>{
      event.preventDefault();
      
      const { history, dispatch } = props
      const { push } = history;
            
      const { username, displayName, password } = form;
      const body  = {
      username : username,
      displayName : displayName,
      password : password
    };

      try {
        await dispatch(signupHandler(body));
        push('/');
      } catch (error){
      if(error.response.data.validationErrors){
        setErrors(error.response.data.validationErrors);
          }
       
      }
     
  };

    const { username: usernameError, displayName: displayNameError, password: passwordError, repassword: repasswordError } = errors;
    const { t, pendingApiCall } = props;

    let RepasswordError;
    if(form.password !== form.RepasswordError){
      RepasswordError = t('Password mismatch');
    }
    return(
    <div className = "container">

    <form>

    <h1 className = "text-center">{t('Sign Up')}</h1>
    <Input name ="username" label = {t("Username")} error={ usernameError } onChange={onChange} />
    <Input name ="displayName" label = {t("Display Name")} error={ displayNameError} onChange={onChange} />
    <Input name ="password" label = {t("Password")} error={ passwordError } onChange={onChange} type ="password"/>
    <Input name ="repassword" label = {t("Repassword")} error= { repasswordError } onChange={onChange} type="password"/>
    
    <div className = "text-center">
    <ButtonWithProggress 
    onClick = {onClickSignup} 
    disabled = { pendingApiCall || repasswordError !== undefined }
    pendingApiCall = {pendingApiCall} 
    text = {t('Sign Up')} 
    />
    </div>
    </form>
    </div>)
}
const UserSignUpPageWithApiProgressForSignupRequest= withApiProgress(UserSignUpPage,'/api/1.0/users');
const UserSignUpPageWithApiProgressForAuthRequest = withApiProgress(UserSignUpPageWithApiProgressForSignupRequest,'/api/1.0/auth');
const UserSignUpPageWithTranslation = withTranslation()(UserSignUpPageWithApiProgressForAuthRequest);
export default connect()(UserSignUpPageWithTranslation);
