import React from 'react';
import styled from 'styled-components';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <SigninContainer>
                <form action="submit">
                  <input type="email"/>
                  <input type="password"/>
                </form>
            </SigninContainer>
        )
    }
}

const SigninContainer = styled.div`
  height: 400px;
  width: 400px;
  border: 1px solid lightgray;
`;

export default SignIn;