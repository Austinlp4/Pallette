import React from 'react';
import styled from 'styled-components';
import firebase from '../../firebase';
import "react-alice-carousel/lib/alice-carousel.css";
import View from '../../images/view.png';
import Like from '../../images/heart.png';
import { connect } from 'react-redux';
import { addView, addLike } from '../../store/actions/projectActions.js';
import { Card, Container, Imgcont, Wrapper } from './MostViewedStyle';

class MostLiked extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      
    }
  }

  
  
  componentDidMount() {
    let itemsRef = firebase.database().ref(`photos`);
    itemsRef.on('value', data => {
      let works = [];
      data = Object.values(data.val());
      console.log('data', data)
      data.forEach((child) => {
        works.push(
          Object.values(child)
        );
      });
      let newWorks = Object.values(works);
      console.log('newWorks', works)
      let photos = [];
      newWorks.map((child, i) => 
        child.map((obj, i) => 
          photos.push(
            obj
          )
        )
      )
      let newPhotos = photos.sort((a, b) => a.likes - b.likes).reverse();
      this.setState({
        photos: newPhotos,
      });
    });
  }

  onSlideChange(e) {
    console.log('Item`s position during a change: ', e.item);
    console.log('Slide`s position during a change: ', e.slide);
  };

  onSlideChanged(e) {
    console.log('Item`s position after changes: ', e.item);
    console.log('Slide`s position after changes: ', e.slide);
  };

  handleLike = (key, uid) => {
    const auth = this.props.auth.uid;
    this.props.addLike(key, uid, auth);
  }

  pageFlip = (key, uid) => {
    console.log('key, uid', key, uid)
    this.props.addView(key, uid)
    this.props.history.push(`/${uid}/${key}`);
    
  };


  render () {
    return (
      <Container>
          {this.state.photos.map((item, i) => (
      <Card
      id={item.id}
      key={item.id}
      post={item}
    >
      <img src={item.url} alt="" onClick={() => this.pageFlip(item.id, item.uid)}/>
      <div className="banner">
        <div className="title">
          <h1>{item.title}</h1>
          <h4>{item.artist}</h4>
        </div>
        <Imgcont>
        <div className='like-container' onClick={() => this.handleLike(item.id, item.uid)}>
          <img className="like" src={Like} alt="" />
          <h4>{item.likes}</h4>
        </div>
        <div className='view-container'>
          <img className="view" src={View} alt="" />
          <h4>{item.views}</h4>
        </div>
        </Imgcont>
      </div>
    </Card>
    ))}
      </Container>
    );

  }
  }

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addView: (key, uid) => dispatch(addView(key, uid)),
    addLike: (key, uid, auth) => dispatch(addLike(key, uid, auth))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MostLiked);