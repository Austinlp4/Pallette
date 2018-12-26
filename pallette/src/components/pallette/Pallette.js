import React from 'react';
import styled from 'styled-components';
import colors from 'nice-color-palettes';

class Pallette extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pallete: []
        };
    }

    componentDidMount() {
        this.setState({
            pallete: colors[93]
        });
    }

    render(){
        let colorOne = this.state.pallete[0];
        let colorTwo = this.state.pallete[1];
        let colorThree = this.state.pallete[2];
        let colorFour = this.state.pallete[3];
        let colorFive = this.state.pallete[4];
        return (
            <PalletteContainer>
                <Pallete>
                    <div style={{ backgroundColor: colorOne, borderBottomLeftRadius: '40%'}} className='first'></div>
                    <div style={{ backgroundColor: colorTwo}}></div>
                    <div style={{ backgroundColor: colorThree}}></div>
                    <div style={{ backgroundColor: colorFour}}></div>
                    <div style={{ backgroundColor: colorFive, borderBottomRightRadius: '40%'}} className='last'></div>
                </Pallete>
            </PalletteContainer>
        )
    }
}

const PalletteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 0;
  border-bottom-right-radius: 20%;
  border-bottom-left-radius: 20%;
  border: none;
`;

const Pallete = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  border-bottom-right-radius: 20%;
  border-bottom-left-radius: 20%;
  .first{
    border-left: 5px solid rgba(45,54,98,1);
  }
  .last{
    border-right: 5px solid rgba(45,54,98,1);
  }
  div{
      border-bottom: 5px solid rgba(45,54,98,1);
  }
  div{
      width: 18%;
      height: 75px;
      box-shadow:
      inset 0px 11px 8px -10px rgba(31, 73, 125, 0.2);
  }
`;

export default Pallette;