import React from 'react';
import {
    SettingsCont,
    Modal,
    SettingsInput,
  } from './ProfileStyle.js';
import { connect } from 'react-redux';

const Settings = (props) => {
    console.log(props)
    return (
        <div>
              <Modal
                className="settings-modal"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '750px',
                }}
              >
                <h3>Edit Settings</h3>
                <form
                  action=""
                  onSubmit={props.editSettings}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <div
                    className="names"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '90%',
                    }}
                  >
                    <div>
                      <h3>FirstName</h3>
                      <SettingsInput
                        type="text"
                        name="firstName"
                        value={props.state.firstName}
                        placeholder={this.props.profile.firstName}
                        onChange={props.handleInputChange}
                      />
                    </div>
                    <div>
                      <h3>LastName</h3>
                      <SettingsInput
                        type="text"
                        name="lastName"
                        value={props.state.lastName}
                        onChange={props.handleInputChange}
                      />
                    </div>
                  </div>
                  <h3>Bio: </h3>
                  <textarea
                    type="text"
                    name="bio"
                    value={props.state.bio}
                    onChange={props.handleInputChange}
                    style={{ width: '90%', height: '100px' }}
                  />
                  <h3>Facebook: </h3>
                  <SettingsInput
                    type="text"
                    name="facebook"
                    value={props.state.facebook}
                    onChange={props.handleInputChange}
                    style={{ width: '90%' }}
                  />
                  <h3>Instagram</h3>
                  <SettingsInput
                    type="text"
                    name="instagram"
                    value={props.state.instagram}
                    onChange={props.handleInputChange}
                    style={{ width: '90%' }}
                  />
                  <h3>Twitter</h3>
                  <SettingsInput
                    type="text"
                    name="twitter"
                    value={props.state.twitter}
                    onChange={props.handleInputChange}
                    style={{ width: '90%' }}
                  />
                  <SettingsCont style={{ width: '90%', marginTop: '35px' }}>
                    Save
                  </SettingsCont>
                </form>
              </Modal>
        </div>
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
)(Settings);
