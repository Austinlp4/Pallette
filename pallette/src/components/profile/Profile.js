import React from 'react';
import styled from 'styled-components';
import firebase, {storage} from '../../firebase';
import ProfileWorks from './ProfileWorks';
import { connect } from 'react-redux';

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

const Upload = styled.div`
  border: 1px solid lightgrey;
  border-radius: 8px;
  height: 400px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  .fileup{
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
    z-index: -1;
  }
  .fileup + label {
    width: 150px;
    height: 35px;
    font-size: .9rem;
    font-weight: 700;
    color: rgb(45,54,98);
    background-color: rgb(255, 0, 236);
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 6px;
    }
    .go + label{
        color: rgb(247,247,247);
        background-color: rgb(22, 155, 35);
    }
    .fileup:focus + label,
    .fileup + label:hover {
        background-color: rgba(255, 0, 236, .5);
    }
    .go:focus + label,
    .go + label:hover{
        color: rgb(247,247,247);
        background-color: rgb(22, 155, 35);
      }
    .fileup + label {
        cursor: pointer; 
    }
    `;

const ProContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 3%;
  flex-direction: column;
  .upload{
      justify-self: flex-start;
  }
`;

const Info = styled.div`
  width: 100%;
  padding: 5%;
`;

const InfoContainer = styled.div`
  display: flex;
`;

const Card = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 9px 0px 0px white, 
    inset 0 -9px 0px 0px white, 
    inset 10px 0 15px -4px rgba(31, 73, 125, 0.2),
    inset -10px 0 15px -4px rgba(31, 73, 125, 0.2);
  .fileup{
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
    z-index: -1;
  }
  .fileup + label {
    width: 150px;
    height: 35px;
    font-size: .9rem;
    font-weight: 700;
    color: rgb(45,54,98);
    background-color: rgb(255, 0, 236);
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 6px;
    z-index: 3;
    }

    .fileup:focus + label,
    .fileup + label:hover {
        background-color: rgb(255, 70, 236);
        color: white;
    }
    .fileup + label {
        cursor: pointer; 
    }
    button{
        position: absolute;
        margin-left: 100px;
        width: 100px;
        height: 35px;
        border: none;
        border-radius: 6px;
        background-color: rgb(45,54,98);
        color: rgb(255, 0, 236);
        &:hover{
            background-color: rgba(45,54,98, .5);
            color: white;
        }
    }
`;

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Profile);