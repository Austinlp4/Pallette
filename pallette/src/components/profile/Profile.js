import React from 'react';
import ProfileWorks from './ProfileWorks';
import { connect } from 'react-redux';
import { ProContainer} from './ProfileStyles.js';
import {
  addPhoto,
  uploadAvatar,
  addBio,
  editInfo,
} from '../../store/actions/projectActions';
import moment from 'moment';
import Facebook from '../../images/facebook.png';
import Instagram from '../../images/instagram.png';
import Twitter from '../../images/twitter.png';
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {
  InfoContainer,
  Information,
  General,
  Social,
  ModalContainer,
  Modal,
  UploadCont,
  SettingsInput,
  SettingsCont
} from './ProfileStyle.js';
import Header from './Header';
import { thumbsContainer, thumb, thumbInner, img } from './thumbStyles';
// import Settings from './Settings';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0,
      bio: this.props.profile.bio || '',
      user: '',
      photo: null,
      title: '',
      loaded: false,
      showModal: false,
      hovered: false,
      upload: false,
      showModalTwo: false,
      firstName: this.props.profile.firstName || '',
      lastName: this.props.profile.lastName || '',
      facebook: this.props.profile.facebook || '',
      instagram: this.props.profile.instagram || '',
      twitter: this.props.profile.twitter || '',
      files: [],
      previews: [],
      showModalThree: false,
    };
  }

  onDrop(files) {
    console.log(files[0]);
    this.setState({
      files: files[0],
      previews: files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    });
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    if (this.state.previews) {
      this.state.previews.forEach(file => URL.revokeObjectURL(file.preview));
    }
  }

  handleChange = event => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handlePhotoChange = event => {
    if (event.target.files[0]) {
      const photo = event.target.files[0];
      console.log('photo', photo);
      this.setState(() => ({ photo }));
    }
  };

  handleUpload = () => {
    const { files } = this.state;
    const uid = this.props.auth.uid;
    this.props.uploadAvatar(files, uid);
    if (this.state.showModalTwo) {
      this.setState({ showModalTwo: !this.state.showModalTwo }, () => {
        if (this.state.previews) {
          this.setState({ files: '', previews: '' });
        }
      });
    }
  };

  addPhoto = e => {
    console.log('fired');
    e.preventDefault();
    let { files, title } = this.state;
    console.log(files);
    const uid = this.props.auth.uid;
    const artist = `${this.props.profile.firstName} ${
      this.props.profile.lastName
    }`;
    const created = moment().calendar();
    const palette = this.props.palette.palette;
    if (this.state.files) {
      this.props.addPhoto(files, uid, title, artist, created, palette);
      this.setState({
        photo: null,
        title: '',
        showModalThree: !this.state.showModalThree,
      });
    }
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const bio = this.state.bio;
    const uid = this.props.auth.uid;
    this.props.addBio(bio, uid);
  };

  showModal = event => {
    this.setState({ showModal: !this.state.showModal });
  };

  closeModal = event => {
    if (
      event.target.dataset.type === 'modal-container' ||
      event.target.dataset.type === 'modal-container-two' ||
      event.target.dataset.type === 'modal-container-three'
    ) {
      if (event.target.dataset.type === 'modal-container') {
        this.setState({ showModal: !this.state.showModal });
      } else if (event.target.dataset.type === 'modal-container-two') {
        this.setState({ showModalTwo: !this.state.showModalTwo });
      } else {
        this.setState({ showModalThree: !this.state.showModalThree });
      }
    }
  };

  toggle = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }));
  };

  editAvatar = () => {
    this.setState({ showModalTwo: !this.state.showModalTwo });
  };

  editSettings = () => {
    const { firstName, lastName, bio, facebook, instagram, twitter } = this.state;
    const uid = this.props.auth.uid;
    this.props.editInfo(
      firstName,
      lastName,
      bio,
      facebook,
      instagram,
      twitter,
      uid
    );
    this.setState({
      showModal: !this.state.showModal,
    });
  };
  render() {
    if (!this.props.auth.uid) return <Redirect to="/signup" />;
    const { previews } = this.state;
    let thumbs = [];
    if (previews) {
      thumbs = previews.map(file => (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img src={file.preview} style={img} alt="" />
          </div>
        </div>
      ));
    }

    return (
      <ProContainer>
        <InfoContainer>
          <Header 
            toggle={this.toggle}
            editAvatar={this.editAvatar}
            showModal={this.showModal}
            hovered={this.state.hovered}
          />
          <Information>
            <General>
              <h1>
                {this.props.profile.firstName} {this.props.profile.lastName}
              </h1>
              {this.props.profile.bio ? (
                <div className="bio">
                  <p>{this.props.profile.bio}</p>
                </div>
              ) : (
                <div className="bio">
                  <p>
                    You have no bio yet. Please go to settings to edit your
                    information.
                  </p>
                </div>
              )}
            </General>
            <Social>
              <a href={this.props.profile.facebook}>
                <img src={Facebook} alt="" className="facebook" />
              </a>
              <img src={Instagram} alt="" className="instagram" />
              <img src={Twitter} alt="" className="twitter" />
            </Social>
          </Information>
          {this.state.showModal ? (
            <ModalContainer
              data-type="modal-container"
              onClick={this.closeModal}
              ref={element => {
                this.modal = element;
              }}
            >
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
                  onSubmit={this.editSettings}
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
                        value={this.state.firstName}
                        placeholder={this.props.profile.firstName}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div>
                      <h3>LastName</h3>
                      <SettingsInput
                        type="text"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <h3>Bio: </h3>
                  <textarea
                    type="text"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.handleInputChange}
                    style={{ width: '90%', height: '100px' }}
                  />
                  <h3>Facebook: </h3>
                  <SettingsInput
                    type="text"
                    name="facebook"
                    value={this.state.facebook}
                    onChange={this.handleInputChange}
                    style={{ width: '90%' }}
                  />
                  <h3>Instagram</h3>
                  <SettingsInput
                    type="text"
                    name="instagram"
                    value={this.state.instagram}
                    onChange={this.handleInputChange}
                    style={{ width: '90%' }}
                  />
                  <h3>Twitter</h3>
                  <SettingsInput
                    type="text"
                    name="twitter"
                    value={this.state.twitter}
                    onChange={this.handleInputChange}
                    style={{ width: '90%' }}
                  />
                  <SettingsCont style={{ width: '90%', marginTop: '35px' }}>
                    Save
                  </SettingsCont>
                </form>
              </Modal>
            </ModalContainer>
          ) : null}
          {this.state.showModalTwo ? (
            <ModalContainer
              data-type="modal-container-two"
              onClick={this.closeModal}
              ref={element => {
                this.modal = element;
              }}
            >
              <Modal>
                {!this.state.previews[0] ? (
                  <Dropzone accept="image/*" onDrop={this.onDrop.bind(this)}>
                    {({ getRootProps, getInputProps }) => (
                      <UploadCont {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drop files here</p>
                        <h1>+</h1>
                      </UploadCont>
                    )}
                  </Dropzone>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '90%',
                    }}
                  >
                    <div style={thumbsContainer}>{thumbs}</div>
                    <SettingsCont
                      onClick={this.handleUpload}
                      style={{ width: '90%' }}
                    >
                      Upload
                    </SettingsCont>
                  </div>
                )}
              </Modal>
            </ModalContainer>
          ) : null}
        </InfoContainer>
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SettingsCont
            style={{ width: '85%', margin: '10px auto' }}
            onClick={() => {
              this.setState({ showModalThree: !this.state.showModalThree });
            }}
          >
            Submit a peice of your Artwork
          </SettingsCont>

          {this.state.showModalThree ? (
            <ModalContainer
              data-type="modal-container-three"
              onClick={this.closeModal}
              ref={element => {
                this.modal = element;
              }}
            >
              <Modal>
                {!this.state.previews[0] ? (
                  <Dropzone accept="image/*" onDrop={this.onDrop.bind(this)}>
                    {({ getRootProps, getInputProps }) => (
                      <UploadCont {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drop files here</p>
                        <h1>+</h1>
                      </UploadCont>
                    )}
                  </Dropzone>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '80%',
                      paddingTop: '20px',
                    }}
                  >
                    <input
                      value={this.state.title}
                      name="title"
                      onChange={this.handleInputChange}
                      placeholder="Add Title.."
                      style={{
                        height: '30px',
                        width: '300px',
                        border: '.5px solid rgb(45, 54, 98)',
                        borderRadius: '6px',
                        paddingLeft: '5px',
                      }}
                    />
                    <div style={thumbsContainer}>{thumbs}</div>
                    <SettingsCont onClick={this.addPhoto} style={{ width: '90%' }}>
                      Upload
                    </SettingsCont>
                  </div>
                )}
              </Modal>
            </ModalContainer>
          ) : null}
          <ProfileWorks {...this.props} />
        </div>
      </ProContainer>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addPhoto: (files, uid, title, artist, created, palette) =>
      dispatch(addPhoto(files, uid, title, artist, created, palette)),
    uploadAvatar: (files, uid) => dispatch(uploadAvatar(files, uid)),
    addBio: (bio, uid) => dispatch(addBio(bio, uid)),
    editInfo: (firstName, lastName, bio, facebook, instagram, twitter, uid) =>
      dispatch(
        editInfo(firstName, lastName, bio, facebook, instagram, twitter, uid)
      ),
  };
};

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
  mapDispatchToProps
)(Profile);
