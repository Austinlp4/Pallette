import React from 'react';
import styled from 'styled-components';
import firebase from '../../firebase';
import "react-alice-carousel/lib/alice-carousel.css";
import View from '../../images/view.png';
import Like from '../../images/heart.png';
import { connect } from 'react-redux';
import { addView, addLike } from '../../store/actions/projectActions.js';


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

  // galleryItems() {
  //   return (
  //     this.state.photos.map((item, i) => (
  //       <div key={`key-${i}`} className="yours-custom-class">
  //       <Card
  //       id={item.id}
  //       key={item.id}
  //       post={item}
  //     >
  //       {/* <NavLink to={`${this.props.match.path}/${post.key}`}> */}
  //       <img src={item.url} alt="" onClick={() => this.pageFlip(item.id, item.uid)}/>
  //       <div className="banner">
  //         <div className="title">
  //           <h1>{item.title}</h1>
  //           <h4>{item.artist}</h4>
  //         </div>
  //         <div className='like-container' onClick={() => this.handleLike(item.id, item.uid)}>
  //           <img className="like" src={Like} alt="" />
  //           <h4>{item.likes}</h4>
  //         </div>
  //         <div className='view-container'>
  //           <img className="view" src={View} alt="" />
  //           <h4>{item.views}</h4>
  //         </div>
  //       </div>

  //       {/* </NavLink> */}
  //     </Card></div>
  //     ))
  //   )
  // };

  pageFlip = (key, uid) => {
    console.log('key, uid', key, uid)
    this.props.addView(key, uid)
    this.props.history.push(`/${uid}/${key}`);
    
  };


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
    </Card>
    ))}
      </Container>
    );

  }
  }

  const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin: 100px auto;
  padding-left: 8%;
`;


  const Wrapper = styled.div`
  .alice-carousel__prev-btn,
  .alice-carousel__next-btn {
    display: inline-block;
    width: 50%;
    padding: 15px 10px;
    box-sizing: border-box;
  
    [data-area] {
      &::after {
        content: attr(data-area);
        position: relative;
      }
    }

    .alice-carousel__prev-btn-wrapper {
      text-align: center;
    }

    .alice-carousel__next-btn-wrapper {
      text-align: center;
    }


    .alice-carousel__prev-btn-item,
   .alice-carousel__next-btn-item {
  display: inline-block;
  color: white;
  cursor: pointer;
  font-family: 'Lobster', cursive;
  font-size: 2rem;
  font-weight: 100;
  &:hover {
    color: pink;
  }
  &.__inactive {
    opacity: .4;
  }
}
  }
  `;

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
    .like-container{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 50px;
      h4{
          align-self: center;
      }
    }
  .like {
    width: 25px;
    height: 20px;
    margin-right: 4%;
  }
    .title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      width: 150px;
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
    addView: (key, uid) => dispatch(addView(key, uid)),
    addLike: (key, uid, auth) => dispatch(addLike(key, uid, auth))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MostLiked);