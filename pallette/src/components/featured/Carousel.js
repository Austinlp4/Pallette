import React from 'react';
import styled from 'styled-components';
import firebase from '../../firebase';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import View from '../../images/view.png';
import { connect } from 'react-redux';
import { addView } from '../../store/actions/projectActions.js';


class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      
    }
  }

  responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 4 },
  };

  
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
      this.setState({
        photos: photos,
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
        onClick={() => this.pageFlip(item.id, item.uid)}
      >
        {/* <NavLink to={`${this.props.match.path}/${post.key}`}> */}
        <img src={item.url} alt="" />
        <div className="banner">
          <div className="title">
            <h1>{item.title}</h1>
            <h4>{item.artist}</h4>
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


  render () {
    // const anObj = this.state.photos[0];
    // console.log(anObj)

      const items = this.galleryItems();
   
      return (
        <AliceCarousel
          items={items}
          duration={400}
          autoPlay={false}
          startIndex = {1}
          fadeOutAnimation={true}
          mouseDragEnabled={true}
          playButtonEnabled={false}
          autoPlayInterval={2000}
          autoPlayDirection="rtl"
          responsive={this.responsive}
          disableAutoPlayOnAction={true}
          onSlideChange={this.onSlideChange}
          onSlideChanged={this.onSlideChanged}
        />
      );
  
    }
  }

  const Card = styled.div`
  width: 275px;
  height: 275px;
  overflow: hidden;
  background: no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1% 1%;
  border-radius: 6px;
  position: relative;
  img {
    position: relative;
    width: 500px;
    height: auto;
    background: no-repeat center;
    background-size: cover;
  }
  .banner {
    box-sizing: border-box;
    position: absolute;
    z-index: 3;
    background-color: white;
    height: 60px;
    width: 100%;
    bottom: 0;
    border: 1px solid lightgrey;
    border-top: none;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3%;
    left: 0;
    h1 {
      font-size: 1.2rem;
      color: rgb(45, 54, 98);
      margin: 0;
    }
    h4 {
      font-size: 0.9rem;
      color: rgb(45, 54, 98);
      margin: 0;
    }
    .view-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 50px;
        h4{
            align-self: center;
        }
      }
    .view {
      width: 30px;
      height: 20px;
    }
    .title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      width: 100px;
    }
    
  }
`;

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addView: (key, uid) => dispatch(addView(key, uid))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Slider);