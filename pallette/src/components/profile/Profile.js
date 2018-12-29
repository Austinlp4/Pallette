import React from 'react';
import firebase, {storage} from '../../firebase';
import ProfileWorks from './ProfileWorks';
import { connect } from 'react-redux';
import { Upload,
         ProContainer,
         Info,
         InfoContainer,
         Card } from './ProfileStyles.js';
import { addPhoto, uploadAvatar } from '../../store/actions/projectActions';


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
        const artist = `${this.props.profile.firstName} ${this.props.profile.firstName}`
        if(this.state.photo){
        this.props.addPhoto(photo, uid, title, artist);
        this.setState({photo: null, title: ''})
        }
            
    }


    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
          });
    }

    handleSubmit = () => {
        if(this.state.bio){
            const bio = this.state.bio;
            const ref = firebase.database().ref(`users/${this.props.user.uid}`);
             ref.update({bio});
        }
    }

    handleTitle = event => {
        this.setState({ 
            [event.target.name]: event.target.value
         });
    }



    render(){
        console.log(this.props.profile.url)
        return (
            <ProContainer>
            <InfoContainer>
                  {this.props.auth.uid ?
                  <div style={{ width: '400px', height: '400px' }}>
                      <img src={this.props.profile.url} alt="Profile pic" style={{width: '100%', height: 'auto'}}/>
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
                    {this.props.user.bio 
                    ?
                    <div>
                        <p>
                            {this.props.user.bio }
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
                  </InfoContainer>
                  <div>
                      <Card>
                      <input type='file' name='file' id='filetwo' onChange={this.handlePhotoChange} className={this.state.photo ? 'fileup go' : 'fileup'}/>
                      <label htmlFor="filetwo" >{this.state.photo ? <input className='pic-title' type="text" value={this.state.title} name='title' onChange={this.handleTitle} placeholder='Add Title..'/> : 'Add Artwork' }</label>
                      <button onClick={this.addPhoto}>Add</button>
                      </Card>
                      <ProfileWorks {...this.props}/>
                  </div>
                  </ProContainer>
        )
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        addPhoto: (photo, uid, title, artist) => dispatch(addPhoto(photo, uid, title, artist)),
        uploadAvatar: (image, uid) => dispatch(uploadAvatar(image, uid))
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);