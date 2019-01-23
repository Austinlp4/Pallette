import React from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import styled from 'styled-components';
import { addComment} from '../../store/actions/projectActions.js';
import Avatar from '../../images/avatar-profile.png';

class SingleCard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post: ''
        }
    }

   async componentDidMount(){
        let itemsRef = firebase.database().ref(`photos/${this.props.match.params.uid}/${this.props.match.params.key}`);
      await itemsRef.on('value', data => {
           console.log('data.val', data.val())
            this.setState({ 
              post: {
                  ...data.val()
            
            }
            },() => {
                this.setState({ 
                    paletteOne: this.state.post.palette[0],
                    paletteTwo: this.state.post.palette[1],
                    paletteThree: this.state.post.palette[2],
                    paletteFour: this.state.post.palette[3],
                    paletteFive: this.state.post.palette[4],
                })
            })
        })
    }

    handleComment = event => {
        this.setState({
            [event.target.name]: event.target.value,
          });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const key = this.props.match.params.key;
        const uid = this.props.match.params.uid;
        const useruid = this.props.auth.uid;
        const { comment } = this.state;
        const url = this.props.profile.url;
        const name = `${this.props.profile.firstName} ${this.props.profile.lastName}`
        this.props.addComment(key, uid, name, url, comment, useruid)
        this.setState({ comment: '' })
    }

    closeModal = event => {
        if (event.target.dataset.type === 'modal-container') {
            this.props.history.push('/')
          }
    }


    scrollToBottom = (event) => {
        // let elementHeight = event.target.scrollHeight;
        // console.log('scroll top', event.target.scrollTop)
        // event.target.scrollTop = elementHeight
        // console.log('scroll top',event.target.scrollTop)
        let element = document.getElementById('bottom')
        element.scrollTop = element.scrollHeight;
        console.log('height', element.scrollHeight)
        console.log('top', element.scrollTop)
    }


    render(){
        const post = this.state.post;
        console.log('params', this.props.match.params)
        return (
            <Container data-type='modal-container' onClick={this.closeModal}>
                <Modal>
                <div style={{ width: '40px', height: '700px' , display: 'flex', flexDirection: 'column'}}>
                    <div className='uno' style={{ backgroundColor: `${this.state.paletteOne}` , height: '20%', width: '40px'}}></div>
                    <div className='dos' style={{ backgroundColor: `${this.state.paletteTwo}` , height: '20%', width: '40px'}}></div>
                    <div className='tres' style={{ backgroundColor: `${this.state.paletteThree}` , height: '20%', width: '40px'}}></div>
                    <div className='quatro' style={{ backgroundColor: `${this.state.paletteFour}` , height: '20%', width: '40px'}}></div>
                    <div className='cinco' style={{ backgroundColor: `${this.state.paletteFive}` , height: '20%', width: '40px'}}></div>
                </div>
                    <div className='image-cont'><Image src={post.url} alt="" /> </div>
                <Info>
                    <h2>{post.title}</h2>
                    <h5>By: {post.artist}</h5>
                    <div>
                        {!post.comments
                        ?
                         <div>
                            <h3>Add a comment!</h3>
                            <div>
                            <input type="text" name='comment' value={this.state.comment} onChange={this.handleComment}/>
                            <button onClick={this.handleSubmit}>Add</button>
                        </div>
                        </div>
                        :
                        <div>
                        <CommentBox id='bottom' onLoad={this.scrollToBottom} className='MessageList'>
                            {Object.values(post.comments).map(comment => {
                                console.log('comment', comment)
                                return (
                                    <div>
                                        <div style={{ display: 'flex', width: '180px', justifyContent: 'space-between' , alignItems: 'center'}}>
                                        {comment.url
                                        ?
                                        <img src={comment.url} alt="" style={{ width: '30px', height: '30px' , borderRadius: '50px'}}/>
                                        :
                                        <img src={Avatar} alt="" style={{ width: '30px', height: '30px' , borderRadius: '50px'}}/>
                                    }
                                    
                                    <h3 style={{ fontSize: '1.1rem' , fontWeight: '300'}}>{comment.name}</h3>
                                    </div>
                                    <p style={{ margin: '2px auto', color: 'white' }}>{comment.comment}</p>
                                </div>
                                )
                            })}
                        </CommentBox>
                        <div style={{ display: 'flex', alignItems: 'center' , marginTop: '10px'}}>
                            <textarea type="text" name='comment' value={this.state.comment} placeholder='Add a Comment...' onChange={this.handleComment} style={{ padding:'5px', width: '300px', height: '75px', borderRadius: '6px', border: 'none',backgroundColor: 'rgb(28, 40, 50)', color: 'white' }}/>
                            <Settings onClick={this.handleSubmit}>Add</Settings>
                        </div>
                        </div>
                    }
                    </div>
                </Info>
                </Modal>
            </Container>
        )
        
    }
}

const Settings = styled.button`
    border: none;
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    box-shadow: 0 4px 2px -2px rgba(28, 49, 68, 0.6);
    background-color: rgb(255,102,79);
    color: rgba(255, 218, 99, 0.9);
    height: 75px;
    width: 75px;
    justify-self: end;
    font-weight: 500;
    font-size: 1.1rem;
    &:hover{
        cursor: pointer;
        background-color: rgb(255,134,118);
    }
`;

const CommentBox = styled.div`
    height: 400px;
    width: 375px;
    overflow: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0.5em;
        height: 0.5em;
        background-color: black;
        border-radius: 6px;
       }
       ::-webkit-scrollbar-thumb {
        background-color: lightblue;
        border-radius: 6px;
     
        &:hover {
         background: rgba(255,255,255,.2);
        }
       }
`;


const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 800px;
`;

const Modal = styled.div`
    height: 700px;
    display: flex;
    overflow: hidden;
    .image-cont{
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.9)
    }
    border-radius: 6px;
`;

const Container = styled.div`
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background-color: rgb(28, 49, 68);
  color: rgb(255,218,99);
  h2{
      font-size: 2rem;
  }
`;

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (key, uid, name, url, comment, useruid) => dispatch(addComment(key, uid, name, url, comment, useruid)),
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCard);