import React from 'react';
import Swiper from 'react-id-swiper';
import styled from 'styled-components';
import ImageOne from '../../images/image1.jpg';
import ImageTwo from '../../images/image2.jpg';
import ImageThree from '../../images/image3.jpg';
import ImageFour from '../../images/image4.jpg';
import ImageFive from '../../images/image5.jpg';

class Carousel extends React.Component {
    render () {
        const params = {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            },
            pagination: {
              el: '.swiper-pagination'
            }
          }

      return (
        <Container>
        <Swiper {...params} style={{ zIndex: '1' }}>
            <div style={{ width: '500px', height: '500px'}}>
              <img src={ImageOne} alt=""/>            
            </div>
            <div style={{ width: '500px', height: '500px' }}>
              <img src={ImageTwo} alt=""/>
            </div>
            <div style={{ width: '500px', height: '500px'}}>
              <img src={ImageThree} alt=""/>
            </div>
            <div style={{ width: '500px', height: '500px'}}>
              <img src={ImageFour} alt=""/>
            </div>
            <div style={{ width: '500px', height: '500px'}}>
            <img src={ImageFive} alt=""/>
            </div>
        </Swiper>
        </Container>
      );
    }
  }

const Container = styled.div`
   width: 100%;
   img{
     width: 90%;
     height: auto;
   }
  .swiper-container{
    width: 900px;
    padding: 100px;
  }
  .swiper-container-3d{
    perspective: 900px;
  }
  .swiper-pagination-bullets{
    display: none;
  }
`;

  export default Carousel;