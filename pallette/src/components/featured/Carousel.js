import React from 'react';
import styled from 'styled-components';
import Slide from './Slide'
import LeftArrow from './LeftArrow'
import RightArrow from './RightArrow'
import firebase from '../../firebase';



class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      currentIndex: 0
    }
  }

  componentDidMount() {
    let itemsRef = firebase.database().ref(`photos`);
    itemsRef.on('value', data => {
      let works = [];
      data.forEach((child) => {
        works.push(
          Object.values(child.val())
        );
      });
      let newWorks = Object.values(works[0]);
      console.log('works', newWorks)
      let photos = [];
      newWorks.map(child => 
        photos.push(
          child.post.url
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