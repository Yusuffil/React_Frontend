import React, { Component } from 'react';
import { signup } from '../api/apiCalls' ;
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';
import ButtonWithProggress from '../components/ButtonWithProggress';
import { withApiProgress } from '../shared/ApiProgress';
class UserSignUpPage extends React.Component{
  state = {
    username: null,
    displayName: null,
    password: null,
    repassword: null,
    errors: {}
  };

    onChange = event => {
    const { t } = this.props;
    const{ name, value } = event.target;
    const errors = {...this.state.errors}
    errors[name] = undefined
    if(name === 'password' || name==='repassword'){
      if(name === 'password'&& value !==this.state.repassword ){
        errors.repassword = t('Password mismatch');
      }else if(name === 'repassword' && value !== this.state.password){
        errors.repassword = t('Password mismatch');
      }else {
        errors.repassword = undefined;
      }
    }
      this.setState({
        [name]: value,
        errors
      });
    };

    onClickSignup = async event =>{
      event.preventDefault();
      const { username, displayName, password } = this.state;
      const body  = {
      username : username,
      displayName : displayName,
      password : password
    };

      try {
        const response = await signup(body);
      } catch (error){
      if(error.response.data.validationErrors){
        this.setState({ errors: error.response.data.validationErrors });
      }
       
      }
     
  };

  render(){
    const { t, pendingApiCall } = this.props;
    const { errors } = this.state;
    const { username, displayName, password, repassword } = errors;
    return(
    <div className = "container">

    <form>

    <h1 className = "text-center">{t('Sign Up')}</h1>
    <Input name ="username" label = {t("Username")} error={ username } onChange={this.onChange} />
    <Input name ="displayName" label = {t("Display Name")} error={ displayName } onChange={this.onChange} />
    <Input name ="password" label = {t("Password")} error={ password } onChange={this.onChange} type ="password"/>
    <Input name ="repassword" label = {t("Repassword")} error= { repassword } onChange={this.onChange} type="password"/>
    
    <div className = "text-center">
    <ButtonWithProggress 
    onClick = {this.onClickSignup} 
    disabled = { pendingApiCall || repassword !== undefined }
    pendingApiCall = {pendingApiCall} 
    text = {t('Sign Up')} 
    />
    </div>
    </form>
    </div>)
  
    
  };
}
const UserSignUpPageWithApiProgress= withApiProgress(UserSignUpPage,'/api/1.0/users');
const UserSignUpPageWithTranslation = withTranslation()(UserSignUpPageWithApiProgress);
export default UserSignUpPageWithTranslation;
