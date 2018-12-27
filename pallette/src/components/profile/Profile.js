import React from 'react';
import firebase, {storage} from '../../firebase';
import ProfileWorks from './ProfileWorks';
import { connect } from 'react-redux';
import { Upload,
         ProContainer,
         Info,
         InfoContainer,
         Card } from './ProfileStyles.js'

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

//   async componentWillMount() {

//         await  this.setState({user: this.props.user})
        
//     }

  componentDidMount(){  
        storage.ref(`images/${this.props.user.uid}/profilepic/${this.props.user.uid}`).getDownloadURL().then(url => {
             this.setState({url, loaded: true, user: this.props.user})
        })
      
    }

   componentDidUpdate(){
        if(this.state.photo){
            let art = this.state.photo
            const photo = {
                art, 
                likes: 0,
                title: this.state.title,
                date: Date.now(),
                points: 0,
                artist: `${this.props.user.firstName} ${this.props.user.firstName}`
            }
          const ref = firebase.database().ref(`photos/${this.props.user.uid}`);
             ref.push({photo});
        }

    }

    handleChange = event => {
        if(event.target.files[0]){
            const image = event.target.files[0];
            this.setState(() => ({image}))
        }
    }

    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = storage.ref(`images/${this.props.user.uid}/profilepic/${this.props.user.uid}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot)=> {
            //progress function
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({progress})
        },
        (error) => {
            //error function
            console.log(error)
        },
        () => {
            //complete function
            storage.ref('images').child(`${this.props.user.uid}/profilepic/${this.props.user.uid}`).getDownloadURL().then(url => {
                this.setState({url});
            })          
        })
    }

    addPhoto = () => {
        const {image} = this.state;
        storage.ref(`images/${this.props.user.uid}/${image.name}`).put(image);
        this.getURL(image);
    }

    getURL = (image) => {
        storage.ref('images').child(`${this.props.user.uid}/${image.name}`).getDownloadURL().then(photo => {
            this.setState({photo, image: null});
        })     
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
        const user = this.state.user;

        return (
            <ProContainer>
            <InfoContainer>
                  {user ?
                  <div style={{ width: '400px', height: '400px' }}>
                      <img src={this.state.url} alt="Profile pic" style={{width: '100%', height: 'auto'}}/>
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
                    <h1>{this.props.user.firstName} {this.props.user.lastName}</h1>
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
                      <input type='file' name='file' id='filetwo' onChange={this.handleChange} className={this.state.image ? 'fileup go' : 'fileup'}/>
                      <label htmlFor="filetwo" >{this.state.image ? <input type="text" value={this.state.title} name='title' onChange={this.handleTitle}/> : 'Add Artwork' }</label>
                      <button onClick={this.addPhoto}>Add</button>
                      </Card>
                      <ProfileWorks {...this.props} user={this.props.user}/>
                  </div>
                  </ProContainer>
        )
    }
}



const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Profile);