import React from 'react';
import styled from 'styled-components';
import colors from 'nice-color-palettes';
import { addPalette } from '../../store/actions/paletteActions';
import { connect } from 'react-redux';

class Pallette extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pallete: []
        };
    }

    // componentDidMount() {
    //     this.setState({
    //         pallete: colors[4]
    //     });
    // }


    // colors = () => {
    //     let count = 16;
    //     const pallete = colors[count]
    //     this.props.addPalette(pallete)
    //     return pallete;
    // }

    render(){
        // const pallete = this.colors();
        
        console.log('palette', this.props.palette.palette)
        let colorOne = this.props.palette.palette[0];
        let colorTwo = this.props.palette.palette[1];
        let colorThree = this.props.palette.palette[2];
        let colorFour = this.props.palette.palette[3];
        let colorFive = this.props.palette.palette[4];
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
  padding-right: 2%;
`;

const Pallete = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  border-bottom-right-radius: 20%;
  border-bottom-left-radius: 20%;
  .first{
    border-left: 5px solid white;
  }
  .last{
    border-right: 5px solid white;
  }
  div{
      border-bottom: 5px solid white;
  }
  div{
      width: 18%;
      height: 75px;
      box-shadow:
      inset 0px 11px 8px -10px rgba(31, 73, 125, 0.2);
  }
`;

const mapDispatchToProps = (dispatch) => {
    return {
        addPalette: (palette) => dispatch(addPalette(palette)) 
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        palette: state.palette
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pallette);