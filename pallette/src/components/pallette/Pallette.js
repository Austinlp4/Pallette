import React from 'react';
import styled from 'styled-components';

class Pallette extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <PalletteContainer>

            </PalletteContainer>
        )
    }
}

const PalletteContainer = styled.div`
  width: 90%;
`;

export default Pallette;