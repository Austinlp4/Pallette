import React from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import styled from 'styled-components';

class SingleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: '',
    };
  }

  async componentDidMount() {
    let itemsRef = firebase
      .database()
      .ref(`photos/${this.props.auth.uid}/${this.props.match.params.uid}`);
    await itemsRef.on('value', data => {
      console.log('data.val', data.val());
      this.setState({
        post: {
          ...data.val(),
        },
      });
    });
  }

  render() {
    const post = this.state.post;

    return (
      <Container>
        <Image src={post.url} alt="" />
        <Info>
          <h2>{post.title}</h2>
          <h5>By: {post.artist}</h5>
        </Info>
      </Container>
    );
  }
}

const Image = styled.img`
  max-width: 600px;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 3%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  h2 {
    font-size: 2rem;
  }
`;

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(SingleCard);
