import React from 'react';
import firebase, { storage } from '../../firebase';
import styled from 'styled-components';

class ProfileWorks extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            works: []
        }
    }

    componentDidMount(){
       let itemsRef = firebase.database().ref(`photos/${this.props.user.uid}`);
        itemsRef.on('value', data => {
            console.log('test', this.props)
            this.setState({ 
              works: data.val()
            })
        })
    }
    
    render(){
        return (
            <div>
                {this.state.works ? (
                    <Container>
                        {Object.values(this.state.works).map((post, i) => (
                            <Card key={i}>
                                <img src={post.art} alt=""/>
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
  width: 350px;
  height: 350px;
  overflow: hidden;
  background: no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3% 3%;
  border-radius: 6px;
  img{
      position: relative;
      width: 500px;
      height: auto;
      background: no-repeat center;
      background-size: cover;
  }
`;

const Container = styled.div`
  display: flex;
`;

export default ProfileWorks;