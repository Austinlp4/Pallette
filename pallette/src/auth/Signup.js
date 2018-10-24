import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
        <div className='center'>
      <form onSubmit={this.handleSubmit}>
       <h1 className='form-header'>Pallette</h1>
        <div className='form-item'>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            type="text"
          />
        </div>
        <div className='form-item'>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            type="password"
          />
        </div>
        <div>
          <button type="submit">Signin</button>
        </div>
      </form>
      </div>
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const endpoint = 'http://localhost:3300/api/register';
    console.log(this.state);
    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error('ERROR', err);
      });
  };
}

export default Signup;