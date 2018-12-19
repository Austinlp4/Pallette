import React, { Component } from 'react';
import { Route, withRouter, NavLink } from 'react-router-dom';
import styled from 'styled-components';
// import Pallette from '../src/components/pallette/Pallette';
// import Featured from './components/featured/Featured';
// import firebase, { auth, provider } from './firebase.js';
import SignUp from './components/signin/Signup';
import Login from './components/signin/Signin';
import MainPage from './components/Home/MainPage';
import Register from './components/signin/Register';
import * as ROUTES from '../src/components/routes';
import firebase from './firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  newUser = (
    email,
    firstName,
    lastName,
    street,
    city,
    state,
    zipCode
  ) => {
    let info = {
        firstName,
        lastName,
        email,
        street,
        city,
        state,
        zipCode
    };
    const ref = firebase.database().ref('users');
    ref.push(info);
    this.setState({ user: { firstName: info.firstName, email: info.email} })
  }

  setUser = (
    uid,
    email,
    firstName,
    lastName,
  ) => {
    let user = {
      uid,
      email,
      firstName,
      lastName,
    };
    this.setState({ user: 
        { uid: user.uid, 
          firstName: user.firstName, 
          email: user.email, 
          lastName: user.lastName } 
        });
  }

  render() {
    return (
      <Home className="App">
      <Nav>
       <h1>Pallette</h1>
       {this.state.user
       ? null
       :
       <div>
       <NavLink to='/signup'>
         Sign Up
       </NavLink>
       <NavLink to='/signin'>
         Sign In
       </NavLink>
       </div>
       }
       </Nav>
        <div className="one">
          <div className="two">
            <div className="three">
              {/* <Pallette />
              <Call>
              <h1>^</h1>
              <h2>This Week's Pallete</h2>
              </Call>
              <Featured /> */}
              <Route exact path={ROUTES.LANDING} component={MainPage}/>
              <Route path='/signup' component={SignUp}/>
              <Route path={ROUTES.SIGN_IN} 
                render={props => (
                  <Login {...props} setUser={this.setUser}/>
                )}
                />
              <Route
                path="/register"
                render={props => (
                  <Register {...props} newUser={this.newUser} />
                )}
              />
            </div>
          </div>
        </div>
      </Home>
    );
  }
}

const Home = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  z-index: 4;
  .one, .two, .three{
    box-shadow: 0 9px 0px 0px white, 
    inset 0 -9px 0px 0px white, 
    inset 10px 0 15px -4px rgba(31, 73, 125, 0.2),
    inset -10px 0 15px -4px rgba(31, 73, 125, 0.2);
    display: flex;
    justify-content: center;
    width: 90%;
    

  }
  .three{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

const Nav = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  a{
    text-decoration: none;
    color: black;
    font-size: 1.1rem;
    font-weight: bold;
  }
`;

export default withRouter(App);