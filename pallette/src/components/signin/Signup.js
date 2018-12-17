import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../../firebase';


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
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <SignupContainer>
        <div>
          <div>
            <h3>Register</h3>
          </div>
        </div>
        {error ? (
          <div>
            <div>
              <p>{error.message}</p>
            </div>
          </div>
        ) : null}
        <div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleInputChange}
              />
              <button children="Register" />
            </form>
          </div>
        </div>
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
