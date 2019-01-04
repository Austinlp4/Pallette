import React from 'react';
import styled from 'styled-components';
import Pallette from '../pallette/Pallette';
import Featured from '../featured/Featured';
import All from '../featured/All';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        
    }

    render(){
        if(!this.props.auth.uid) return <Redirect to='/signin'/>
        return (

            <Container>
              <Pallette/>
              <Call>
              <div>This Week's Palette</div>
              </Call>
              <h1>Recently Added</h1>
              <Featured {...this.props}/>
            </Container>
        )
    }
}

const Container =styled.div`
   display: flex;
   flex-direction: column;
   padding-left: 2%;
   width: 90%;
   background-color: rgba(45,54,98,1);
   h1{
       text-align: center;
       color: white;
       font-weight: 300;
       font-family: 'Lobster', cursive;
   }
`;

const Call = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  div{
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(45,54,98,1);
    background-color: white;
    max-width: 500px;
    width: 100%;
    height: 30px;
    border-bottom-right-radius: 80px;
    border-bottom-left-radius: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        palette: state.palette
    }
}


export default connect(mapStateToProps)(MainPage);