import React from 'react';
import styled from 'styled-components';
import Pallette from '../pallette/Pallette';
import All from '../featured/All';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route, withRouter } from 'react-router-dom';
import hero from '../../images/hero2.png';
import {
  Container,
  Select,
  Header,
  SideNav,
  Cta,
  Ctabutton,
} from './MainPageStyle.js';

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
    return (
      <Container>
        <Header>
          <Pallette />
        </Header>
        {!this.props.auth.uid ? (
          <Hero hero={hero}>
            <Cta>
              <h2 className="main">
                Use the palette at the top to create and showcase your work.
              </h2>
              <h2>Everyone is waiting to see!</h2>
              <Ctabutton
                onClick={() => {
                  this.props.history.push('./signup');
                }}
              >
                Get Started
              </Ctabutton>
            </Cta>
          </Hero>
        ) : null}
        <div>
          <All {...this.props} photos={this.state.photos} />
        </div>
      </Container>
    );
  }
}

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

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    palette: state.palette,
  };
};

export default withRouter(connect(mapStateToProps)(MainPage));
