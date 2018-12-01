import React from 'react';
import styled from 'styled-components';


class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:{
                firstName:'',
                lastName:'',
                email: '',
                password:'',
                rePassword:''
            }
        };
    }

    handleChange = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]:event.target.value,
            }
        })
    }

    render(){
        return (
            <SignupContainer>
                <h1>Sign Up</h1>
                <form action="submit">
                  <input 
                    type="text" 
                    name='firstName' 
                    onChange={this.handleChange}
                    value={this.state.firstName}
                    placeholder='First Name'
                    />
                  <input 
                    type="text" 
                    name='lastName' 
                    onChange={this.handleChange}
                    value={this.state.lastName}
                    placeholder='Last Name'
                    />
                  <input 
                    type="email" 
                    name='email' 
                    onChange={this.handleChange}
                    value={this.state.email}
                    placeholder='E-mail'
                    />
                  <input 
                    type="password" 
                    name='password' 
                    onChange={this.handleChange}
                    value={this.state.password}
                    placeholder='New Password'
                    />
                  <input 
                    type="password" 
                    name='password' 
                    onChange={this.handleChange}
                    value={this.state.rePassword}
                    placeholder='Re-Enter Password'
                    />
                  <button>
                      Sign Up
                  </button>
                </form>
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