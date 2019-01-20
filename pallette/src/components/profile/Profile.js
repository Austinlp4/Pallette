import React from 'react';
import firebase, {storage} from '../../firebase';
import ProfileWorks from './ProfileWorks';
import { connect } from 'react-redux';
import { Upload,
         ProContainer,
         Info,
         Card } from './ProfileStyles.js';
import { addPhoto, uploadAvatar, addBio, editInfo } from '../../store/actions/projectActions';
import moment from 'moment';
import analyze from 'rgbaster';
import styled from 'styled-components';
import Facebook from '../../images/facebook.png';
import Instagram from '../../images/instagram.png';
import Twitter from '../../images/twitter.png';
import ColorThief from '../../ColorThief';
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center'

  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: '90%',
    height: '90%',
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  }
  
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };


class Profile extends React.Component{
    constructor(props){
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
            previews: []

        };
        this.colorThief = new ColorThief();
    }

    onDrop(files) {
        console.log(files[0])
        this.setState({
            files: files[0],
          previews: files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          }))
        });
      }
    
      componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
      }


    handleChange = event => {
        if(event.target.files[0]){
            const image = event.target.files[0];
            this.setState(() => ({image}))
        }
    }

    handlePhotoChange = event => {
        if(event.target.files[0]){
            const photo = event.target.files[0];
            console.log('photo', photo)
            this.setState(() => ({photo}))
        }
    }


    handleUpload = () => {
        const { files } = this.state
        const uid = this.props.auth.uid;
        this.props.uploadAvatar(files, uid)
        if(this.state.showModalTwo){
            this.setState({ showModalTwo: !this.state.showModalTwo })
        }
        
    }

    addPhoto = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {photo, title} = this.state;
        const uid = this.props.auth.uid;
        const artist = `${this.props.profile.firstName} ${this.props.profile.lastName}`
        const created = moment().calendar();
        const palette = this.props.palette.palette
        if(this.state.photo){
        this.props.addPhoto(photo, uid, title, artist, created, palette);
        this.setState({photo: null, title: ''})
        }
            
    }


    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
          });
    }

    handleSubmit = () => {
            const bio = this.state.bio;
            const uid = this.props.auth.uid;
            this.props.addBio(bio, uid)
    }

    handleTitle = event => {
        this.setState({ 
            [event.target.name]: event.target.value
         });
    }

    showModal = event => {
        this.setState({ showModal: !this.state.showModal })
    }

    closeModal = event => {
        if (event.target.dataset.type === 'modal-container' || event.target.dataset.type === 'modal-container-two') {
            if(event.target.dataset.type === 'modal-container'){
                this.setState({  showModal: !this.state.showModal})
            } else {
                this.setState({  showModalTwo: !this.state.showModalTwo})
            }
            
          }
    }

    enter = () => {
        this.setState(prevState => ({ hovered: !prevState.hovered }))
    }

    leave = () => {
        this.setState(prevState => ({ hovered: !prevState.hovered }))
    }

    editAvatar = () => {
        this.setState({ showModalTwo: !this.state.showModalTwo })
    }

    editSettings = () => {
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const bio = this.state.bio;
        const facebook = this.state.facebook;
        const instagram = this.state.instagram;
        const twitter = this.state.twitter;
        const uid = this.props.auth.uid;
        this.props.editInfo(firstName, lastName, bio, facebook, instagram, twitter, uid)
        this.props.history.push('/profile')
        
    }
    render(){
        if(!this.props.auth.uid) return <Redirect to='/cta'/>  
        const {previews} = this.state;

        const thumbs = previews.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
            <img
                src={file.preview}
                style={img}
                alt=''
            />
            </div>
        </div>
        ));
        return (
            <ProContainer>
            <InfoContainer>
                <Header>
                  {this.props.profile.url ?
                 <ProfilePicCont onMouseEnter={this.enter} onMouseLeave={this.leave}>
                    <ProfilePic image={this.props.profile.url} >
                    {
                          this.state.hovered
                          ?
                          <Edit onClick={this.editAvatar}>
                              + Edit
                          </Edit>
                          :
                          null
                      }
                  </ProfilePic>
              
                    
                    </ProfilePicCont>
                  :
                  <Upload className='upload'>
                      <div className='upicon'>
                          <input type='file' name='file' id='file' onChange={this.handleChange} className='fileup'/>
                          <label htmlFor="file">Choose a file</label>
                          <button onClick={this.handleUpload}>Upload</button>
                      </div>
                  </Upload>
                  }
                  <Settings onClick={this.showModal}>
                      Settings
                  </Settings>
                  </Header>
                  <Information>
                      <General>
                    <h1>
                        {this.props.profile.firstName} {this.props.profile.lastName}
                    </h1>
                    {this.props.profile.bio 
                    ?
                    <div className='bio'>
                        <p>
                            {this.props.profile.bio }
                        </p>
                    </div>
                    :
                    <div className='bio'>
                        <p>You have no bio yet. Please go to settings to edit your information.</p>
                    </div>
                    }
                    </General>
                    <Social>
                        <img src={Facebook} alt="" className='facebook'/>
                        <img src={Instagram} alt="" className='instagram'/>
                        <img src={Twitter} alt="" className='twitter'/>
                    </Social>
                  </Information>
                  {this.state.showModal
                    ?
                    <ModalContainer data-type='modal-container' onClick={this.closeModal} ref={(element) => {
                        this.modal = element;
                     }}>
                        <Modal className='settings-modal'>
                            <h3>Edit Settings</h3>
                            <form action="" onSubmit={this.editSettings}>
                            <div className='names' style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                            <div>
                                <h3>FirstName</h3>
                                <SettingsInput type="text" name='firstName' value={this.state.firstName} placeholder={this.props.profile.firstName} onChange={this.handleInputChange}/>
                                </div>
                                <div>
                                <h3>LastName</h3>
                                <SettingsInput type="text" name ='lastName' value={this.state.lastName} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                                <h3>Bio: </h3>
                                <textarea type="text" name ='bio' value={this.state.bio} onChange={this.handleInputChange} style = {{ width: '400px', height: '100px' }}/>
                                <h3>Facebook: </h3>
                                <SettingsInput type="text" name ='facebook' value={this.state.facebook} onChange={this.handleInputChange}/>
                                <h3>Instagram</h3>
                                <SettingsInput type="text" name ='instagram' value={this.state.instagram} onChange={this.handleInputChange}/>
                                <h3>Twitter</h3>
                                <SettingsInput type="text" name ='twitter' value={this.state.twitter} onChange={this.handleInputChange}/>
                                <button>Save</button>
                            </form>
                        </Modal>
                    </ModalContainer>
                    :
                    null
                  }
                  {this.state.showModalTwo
                    ?
                    <ModalContainer data-type='modal-container-two' onClick={this.closeModal} ref={(element) => {
                        this.modal = element;
                     }}>
                        <Modal>
                          {!this.state.previews[0]
                          ?
                        <Dropzone
                            accept="image/*"
                            onDrop={this.onDrop.bind(this)}
                            >
                            {({getRootProps, getInputProps}) => (
                                <UploadCont {...getRootProps()} >
                                <input {...getInputProps()} />
                                <p>Drop files here</p>
                                <h1>+</h1>
                                </UploadCont>
                            )}
                            </Dropzone>
                            :
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90%'}}>
                            <div style={thumbsContainer}>
                            {thumbs}
                            </div>
                            <Settings onClick={this.handleUpload} style={{ width: '90%' }}>Upload</Settings>
                            </div>
                            }
                        </Modal>
                    </ModalContainer>
                    :
                    null
                  }
                  </InfoContainer>
                  <div style={{ width: '100%', maxWidth: '1200px'}}>
                      <Card>
                      <input type='file' name='file' accept='image/*' id='filetwo' onChange={this.handlePhotoChange} className={this.state.photo ? 'fileup go' : 'fileup'}/>
                      <label htmlFor="filetwo" >{this.state.photo ? <input className='pic-title' type="text" value={this.state.title} name='title' onChange={this.handleTitle} placeholder='Add Title..'/> : 'Add Artwork' }</label>
                      <button onClick={this.addPhoto}>Add</button>
                      </Card>
                      <ProfileWorks {...this.props}/>
                  </div>
                  </ProContainer>
        )
    }
  
}

const UploadCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    border-radius: 6px;
    height: 90%;
    width: 90%;
    margin: 20px auto;
    flex-direction: column;
    color: white;
    h1{
        font-size: 4rem;
        font-weight: 300;
        margin-top: 10px;
    }
`;

const SettingsInput = styled.input`
    height: 40px; 
    width: 300px;

`;

const ProfilePicCont = styled.div`
   
`;

const ProfilePic = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-image: ${props => (props.image ? `url(${props.image})` : 'null')};
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    position: absolute;
    bottom: -40%;
    left: 35%;
    border: 7px solid rgb(28,49,68);
    box-shadow: 0 4px 2px -2px black;
`;

const Edit = styled.div`
    position: absolute;
    bottom: 0;
    color: rgb(255, 218, 99);
    font-weight: 300;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.6);
    height: 150px;
    width: 287px;
    left: 0;
    border-bottom-right-radius: 150px;
    border-bottom-left-radius: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
`;

const Modal = styled.div`
    height: 700px;
    width: 700px;
    display: flex;
    border-radius: 6px;
    background-color: rgb(78, 107, 140);
    flex-direction: column;
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10;
`;


const Settings = styled.button`
    border: none;
    border-radius: 6px;
    box-shadow: 0 4px 2px -2px rgba(28, 49, 68, 0.6);
    background-color: rgb(255,102,79);
    color: rgba(255, 218, 99, 0.9);
    height: 40px;
    width: 100px;
    justify-self: end;
    margin: 2% 2% 0 0;
    font-weight: 500;
    font-size: 1.1rem;
    &:hover{
        cursor: pointer;
        background-color: rgb(255,134,118);
    }
`;

const Social = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 140px;
    height: 50px;
    .facebook{
        width: 40px;
        height: 40px;
        cursor: pointer;
        &:hover{
            background-color: rgba(255,255,255, 0.5);
            border-radius: 6px;
        }
    }
    .instagram{
        width: 30px;
        height: 30px;
        cursor: pointer;
        &:hover{
            background-color: rgba(255,255,255, 0.5);
            border-radius: 6px;
        }
    }
    .twitter{
        width: 35px;
        height: 35px;
        cursor: pointer;
        &:hover{
            background-color: rgba(255,255,255, 0.5);
            border-radius: 6px;
        }
    }
`;

const General = styled.div`
    display: flex;
    flex-direction: column;
    h1{
        color: rgb(255,218,99);
        font-size: 2rem;
        font-weight: 300;
    }
    .bio{
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        height: 250px;
        width: 300px;
        p{
            color: rgb(255,218,99);
        }
    }
`;

const Information = styled.div`
    display: flex;
    padding: 2%;
    background-color: rgb(28, 49, 68);
    height: 300px;
    justify-content: space-between;
    
`;

const Header = styled.div`
    background-color: rgb(78, 107, 140);
    display: flex;
    position: relative;
    justify-content: flex-end;
    height: 400px;
    img{
        position: absolute;
        bottom: -40%;
        margin: 0 auto;
        left: 35%;
        width: 300px;
        height: 300px;
    }
    
`;

const Stats = styled.div`
    width: 100%;
    max-width: 200px;
    
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
`;




const mapDispatchToProps = (dispatch) => {
    return {
        addPhoto: (photo, uid, title, artist, created, palette) => dispatch(addPhoto(photo, uid, title, artist, created, palette)),
        uploadAvatar: (files, uid) => dispatch(uploadAvatar(files, uid)),
        addBio: (bio, uid) => dispatch(addBio(bio, uid)),
        editInfo: (firstName, lastName, bio, facebook, instagram, twitter, uid) => dispatch(editInfo(firstName, lastName, bio, facebook, instagram, twitter, uid))
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);