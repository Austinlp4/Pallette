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
            <div style={{ width: '100%' }}>
              <Pallette/>
              <Call>
              <div>This Week's Pallete</div>
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
  div{
    margin: 0;
    font-size: 1.1rem;
    color: white;
    background-color: rgba(45,54,98,1);
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