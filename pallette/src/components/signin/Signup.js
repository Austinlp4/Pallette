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
                [event.target.value]:event.target.value,
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
                    />
                  <input 
                    type="text" 
                    name='lastName' 
                    onChange={this.handleChange}
                    value={this.state.lastName}
                    />
                  <input 
                    type="email" 
                    name='email' 
                    onChange={this.handleChange}
                    value={this.state.email}
                    />
                  <input 
                    type="password" 
                    name='password' 
                    onChange={this.handleChange}
                    value={this.state.password}
                    />
                  <input 
                    type="password" 
                    name='password' 
                    onChange={this.handleChange}
                    value={this.state.rePassword}
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
`;

export default SignUp;