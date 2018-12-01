import React, { Component } from 'react';
import styled from 'styled-components';
import Pallette from '../src/components/pallette/Pallette';
import Featured from './components/featured/Featured';

class App extends Component {
  render() {
    return (
      <Home className="App">
       <h1>Pallette</h1>
        <div className="one">
          <div className="two">
            <div className="three">
              <Pallette />
              <Call>
              <h1>^</h1>
              <h2>This Week's Pallete</h2>
              </Call>
              <Featured />
            </div>
          </div>
        </div>
      </Home>
    );
  }
}

const Home = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  z-index: 4;
  .one, .two, .three{
    box-shadow: 0 9px 0px 0px white, 
    inset 0 -9px 0px 0px white, 
    inset 10px 0 15px -4px rgba(31, 73, 125, 0.2),
    inset -10px 0 15px -4px rgba(31, 73, 125, 0.2);
    display: flex;
    justify-content: center;
    width: 90%;
    

  }
  .three{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

const Call = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1, h2{
    margin: 0;
    font-size: 1.1rem;
  }
`;

export default App;