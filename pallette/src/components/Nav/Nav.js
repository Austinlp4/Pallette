import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/pallete-logo.png';
import styled from 'styled-components';
import { signOut } from '../../store/actions/authActions';
import Avatar from '../../images/avatar-profile.png';
import Logout from '../../images/logout.png';

const NavBar = (props) => {
    return(
        <Nav>
            <div className='logo' style={{ cursor: 'pointer' }}>
                <img src={Logo} alt="" style={{ width: '200px' }} onClick={() => {props.history.push('/')}} />
            </div>
            {props.auth.uid
            ? 
            <Links>
                <h3>{`Welcome, ${props.profile.firstName}!`}</h3>
                <NavLink to='/profile'>
                {
                props.profile.url 
                ? 
                <img src={props.profile.url} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%' }} title='Go To Profile'/>
                :
                <img src={Avatar} alt="" style={{ width: '40px', height: '40px' }}/>
                }
                </NavLink>
                <div onClick={props.signOut}><img src={Logout} alt="" style={{ width: '40px', height: '30px', cursor: 'pointer' }} title='Logout'/></div>
            </Links>
            :
            <div className='auth'>
            <NavLink to='/signup'>
                Sign Up
            </NavLink>
            <NavLink to='/signin'>
                Sign In
            </NavLink>
            </div>
            }
       </Nav>
    )
}

const Nav = styled.div`
  top: 0;
  position: fixed;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(28, 49, 68);
  padding: 0 2%;
  color: rgb(255,218,99);
  a{
    text-decoration: none;
    color: black;
    font-size: 1.1rem;
    font-weight: bold;
    color: rgb(255,218,99);
  }
  .auth{
      display: flex;
      width: 135px;
      justify-content: space-between;
  }
  z-index: 6;
`;

const Links = styled.div`
  display: flex;
  max-width: 330px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: rgb(255,218,99);
  padding: 0 1.8%;
  h3{
    font-weight: 400;
    font-size: 1.2rem;
}
`;

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);