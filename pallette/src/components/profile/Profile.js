import React from 'react';
import firebase, {storage} from '../../firebase';
import ProfileWorks from './ProfileWorks';
import { connect } from 'react-redux';
import { Upload,
         ProContainer,
         Info,
         Card } from './ProfileStyles.js';
import { addPhoto, uploadAvatar, addBio } from '../../store/actions/projectActions';
import moment from 'moment';
import analyze from 'rgbaster';
import styled from 'styled-components';
import Facebook from '../../images/facebook.png';
import Instagram from '../../images/instagram.png';
import Twitter from '../../images/twitter.png';
import ColorThief from '../../ColorThief';
import { Redirect } from 'react-router-dom';


class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image: null,
            url: '',
            progress: 0,
            bio: '',
            user: '',
            photo: null,
            title: '',
            loaded: false,
            showModal: false,
            hovered: false,
            upload: false,
            showModalTwo: false
        };
        this.colorThief = new ColorThief();
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
        const {image} = this.state;
        const uid = this.props.auth.uid;
        this.props.uploadAvatar(image, uid)
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
        this.setState({ hovered: !this.state.hovered })
    }

    leave = () => {
        this.setState({ hovered: !this.state.hovered })
    }

    editAvatar = () => {
        this.setState({ showModalTwo: !this.state.showModalTwo })
    }


    render(){
        console.log('palette',this.props.profile)
        if(!this.props.auth.uid) return <Redirect to='/cta'/>  
        return (
            <ProContainer>
            <InfoContainer>
                <Header>
                  {this.props.profile.url ?
                  <div style={{ margin: '3%', width: '300px', height: '300px', borderTopLeftRadius: '150px', borderBottomRightRadius: '150px', overflow: 'hidden', background: 'no-repeat center', backgroundSize: 'cover', boxSizing: 'border-box'}} className='pro-cont' onMouseEnter={this.enter} onMouseLeave={this.leave}>
                      <img src={this.props.profile.url} alt="Profile pic" style={{width: '100%', height: 'auto', maxHeight: '300px', maxWidth: '300px',borderTopLeftRadius: '150px', borderBottomRightRadius: '150px', borderTopRightRadius: '150px', borderBottomLeftRadius: '150px' ,overflow: 'hidden'}}/>
                      {
                          this.state.hovered
                          ?
                          <Edit onClick={this.editAvatar}>
                              + Edit
                          </Edit>
                          :
                          null
                      }
                  </div>
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
                        <Modal>
                            <input type="text" value={this.state.firstName}/>
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
                            <Upload className='upload' style={{ positiion: 'relative' }}>
                                <div className='upicon'>
                                    <input type='file' name='file' id='file' onChange={this.handleChange} className='fileup'/>
                                    <label htmlFor="file">Choose a file</label>
                                    <button onClick={this.handleUpload}>Upload</button>
                                </div>
                            </Upload>
                        </Modal>
                    </ModalContainer>
                    :
                    null
                  }
                  </InfoContainer>
                  <div>
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

const Edit = styled.div`
    position: absolute;
    bottom: -40%;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    height: 150px;
    width: 300px;
    left: 35%;
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
    overflow: hidden;
    border-radius: 6px;
    background-color: rgb(78, 107, 140);
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

// const Info = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   max-width: 400px;
//   background-color: rgb(28, 49, 68);
//   color: rgb(255,218,99);
//   h2{
//       font-size: 2rem;
//   }
// `;

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
        uploadAvatar: (image, uid) => dispatch(uploadAvatar(image, uid)),
        addBio: (bio, uid) => dispatch(addBio(bio, uid))
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