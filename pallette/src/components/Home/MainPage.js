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
            <div>
              <Pallette/>
              <Call>
              <h1>^</h1>
              <h2>This Week's Pallete</h2>
              </Call>
              <Featured />
            </div>
        )
    }
}

const Call = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1, h2{
    margin: 0;
    font-size: 1.1rem;
  }
`;


export default MainPage;