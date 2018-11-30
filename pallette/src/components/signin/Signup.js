import React from 'react';
import styled from 'styled-components';


class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render(){
        return (
            <SignupContainer>
                <h1>Sign Up</h1>
                <form action="submit">
                  <input type="text"/>
                  <input type="text"/>
                  <input type="email"/>
                  <input type="password"/>
                  <input type="password"/>
                  <button>
                      Sign Up
                  </button>
                </form>
            </SignupContainer>
        )
    }
}

const SignupContainer = styled.div`
  height: 400px;
  width: 400px;
`;

export default SignUp;