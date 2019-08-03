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
                    <div style={{ backgroundColor: colorOne, borderBottomLeftRadius: '6px'}} className='first'></div>
                    <div style={{ backgroundColor: colorTwo}}></div>
                    <div style={{ backgroundColor: colorThree}}></div>
                    <div style={{ backgroundColor: colorFour}}></div>
                    <div style={{ backgroundColor: colorFive, borderBottomRightRadius: '6px'}} className='last'></div>
                </Pallete>
            </PalletteContainer>
        )
    }
}


const PalletteContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border: none;
  position: fixed;
  z-index: 6;
  margin-top: 20px;
`;

const Pallete = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 80%;
  div{
      width: 15%;
      height: 50px;
      box-shadow:
      inset 0px 11px 8px -10px rgba(31, 73, 125, 0.2);
  }
  @media(max-width: 750px){
      width: 100%;
      div{
          width: 20%;
      }
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