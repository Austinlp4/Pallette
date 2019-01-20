import React from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import styled from 'styled-components';

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

    render(){
        const post = this.state.post;
        return (
            <Container onClick={() => {this.props.history.push('/')}}>
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
                </Info>
                </Modal>
            </Container>
        )
        
    }
}

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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(SingleCard);