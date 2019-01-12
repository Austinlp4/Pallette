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
            loaded: false
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

    



    render(){
        console.log('palette',this.props.profile)
        if(!this.props.auth.uid) return <Redirect to='/cta'/>
        return (
            <ProContainer>
            <InfoContainer>
                  {this.props.profile.url ?
                  <div style={{ margin: '3%', width: '500px', height: '400px', borderRadius: '50%'}} className='pro-cont'>
                      <img src={this.props.profile.url} alt="Profile pic" style={{width: '450px', height: 'auto', borderRadius: '50%'}}/>
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
                  <Info>
                    <h1>{this.props.profile.firstName} {this.props.profile.lastName}</h1>
                    {this.props.profile.bio 
                    ?
                    <div>
                        <p>
                            {this.props.profile.bio }
                        </p>
                    </div>
                    :
                    <div>
                        <textarea value={this.state.bio} name='bio' onChange={this.handleInputChange}/>
                        <button onClick={this.handleSubmit}>
                            Add Bio
                        </button>
                    </div>
                    }
                    
                  </Info>
                  <Stats>

                  </Stats>
                  <Social>
                        <div className='facebook'><img src={Facebook} alt="" style={{ width: '75px' }}/></div>
                        <div className='instagram'><img src={Instagram} alt="" style={{ width: '75px' }}/></div>
                        <div className='twitter'><img src={Twitter} alt="" style={{ width: '75px' }}/></div>
                    </Social>
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



const Stats = styled.div`
    width: 100%;
    max-width: 200px;
    
`;

const InfoContainer = styled.div`
  display: flex;
  
`;

const Social = styled.div`
  height: 250px;
  width: 100px;
  .facebook{
      background-color: rgb(41, 82, 150);
      width: 100%;
      height: 75px;
      box-shadow: inset -10px 0 15px -4px rgba(31, 73, 125, 0.5)
  }
  .instagram{
    background-color: rgb(254, 216, 116);
    width: 100%;
    height: 75px;
    box-shadow: inset -10px 0 15px -4px rgba(31, 73, 125, 0.3)
  }
  .twitter{
      background-color: rgb(250, 250, 250);
      width: 100%;
      height: 75px;
      box-shadow: inset -10px 0 15px -4px rgba(31, 73, 125, 0.3)
  }
  .facebook, .instagram, .twitter{
      display: flex;
      justify-content: center;
      align-items: center;
  }
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