import React from 'react';
import LanguageSelector from "../components/LanguageSelector";
import UserSignupPage from '../pages/UserSignUpPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import TopBar from '../components/TopBar';

class App extends React.Component {
 
  render(){
    const isLoggedIn = false;
    const username = undefined;
   // const { isLoggedIn, username } = this.state;
    return (
      <div>   
          <Router>
            <TopBar/>
          <Switch>
          <Route exact path="/" component={HomePage}/>
         {!isLoggedIn && (
          <Route path="/login" component={(props) =>{
             return <LoginPage {...props} onLoginSuccess={this.onLoginSuccess}/>
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
          </Router>
      <LanguageSelector/>
      </div>
    );
  }
  }


export default App;
