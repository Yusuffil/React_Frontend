import React from 'react';
import LanguageSelector from "../components/LanguageSelector";
import UserSignupPage from '../pages/UserSignUpPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import{ HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import TopBar from '../components/TopBar';

class App extends React.Component {
  state={
    isLoggedIn: false,
    username: undefined
};

  onLoginSuccess = (username) => {
    this.setState({
      username,
      isLoggedIn: true
    });
  };

  onLogoutSuccess = () =>{
    this.setState({
      isLoggedIn: false,
      username: undefined
    })
  }
  render(){
    const { isLoggedIn, username } = this.state;
    return (
      <div>   
          <HashRouter>
            <TopBar username={username} isLoggedIn={isLoggedIn} onLogoutSuccess={this.onLogoutSuccess}/>
          <Switch>
          <Route exact path="/" component={HomePage}/>
         
         {!isLoggedIn && (
          <Route path="/login" component={(props) =>{
             return <LoginPage{...props} onLoginSuccess={this.onLoginSuccess}/>
          }}
        />
       )}
          <Route path="/signup" component={UserSignupPage}/>
          <Route path="/user/:username" 
          component={props => {
            return <UserPage {...props} username= {username} />
          }}
        />
          <Redirect to="/"/>
          </Switch>
          </HashRouter>
      <LanguageSelector/>
      </div>
    );
  }
  }


export default App;
