import React from 'react';
import styled from 'styled-components';
import Slide from './Slide'
import LeftArrow from './LeftArrow'
import RightArrow from './RightArrow'
import firebase from '../../firebase';
import analyze from 'rgbaster';


class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      currentIndex: 0
    }
  }

  getParent = (snapshot) => {
    // You can get the reference (A Firebase object) from a snapshot
    // using .ref().
    var ref = snapshot.ref();
    // Now simply find the parent and return the name.
    return ref.parent().name();
  }

  componentDidMount() {
    let itemsRef = firebase.database().ref(`photos`);
    itemsRef.on('value', data => {
      let works = [];
      console.log(data.val())
      data.forEach((child) => {
        works.push(
          Object.values(child.val())
        );
      });
      let newWorks = Object.values(works);
      console.log('newWorks', works)
      let photos = [];
      newWorks.map(child => 
        photos.push(
          child.url
        )
      )
      this.setState({
        photos: photos,
      });
    });
  }

  goToPrevSlide = () => {

  }

  goToNextSlide = () => {

  }


  render () {
    // const anObj = this.state.photos[0];
    // console.log(anObj)
      return (
        <div className='slider'>
          <Slide />

          <LeftArrow 
            goToPrevSlide={this.goToPrevSlide}
          />
          <RightArrow 
            goToNextSlide={this.goToNextSlide}  
          />
        </div>
      );
    }
  }



export default Slider;