import React from 'react';
import {
    HeaderCont,
    SettingsCont,
    Edit,
    ProfilePic,
    ProfilePicCont,
  } from './ProfileStyle.js';
import { connect } from 'react-redux';

const Header = (props) => {
    return(
        <HeaderCont>
            {props.profile.url ? (
              <ProfilePicCont
                onMouseEnter={props.toggle}
                onMouseLeave={props.toggle}
              >
                <ProfilePic image={props.profile.url}>
                  {props.hovered ? (
                    <Edit onClick={props.editAvatar}>+ Edit</Edit>
                  ) : null}
                </ProfilePic>
              </ProfilePicCont>
            ) : (
              <ProfilePicCont>
                <ProfilePic>
                  <Edit onClick={props.editAvatar}>+ Edit</Edit>
                </ProfilePic>
              </ProfilePicCont>
            )}
            <SettingsCont onClick={props.showModal}>Settings</SettingsCont>
          </HeaderCont>
    )
}

const mapStateToProps = state => {
    console.log(state);
    return {
      auth: state.firebase.auth,
      profile: state.firebase.profile,
      palette: state.palette,
    };
  };

  export default connect(
    mapStateToProps,
    null
  )(Header);