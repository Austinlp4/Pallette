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
            pallete: colors[0]
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
                    <div style={{ backgroundColor: colorOne}}></div>
                    <div style={{ backgroundColor: colorTwo}}></div>
                    <div style={{ backgroundColor: colorThree}}></div>
                    <div style={{ backgroundColor: colorFour}}></div>
                    <div style={{ backgroundColor: colorFive}}></div>
                </Pallete>
            </PalletteContainer>
        )
    }
}

const PalletteContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Pallete = styled.div`
  display: flex;
  div{
      width: 75px;
      height: 75px;
  }
`;

export default Pallette;