import React from 'react';
import firebase, { storage } from '../../firebase';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import View from '../../images/view.png';


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
        console.log(child.val());
        works.push({
          key: child.key,
          ...child.val(),
        });
      });
      this.setState({
        works: works,
      });
    });
  }

  pageFlip = key => {
    this.props.history.push(`${this.props.match.path}/${key}`);
    
  };

  render() {
    return (
      <div>
        {this.state.works ? (
          <Container>
            {Object.values(this.state.works).map(post => (
              <Card
                id={post.key}
                key={post.key}
                post={post}
                onClick={() => this.pageFlip(post.key)}
              >
                {/* <NavLink to={`${this.props.match.path}/${post.key}`}> */}
                <img src={post.url} alt="" />
                <div className="banner">
                  <div className="title">
                    <h1>{post.title}</h1>
                    <h4>{post.artist}</h4>
                  </div>
                  <div className='view-container'>
                    <img className="view" src={View} alt="" />
                    <h4>{post.views}</h4>
                  </div>
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

const Card = styled.div`
  width: 325px;
  height: 325px;
  overflow: hidden;
  background: no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3% 3%;
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
      width: 150px;
    }
    
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addView: (key, uid) => dispatch(addView(key, uid)),
        
//     }
// }

export default connect(mapStateToProps)(ProfileWorks);
