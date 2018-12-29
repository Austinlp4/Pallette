import React from 'react';
import firebase, { storage } from '../../firebase';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";

class ProfileWorks extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            works: []
        }
    }

    componentDidMount(){
       let itemsRef = firebase.database().ref(`photos/${this.props.auth.uid}`);
        itemsRef.on('value', data => {
            let works = [];
            data.forEach((child) => {
                console.log(child.val())
                works.push({
                    key: child.key,
                    ...child.val()
                })
            })
            this.setState({ 
              works: works
            })
        })
    }

    pageFlip = (id) => {
        console.log(id)
    }
    
    render(){
        return (
            <div>
                {this.state.works ? (
                    <Container>
                        {Object.values(this.state.works).map((post) => (
                            <Card id={post.key} post={post}>
                            <NavLink to={`${this.props.match.path}/${post.key}`}>
                                <img src={post.post.url} alt=""/>
                                <div className='banner'>
                                    <h1>{post.post.title}</h1>
                                    <h4>{post.post.artist}</h4>
                                </div>
                            </NavLink>
                            </Card>
                        ))}
                    </Container>
                    ) : (
                    <div>
                        <h1>No Postings</h1>
                    </div>
                    )}
            </div>
        )
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
  img{
      position: relative;
      width: 500px;
      height: auto;
      background: no-repeat center;
      background-size: cover;
  }
  .banner{
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
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 3%;
      h1{
          font-size: 1.2rem;
          color: rgb(45,54,98);
          margin: 0;
      }
      h4{
          font-size: .9rem;
          color: rgb(45,54,98);
          margin: 0;
      }
      a{
          display: none;
      }
  }
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(ProfileWorks);

