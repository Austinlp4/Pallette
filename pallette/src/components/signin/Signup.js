import React from 'react';
import { Route, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../../firebase';
import Register from './Register';



class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.props.history.push('/register');
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  newUser = (
    e,
    firstName,
    lastName,
    email,
    street,
    city,
    state,
    zipCode
  ) => {
    let info = {
        e,
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
  }

  render() {
    return (
      <SignupContainer>
        <div>
          <div>
            <h3>Register</h3>
          </div>
        </div>
        {this.state.error ? (
          <div>
            <div>
              <p>{this.state.error.message}</p>
            </div>
          </div>
        ) : null}
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
              <button children="Register" />
            </form>
          </div>
        </div>
        <Route
            path="/register"
            render={props => (
              <Register {...props} newUser={this.newUser} />
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

export default withRouter(SignUp);
