import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

class App extends Component {
  render() {
    return (
      <Home className="App">
       <h1>Pallette</h1>
        <div className="one">
          <div className="two">
            <div className="three">
              
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
  .one, .two, .three{
    box-shadow: 0 9px 0px 0px white, 
    inset 0 -9px 0px 0px white, 
    inset 10px 0 15px -4px rgba(31, 73, 125, 0.2),
    inset -10px 0 15px -4px rgba(31, 73, 125, 0.2);
    display: flex;
    justify-content: center;
    width: 90%;
    height: 800px;

  }
`;

export default App;