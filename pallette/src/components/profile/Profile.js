import React from 'react';
import styled from 'styled-components';
import firebase, {storage} from '../../firebase';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image: null,
            url: '',
            progress: 0,
            bio: '',
            user: ''
        };
    }

    componentWillMount() {
        if(this.props.user){
            this.setState({user: this.props.user})
        }
    }

    componentDidMount(){
        if(this.props.user){
            storage.ref('images').child(`${this.props.user.uid}/profilepic/${this.props.user.uid}`).getDownloadURL().then(url => {
                this.setState({url})
        })
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
            storage.ref('images').child(`${this.props.user.uid}/profilepic/${this.props.user.uid}}`).getDownloadURL().then(url => {
                console.log(url);
                this.setState({url});
            })          
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

    render(){
        const user = this.props.user;
        console.log(this.props.user.uid)
        return (
              <ProContainer>
                  {this.props.user ?
                  <Upload className='upload'>
                      <div className='upicon'>
                          <input type='file' onChange={this.handleChange}/>
                          <button onClick={this.handleUpload}>Upload</button>
                      </div>
                      <progress value={this.state.progress} max='100'/>
                  </Upload>
                  :
                  <div style={{ width: '300px', height: '300px' }}>
                      <img src={this.state.url} alt="Profile pic" style={{width: '100%', height: 'auto'}}/>
                  </div>
                  }
                  <Info>
                    <h1>{user.firstName} {user.lastName}</h1>
                    {user.bio 
                    ?
                    <div>
                        <p>
                            {user.bio}
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
              </ProContainer>
        )
    }
}

const Upload = styled.div`
  border: 1px solid lightgrey;
  border-radius: 8px;
  height: 400px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 3%;
  .upload{
      justify-self: flex-start;
  }
`;

const Info = styled.div`
  width: 100%;
  padding: 5%;
`;

export default Profile;