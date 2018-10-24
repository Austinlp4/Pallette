import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import './App.css';


import Signin from './auth/Signin';
import Signup from './auth/Signup';

const Home = props => {
  return (
    <div className='container'>
      <div className='home'>Home</div>
      <button onClick={props.signout}>Sign out</button>
    </div>
  )
}

class App extends Component {
  render() {
    if(localStorage.length > 0){
      return <Home signout={this.signout}/>
    }
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to='/' exact>
               Home
            </NavLink>
            
            <NavLink to='/signin'>
               Sign in
            </NavLink>
           
            <NavLink to='/signup'>
               Sign up
            </NavLink>
           
            <button onClick={this.signout}>Sign out</button>
          </nav>
          <main>
            <Route path='/' component={Home} exact></Route>
            <Route path='/signin' component={Signin}></Route>
            <Route path='/signup' component={Signup}></Route>
          </main>
        </header>
          
      </div>
    );
  }
  signout = () => {
    localStorage.removeItem('jwt');
    
  }
}


export default App;