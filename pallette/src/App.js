import React, { Component } from 'react';
import { Route, withRouter, NavLink } from 'react-router-dom';
import styled from 'styled-components';
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
import SingleCard from './components/profile/SingleCard';
import { addPalette } from './store/actions/paletteActions';
import colors from 'nice-color-palettes';
import SingleImage from './components/featured/SingleImage.js';
import Cta from './components/Home/Cta';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userCred: null,
      user: '',
      photos: []
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
    });
    // let itemsRef = firebase.database().ref(`photos`);
    // itemsRef.on('value', data => {
    //   let works = [];
    //   data = Object.values(data.val());
    //   console.log('data', data)
    //   data.forEach((child) => {
    //     works.push(
    //       Object.values(child)
    //     );
    //   });
    //   let newWorks = Object.values(works);
    //   console.log('newWorks', works)
    //   let photos = [];
    //   newWorks.map((child, i) => 
    //     child.map((obj, i) => 
    //       photos.push(
    //         obj
    //       )
    //     )
    //   )
    //   this.shuffleArray(photos);
    //   this.setState({
    //     photos: photos,
    //   });
    // });
    this.colors();
    }


    colors = () => {
      let count = 7;
      const pallete = colors[count]
      this.props.addPalette(pallete)
      return pallete;
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


  render() {
    return (
      <Home className="App" style={{ minWidth: '1000px' }}>
        <NavBar {...this.props}/>
        {/* <div className="one">
          <div className="two">
            <div className="three"> */}
              <Route exact path={ROUTES.LANDING} 
              render={props => (
                <MainPage {...props} photos={this.state.photos}/>
              )}/>
              <Route path='/cta' 
                  render={props => (
                    <Cta {...props}/>
                  )}
              />
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
                  exact path='/profile'
                  render={props => (
                    <Profile {...props} user={this.state.user}/>
                  )}
                  />
              <Route 
                  path='/profile/:uid'
                  render={props => (
                    <SingleCard {...props}/>
                  )}
              />
              <Route 
                  path='/:uid/:key'
                  render={props => (
                    <SingleImage {...props}/>
                  )}
              />
              
              
            {/* </div>
          </div>
        </div> */}
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
  background: rgb(242, 243, 247);
  padding-top: 0;
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
    background-color: rgb(250,250,250);
  }
`;


const mapDispatchToProps = (dispatch) => {
  return {
      addPalette: (palette) => dispatch(addPalette(palette)) 
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));