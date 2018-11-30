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
                <form action="submit">
                  <input type="text"/>
                  <input type="text"/>
                  
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