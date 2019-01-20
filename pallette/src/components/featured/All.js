import React from 'react';
import styled from 'styled-components';
import firebase from '../../firebase';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import View from '../../images/view.png';
import Like from '../../images/heart.png';
import { connect } from 'react-redux';
import { addView, addLike } from '../../store/actions/projectActions.js';


class All extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      
    }
  }

  responsive = {
    500: { items: 1 },
    900: { items: 3 },
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
      this.shuffleArray(photos);
      this.setState({
        photos: photos,
      });
    });
  }

  shuffleArray = (array) => {
      for(let i=array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
  }


  galleryItems() {
    return (
      this.state.photos.map((item, i) => (
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
      </Card>
      ))
    )
  };

  pageFlip = (key, uid) => {
    console.log('key, uid', key, uid)
    this.props.addView(key, uid)
    console.log(this.props)
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
        style={{ backgroundColor: 'rgb(28, 49, 68)' }}
      >
        {/* <NavLink to={`${this.props.match.path}/${post.key}`}> */}
        
        <img src={item.url} alt="" onClick={() => this.pageFlip(item.id, item.uid)}/>
        <div className="banner">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '5px 5px 0 5px' }}>
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
          <div style={{ width: '100%', height: '6px' , display: 'flex', bottom: '0'}}>
            <div className='uno' style={{ backgroundColor: `${item.palette[0]}` , width: '20%', height: '6px'}}></div>
            <div className='dos' style={{ backgroundColor: `${item.palette[1]}` , width: '20%', height: '6px'}}></div>
            <div className='tres' style={{ backgroundColor: `${item.palette[2]}` , width: '20%', height: '6px'}}></div>
            <div className='quatro' style={{ backgroundColor: `${item.palette[3]}` , width: '20%', height: '6px'}}></div>
            <div className='cinco' style={{ backgroundColor: `${item.palette[4]}` , width: '20%', height: '6px'}}></div>
          </div>
        </div>
       
        
        {/* </NavLink> */}
      </Card>
      ))}
        </Container>
      );
  
    }
  }

  const Imgcont = styled.div`
    display: flex;
    width: 110px;
    justify-content: space-between;
  `;

  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1100px;
    margin: 100px auto;
    justify-content: center;
  `;

  const Card = styled.div`
  width: 325px;
  height: 325px;
  overflow: hidden;
  background: no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1% 1%;
  border-radius: 6px;
  position: relative;
  flex-direction: column;
  img {
    position: relative;
    width: 500px;
    height: auto;
    background: no-repeat center;
    background-size: cover;
    cursor: pointer;
  }
  .banner {
    box-sizing: border-box;
    position: absolute;
    z-index: 3;
    background-color: rgb(28, 49, 68);
    height: 65px;
    width: 100%;
    bottom: 0;
    border-top: none;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
    left: 0;
    h1 {
      font-size: 1.2rem;
      color: rgb(255,218,99);
      margin: 0;
    }
    h4 {
      font-size: 0.9rem;
      color: rgb(255,218,99);
      margin: 0;
    }
    .view-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 40px;
        border-radius: 6px;
        background-color: rgb(21, 37, 51);
        h4{
            align-self: center;
        }
      }
    .view {
      width: 30px;
      height: 20px;
      cursor: pointer;
    }
    .like-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 40px;
        border-radius: 6px;
        background-color: rgb(21, 37, 51);
        h4{
            align-self: center;
        }
      }
    .like {
      width: 25px;
      height: 20px;
      margin-right: 4%;
      cursor: pointer;
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



export default connect(mapStateToProps, mapDispatchToProps)(All);