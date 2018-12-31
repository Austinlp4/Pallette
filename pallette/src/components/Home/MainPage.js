import React from 'react';
import styled from 'styled-components';
import Pallette from '../pallette/Pallette';
import Featured from '../featured/Featured';

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        
    }

    render(){
        
        return (
            <Container>
              <Pallette/>
              <Call>
              <div>This Week's Pallete</div>
              </Call>
              <h1>Recently Added</h1>
              <Featured />
            </Container>
        )
    }
}

const Container =styled.div`
   width: 100%;
   height: 900px;
   background-color: rgba(45,54,98,1);
   h1{
       text-align: center;
       color: white;
       font-weight: 300;
   }
`;

const Call = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  div{
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(45,54,98,1);
    background-color: white;
    max-width: 500px;
    width: 100%;
    height: 30px;
    border-bottom-right-radius: 80px;
    border-bottom-left-radius: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;


export default MainPage;