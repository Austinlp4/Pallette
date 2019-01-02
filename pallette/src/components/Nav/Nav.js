import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/pallete-logo.png';
import styled from 'styled-components';
import { signOut } from '../../store/actions/authActions';


const NavBar = (props) => {
    return(
        <Nav>
            <img src={Logo} alt="" style={{ width: '275px' }} onClick={() => {props.history.push('/')}}/>
            {props.auth.uid
            ? 
            <Links>
                <h3>{`Welcome, ${props.profile.firstName}!`}</h3>
                <NavLink to='/profile'>
                Profile
                </NavLink>
                <div onClick={props.signOut}>Logout</div>
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
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  a{
    text-decoration: none;
    color: black;
    font-size: 1.1rem;
    font-weight: bold;
  }
  .auth{
      display: flex;
      width: 135px;
      justify-content: space-between;
  }
`;

const Links = styled.div`
  display: flex;
  max-width: 400px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  h3{
    color: rgb(45,54,98);
    font-weight: 400;
    font-size: 1.4rem;
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