import React from 'react';
import styled from 'styled-components';
import firebase from '../../firebase';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../routes';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            this.setState({ error });
        });

        event.preventDefault();
        }

    render(){
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
          } = this.state;
          
          const isInvalid =
          passwordOne !== passwordTwo ||
          passwordOne === '' ||
          email === '' ||
          username === '';
        return (
            <SignupContainer>
                {/* <FirebaseContext.Consumer> */}
                <h1>Sign Up</h1>
                <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={isInvalid}>Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
      {/* </FirebaseContext.Consumer> */}
            </SignupContainer>
        )
    }
}

const SignupContainer = styled.div`
  height: 600px;
  width: 600px;
  border: 1px solid lightgray;
  margin: 75px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  form{
      display: flex;
      flex-direction: column;
      width: 90%;
      input{
          height: 35px;
          width: 90%;
          border-radius: 8px;
          margin: 4% 0;
          border: .2 solid lightgray;
      }
  }
`;

export default SignUp;