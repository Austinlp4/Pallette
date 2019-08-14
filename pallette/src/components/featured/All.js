import React from 'react';
import firebase from '../../firebase';
import 'react-alice-carousel/lib/alice-carousel.css';
import View from '../../images/view.png';
import Like from '../../images/heart.png';
import { connect } from 'react-redux';
import { addView, addLike } from '../../store/actions/projectActions.js';
import { Imgcont, Container, Card } from './AllStyle';

class All extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
    };
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
      console.log('data', data);
      data.forEach(child => {
        works.push(Object.values(child));
      });
      let newWorks = Object.values(works);
      console.log('newWorks', works);
      let photos = [];
      newWorks.map((child, i) => child.map((obj, i) => photos.push(obj)));
      // this.shuffleArray(photos);
      this.setState({
        photos: photos,
      });
    });
  }

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  galleryItems() {
    return this.state.photos.map((item, i) => (
      <Card
        id={item.id}
        key={item.id}
        post={item}
        onClick={() => this.pageFlip(item.id, item.uid)}
      >
        <img src={item.url} alt="" />
        <div className="banner">
          <div className="title">
            <h1>{item.title}</h1>
            <h4>{item.artist}</h4>
          </div>
          <div className="view-container">
            <img className="view" src={View} alt="" />
            <h4>{item.views}</h4>
          </div>
        </div>
      </Card>
    ));
  }

  pageFlip = (key, uid) => {
    console.log('key, uid', key, uid);
    this.props.addView(key, uid);
    console.log(this.props);
    this.props.history.push(`/${uid}/${key}`);
  };

  handleLike = (key, uid) => {
    const auth = this.props.auth.uid;
    this.props.addLike(key, uid, auth);
  };

  render() {
    return (
      <Container>
        {this.state.photos.map((item, i) => (
          <Card
            id={item.id}
            key={item.id}
            post={item}
            style={{ backgroundColor: 'rgb(28, 49, 68)' }}
          >
            <img
              src={item.url}
              alt=""
              onClick={() => this.pageFlip(item.id, item.uid)}
            />
            <div className="banner">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '5px 5px 0 5px',
                }}
              >
                <div className="title">
                  <h1>{item.title}</h1>
                  <h4>{item.artist}</h4>
                </div>
                <Imgcont>
                  <div
                    className="like-container"
                    onClick={() => this.handleLike(item.id, item.uid)}
                  >
                    <img className="like" src={Like} alt="" />
                    <h4>{item.likes}</h4>
                  </div>
                  <div className="view-container">
                    <img className="view" src={View} alt="" />
                    <h4>{item.views}</h4>
                  </div>
                </Imgcont>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  display: 'flex',
                  bottom: '0',
                }}
              >
                {item.palette.map(color => 
                <div style={{
                  backgroundColor: `${color}`,
                  width: '20%',
                  height: '6px'
                }}>
                </div>
                )}
              </div>
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

const mapDispatchToProps = dispatch => {
  return {
    addView: (key, uid) => dispatch(addView(key, uid)),
    addLike: (key, uid, auth) => dispatch(addLike(key, uid, auth)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(All);
