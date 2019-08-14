import React from 'react';
import firebase from '../../firebase';
import { connect } from 'react-redux';
import View from '../../images/view.png';
import Like from '../../images/heart.png';
import { Container, Card, Imgcont } from './ProfileWorksStyle.js';

class ProfileWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
    };
  }

  componentDidMount() {
    let itemsRef = firebase.database().ref(`photos/${this.props.auth.uid}`);
    itemsRef.on('value', data => {
      let works = [];
      data.forEach(child => {
        works.push({
          key: child.key,
          ...child.val(),
        });
      });
      console.log('works', works);
      this.setState({
        works: works,
      });
    });
  }

  pageFlip = (key, uid) => {
    this.props.history.push(`/${uid}/${key}`);
  };

  render() {
    return (
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {this.state.works ? (
          <Container>
            {Object.values(this.state.works).map(post => (
              <Card
                id={post.key}
                key={post.key}
                post={post}
                onClick={() => this.pageFlip(post.key, post.uid)}
                style={{ backgroundColor: 'rgb(28, 49, 68)' }}
              >
                <img src={post.url} alt="" />
                <div className="banner">
                  <div className="title">
                    <h1>{post.title}</h1>
                    <h4>{post.artist}</h4>
                  </div>
                  <Imgcont>
                    <div className="like-container">
                      <img className="like" src={Like} alt="" />
                      <h4>{post.likes}</h4>
                    </div>
                    <div className="view-container">
                      <img className="view" src={View} alt="" />
                      <h4>{post.views}</h4>
                    </div>
                  </Imgcont>
                </div>
              </Card>
            ))}
          </Container>
        ) : (
          <div>
            <h1>No Postings</h1>
          </div>
        )}
      </div>
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

export default connect(mapStateToProps)(ProfileWorks);
