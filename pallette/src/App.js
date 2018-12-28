import React, { Component } from 'react';
import { Route, withRouter, NavLink } from 'react-router-dom';
import styled from 'styled-components';
// import Pallette from '../src/components/pallette/Pallette';
// import Featured from './components/featured/Featured';
// import firebase, { auth, provider } from './firebase.js';
import Logo from './images/pallete-logo.png';
import SignUp from './components/signin/Signup';
import Login from './components/signin/Signin';
import MainPage from './components/Home/MainPage';
import Register from './components/signin/Register';
import * as ROUTES from '../src/components/routes';
import firebase, { auth } from './firebase';
import Profile from './components/profile/Profile';
import { connect } from 'react-redux';
import NavBar from './components/Nav/Nav.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      userCred: null,
      user: ''
    }
  }

  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(user=>{
      if(user){
        // console.log(user.uid)
        this.itemsRef = firebase.database().ref(`users/${user.uid}`)
        this.itemsRef.on('value', data => {
          this.setState({ 
            user: data.val(),
          })
        })
      } 
    })
    }
  


  newUser = (
    uid,
    email,
    firstName,
    lastName,
    street,
    city,
    state,
    zipCode
  ) => {
    let info = {
        uid,
        firstName,
        lastName,
        email,
        street,
        city,
        state,
        zipCode
    };
    const ref = firebase.database().ref(`users/${info.uid}`);
    ref.update(info);
    this.setState({ user: { firstName: info.firstName, email: info.email} })
  }

  // setUser = (
  //   uid,
  //   email,
  // ) => {
  //   let user = {
  //     uid,
  //     email,
  //   };
  //   this.setState({ userCred: 
  //       { uid: user.uid, 
  //         email: user.email,  
  //       } 
  //       });
  // }


  render() {
    return (
      <Home className="App">
        <NavBar {...this.props}/>
        <div className="one">
          <div className="two">
            <div className="three">
              <Route exact path={ROUTES.LANDING} component={MainPage}/>
              <Route path='/signup' component={SignUp}/>
              <Route path={ROUTES.SIGN_IN} 
                render={props => (
                  <Login {...props} />
                )}
                />
              <Route
                path="/register"
                render={props => (
                  <Register {...props} newUser={this.newUser} />
                )}
              />
              <Route 
                  path='/profile'
                  render={props => (
                    <Profile {...props} user={this.state.user}/>
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


const mapStateToProps = (state) => {
  return {

  }
}

export default withRouter(connect()(App));