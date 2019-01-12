import React from 'react';
import styled from 'styled-components';
import Pallette from '../pallette/Pallette';
import Featured from '../featured/Featured';
import All from '../featured/All';
import MostLiked from '../featured/MostLiked';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Route, withRouter, NavLink } from 'react-router-dom';
import Arrow from '../../images/down-arrow.png';


class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            choice: 'All',
            showMenu: false
        };
    }

    componentDidMount() {
        
    }

    select = (e) => {
        
    }



    render(){
        if(!this.props.auth.uid) return <Redirect to='/cta'/>
        return (
            <Container>
                <Header>
                    <Select >
                        <div className='choice'>
                            {this.state.choice}
                            <img src={Arrow} alt=""/>
                        </div>
                        {
                            this.state.showMenu
                                ? (
                                <div className="menu">
                                    <button> Menu item 1 </button>
                                    <button> Menu item 2 </button>
                                    <button> Menu item 3 </button>
                                </div>
                                )
                                : (
                                null
                                )
                        }
                    </Select>
                    <Pallette />
                </Header>
              
              {/* <h1>Most Popular</h1> */}
              
              
            </Container>
        )
    }
}

const Header = styled.div`
  display: flex;

  
  
`;

const Select = styled.div`
    width: 200px;
    background-color: rgba(28,49,68,0.85);
    color: rgb(255, 218, 99);
    height: 35px;
    .choice{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5% 5%;
        img{
            width: 15px;
            height: 15px;
        }
    }
`;

const Container =styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
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