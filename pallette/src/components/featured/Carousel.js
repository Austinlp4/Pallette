import React from 'react';
import Swiper from 'react-id-swiper';

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
        <div>
        <Swiper {...params} style={{ zIndex: '1' }}>
            <div style={{ width: '600px', height: '600px', backgroundColor: 'lightgreen' }}>Slide 1</div>
            <div style={{ width: '600px', height: '600px', backgroundColor: 'lightpink' }}>Slide 2</div>
            <div style={{ width: '600px', height: '600px', backgroundColor: 'lightblue' }}>Slide 3</div>
            <div style={{ width: '600px', height: '600px', backgroundColor: 'lightpurple' }}>Slide 4</div>
            <div style={{ width: '600px', height: '600px', backgroundColor: 'lightred' }}>Slide 5</div>
        </Swiper>
        </div>
      );
    }
  }

  export default Carousel;