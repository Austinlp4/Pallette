import React from 'react';
import { Route, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../../firebase';
import Register from './Register';
import { signUp } from '../../store/actions/authActions.js';
import { connect } from 'react-redux';




class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
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
              <button children="Register" />
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
  height: 600px;
  width: 600px;
  border: 1px solid lightgray;
  margin: 75px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    width: 90%;
    input {
      height: 35px;
      width: 90%;
      border-radius: 8px;
      margin: 4% 0;
      border: 0.2 solid lightgray;
    }
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
