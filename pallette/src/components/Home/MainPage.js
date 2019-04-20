import React from 'react';
import styled from 'styled-components';
import Pallette from '../pallette/Pallette';
import Featured from '../featured/Featured';
import All from '../featured/All';
import MostLiked from '../featured/MostLiked';
import MostViewed from '../featured/MostViewed';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route, withRouter, NavLink } from 'react-router-dom';
import Arrow from '../../images/down-arrow.png';
import SearchIcon from '../../images/searchicon.png';
import FilterIcon from '../../images/filtericon.png';
import Question from '../../images/questionsicon.png';
import firebase from '../../firebase';
import hero from '../../images/hero2.png';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: 'All',
      showMenu: false,
    };
  }

  showMenu = event => {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  };

  closeMenu = event => {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  };

  render() {
    // if(!this.props.auth.uid) return <Redirect to='/signup'/>
    let colorOne = this.props.palette.palette[0];
    let colorTwo = this.props.palette.palette[1];
    let colorThree = this.props.palette.palette[2];
    let colorFour = this.props.palette.palette[3];
    let colorFive = this.props.palette.palette[4];
    return (
      <Container>
        <Header>
          <Pallette />
        </Header>
        {!this.props.auth.uid ? 
        <Hero hero={hero}>
          <Cta>
            <h2 className='main'>Use the palette at the top to create and showcase your work.</h2>
            <h2>Everyone is waiting to see!</h2>
            <Ctabutton onClick={()=>{this.props.history.push('./signup')}}>Get Started</Ctabutton>
          </Cta>
        </Hero>: null}
        <div>
          <All {...this.props} photos={this.state.photos} />
        </div>
      </Container>
    );
  }
}

const Ctabutton = styled.div`
  width: 200px;
  height: 50px;
  background-color: rgb(255,218,99);
  color: rgb(28, 49, 68);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 6px;
`;

const Cta = styled.div`
  display: flex;
  margin-top: 200px;
  flex-direction: column;
  margin-left: 15%;
  max-width: 700px;
  h2{
    font-size: 2rem;
    font-weight: lighter;
  }
  .main{
    font-size: 3rem;
    font-weight: lighter;
    margin-bottom: 20px;
  }
`;

const Hero = styled.div`
  background-image: url(${hero});
  height: 900px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  top: 0;
  margin-top: 0;
`;

const SideNav = styled.div`
  height: 500px;
  width: 100px;
  background-color: rgb(255, 218, 99);
  position: fixed;
  left: 0;
  top: 20%;
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100%;
    border-bottom: 0.1px solid rgb(210, 190, 85);
    img {
      width: 50px;
      height: auto;
    }
    &:hover {
      background-color: rgb(255, 225, 110);
    }
  }
  .last-box {
    border-bottom: none;
    img {
      width: 45px;
    }
  }
`;

const Header = styled.div`
  display: flex;

  padding-right: 0;
`;

const Select = styled.div`
  position: fixed;
  width: 200px;
  background-color: rgba(28, 49, 68, 0.85);
  color: rgb(255, 218, 99);
  height: 35px;
  cursor: pointer;
  .choice {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5% 5% 0 5%;
    img {
      width: 15px;
      height: 15px;
      justify-self: flex-end;
    }
  }
  .menu {
    background-color: rgb(28, 49, 68);
    text-align: center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
  h1 {
    text-align: center;
    color: white;
    font-weight: 300;
    font-family: 'Lobster', cursive;
  }
`;

// const Call = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 50px;
//   div{
//     margin: 0;
//     font-size: 1.1rem;
//     font-weight: 600;
//     color: rgba(45,54,98,1);
//     background-color: white;
//     max-width: 500px;
//     width: 100%;
//     height: 30px;
//     border-bottom-right-radius: 80px;
//     border-bottom-left-radius: 80px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// `;

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    palette: state.palette,
  };
};

export default withRouter(connect(mapStateToProps)(MainPage));
