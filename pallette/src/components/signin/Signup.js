import React from 'react';
import { Route, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../../firebase';
import Register from './Register';
import { signUp, signUpWithGoogle } from '../../store/actions/authActions.js';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Reg from '../../images/reg.png';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      followers: 0,
      facebook: '',
      instagram: '',
      twitter: '',
      passValid: false
    };
  }

  onChange = event => {
    if(event.target.value.length > 0 && event.target.value.length < 6){
      this.setState({
        [event.target.name]: event.target.value,
        passValid: true
      })
    }else{
      this.setState({
        [event.target.name]: event.target.value,
      })
    }
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.signUp(this.state)
    this.props.history.push('/');
  };

  googleSign = event => {
    event.preventDefault();
    this.props.signUpWithGoogle();

  }

  
  render() {
    return (
      <SignupContainer>
        <div >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div><img src={Reg} alt="" style={{ width: '300px', height: 'auto' }}/></div>
            <NavLink to='/signin' className='reroute' style={{ alignSelf: 'center' }}>
              Already a user? Sign in here!
           </NavLink>
          </div>
        </div>
        <div>
          <div>
            <form onSubmit={this.onSubmit}>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.onChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.onChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {this.state.passValid
              ?
                <p 
                style={{ margin: '0 0', fontSize: '.8rem', color: 'red' }}
                >Password must be at least 6 characters</p>
                :
                null
            }
              <Button children="Register" />
              <div>
                {this.props.authError ? <p>{this.props.authError}</p> : null}
              </div>
            </form>
            {/* <button onClick={this.googleSign}>Google</button> */}
          </div>
        </div>
        <Route
            path="/register"
            render={props => (
              <Register {...props} newUser={this.props.newUser} />
            )}
          />
      </SignupContainer>
    );
  }
}

const SignupContainer = styled.div`
    height: 500px;
    width: 400px;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 13% 0;
    border-radius: 8px;
    background-color: rgb(45,54,98);
    box-shadow: 0 4px 2px -2px rgba(28, 49, 68, 0.6);
    .reroute{
      color: white;
      &:hover{
        color: rgb(255, 0, 198);
      }
    }
    h3{
      text-align: center;
      font-family: 'Lobster', cursive;
      font-size: 3rem;
      color: rgb(255, 0, 198);
    }
    form{
      display: flex;
      flex-direction: column;
      input{
        padding-left: 3%;
        margin: 5% 0;
        height: 40px;
        width: 250px;
        border: none;
        border-radius: 6px;
        &:focus{
          outline: none;
          border: 1px solid rgb(255, 0, 198) !important;

        }
      }
      input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active  {
            -webkit-box-shadow: 0 0 0 30px white inset;
        }
    }
`;

const Button = styled.button`
  height: 40px;
  width: 250px;
  border: none;
  border-radius: 6px;
  background-color: rgb(255,102,79);
  color: rgba(255, 218, 99, 0.9);
  box-shadow: 0 4px 2px -2px rgba(28, 49, 68, 0.6);
  &:hover{
    background-color: rgb(255,126,70);
  }
`;

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
    signUpWithGoogle: (newUser) => dispatch(signUpWithGoogle(newUser))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
