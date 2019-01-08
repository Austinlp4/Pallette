import React from 'react';
import styled from 'styled-components';
import Pallette from '../pallette/Pallette';
import Featured from '../featured/Featured';
import All from '../featured/All';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Route, withRouter, NavLink } from 'react-router-dom';
import All from '../featured/All';

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        
    }

    render(){
        if(!this.props.auth.uid) return <Redirect to='/cta'/>
        return (
            <Container>
              <Pallette/>
              {/* <h1>Most Popular</h1> */}
              <Featured {...this.props}/>
              <Route 
                  path='/all'
                  render={props => (
                    <All {...props}/>
                  )}
              />
            </Container>
        )
    }
}

const Container =styled.div`
   display: flex;
   flex-direction: column;
   padding-left: 2%;
   width: 90%;
   h1{
       text-align: center;
       color: white;
       font-weight: 300;
       font-family: 'Lobster', cursive;
   }
`;

// const Call = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 50px;
//   div{
//     margin: 0;
//     font-size: 1.1rem;
//     font-weight: 600;
//     color: rgba(45,54,98,1);
//     background-color: white;
//     max-width: 500px;
//     width: 100%;
//     height: 30px;
//     border-bottom-right-radius: 80px;
//     border-bottom-left-radius: 80px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
// `;

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        palette: state.palette
    }
}


export default withRouter(connect(mapStateToProps)(MainPage));