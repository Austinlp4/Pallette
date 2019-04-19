import React from 'react';
import styled from 'styled-components';
import firebase from '../../firebase';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import View from '../../images/view.png';
import Like from '../../images/heart.png';
import { connect } from 'react-redux';
import { addView, addLike } from '../../store/actions/projectActions.js';
import {
  Card, 
  Container,
  Imgcont,
  Wrapper
} from './MostViewedStyle';


class MostViewed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      
    }
  }

  responsive = {
    500: { items: 1 },
        900: { items: 2 },
        1025: { items: 2 },
        1300: { items: 2 },
        1400: { items: 3 },
        1700: { items: 3 },
        1800: { items: 4 }
  };

  
  componentDidMount() {
    let itemsRef = firebase.database().ref(`photos`);
    itemsRef.on('value', data => {
      let works = [];
      data = Object.values(data.val());
      data.forEach((child) => {
        works.push(
          Object.values(child)
        );
      });
      let newWorks = Object.values(works);
      let photos = [];
      newWorks.map((child, i) => 
        child.map((obj, i) => 
          photos.push(
            obj
          )
        )
      )
      let newPhotos = photos.sort((a, b) => a.views - b.views).reverse();
      console.log(newPhotos)
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

  galleryItems() {
    return (
      this.state.photos.map((item, i) => (
        <div key={`key-${i}`} className="yours-custom-class">
        <Card
        id={item.id}
        key={item.id}
        post={item}
      >
        {/* <NavLink to={`${this.props.match.path}/${post.key}`}> */}
        <img src={item.url} alt="" onClick={() => this.pageFlip(item.id, item.uid)}/>
        <div className="banner">
          <div className="title">
            <h1>{item.title}</h1>
            <h4>{item.artist}</h4>
          </div>
          <div className='like-container' onClick={() => this.handleLike(item.id, item.uid)}>
            <img className="like" src={Like} alt="" />
            <h4>{item.likes}</h4>
          </div>
          <div className='view-container'>
            <img className="view" src={View} alt="" />
            <h4>{item.views}</h4>
          </div>
        </div>

        {/* </NavLink> */}
      </Card></div>
      ))
    )
  };

  pageFlip = (key, uid) => {
    console.log('key, uid', key, uid)
    this.props.addView(key, uid)
    this.props.history.push(`/${uid}/${key}`);
    
  };

  handleLike = (key, uid) => {
    const auth = this.props.auth.uid;
    this.props.addLike(key, uid, auth);
  }


  render () {
    // const anObj = this.state.photos[0];
    // console.log(anObj)

    return (
      <Container>
          {this.state.photos.map((item, i) => (
      <Card
      id={item.id}
      key={item.id}
      post={item}
    >
      {/* <NavLink to={`${this.props.match.path}/${post.key}`}> */}
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

      {/* </NavLink> */}
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



export default connect(mapStateToProps, mapDispatchToProps)(MostViewed);