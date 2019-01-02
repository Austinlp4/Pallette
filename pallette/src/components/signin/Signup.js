import React from 'react';
import { Route, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../../firebase';
import Register from './Register';
import { signUp } from '../../store/actions/authActions.js';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';



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
      twitter: ''
    };
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.signUp(this.state)
    this.props.history.push('/');
    // const { email, password } = this.state;
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(user => {
    //     this.props.history.push('/register');
    //   })
    //   .catch(error => {
    //     this.setState({ error: error });
    //   });
  };

  
  render() {
    return (
      <SignupContainer>
        <div>
          <div>
            <h3>Register</h3>
            <NavLink to='/signin' className='reroute'>
              Already a user? Sign in here!
           </NavLink>
          </div>
        </div>
        <div>
          <div>
            <form onSubmit={this.onSubmit}>
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
              <Button children="Register" />
              <div>
                {this.props.authError ? <p>{this.props.authError}</p> : null}
              </div>
            </form>
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
    border: 1px solid rgb(255, 0, 198);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10% 0;
    border-radius: 8px;
    background-color: rgb(45,54,98);
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
  background-color: rgb(255, 0, 198);
  color:  rgb(45,54,98);
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
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
