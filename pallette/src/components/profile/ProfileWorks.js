import React from 'react';
import firebase, { storage } from '../../firebase';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import View from '../../images/view.png';
import Like from '../../images/heart.png';
import ColorThief from '../../ColorThief';


class ProfileWorks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [],
    };
    this.colorThief = new ColorThief();
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
      console.log('works', works)
      this.setState({
        works: works,
      });
    });
  }

  pageFlip = (key, uid)=> {
    this.props.history.push(`/${uid}/${key}`);
    
  };

  render() {
    return (
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'center'}}>
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
                {/* <NavLink to={`${this.props.match.path}/${post.key}`}> */}
                <img src={post.url} alt="" />
                <div className="banner">
                  <div className="title">
                    <h1>{post.title}</h1>
                    <h4>{post.artist}</h4>
                  </div>
                  <Imgcont>
                  <div className='like-container'>
                    <img className="like" src={Like} alt="" />
                    <h4>{post.likes}</h4>
                  </div>
                  <div className='view-container'>
                    <img className="view" src={View} alt="" />
                    <h4>{post.views}</h4>
                  </div>
                  </Imgcont>
                </div>
                {/* </NavLink> */}
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

const Imgcont = styled.div`
    display: flex;
    width: 110px;
    justify-content: space-between;
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
    height: 80px;
    width: 100%;
    bottom: 0;
    border: 1px solid rgb(28, 49, 68);
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

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
`;

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(ProfileWorks);
