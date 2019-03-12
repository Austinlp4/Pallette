import React from 'react';
import styled from 'styled-components';
import Pallette from '../pallette/Pallette';
import Featured from '../featured/Featured';
import All from '../featured/All';
import MostLiked from '../featured/MostLiked';
import MostViewed from '../featured/MostViewed';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Route, withRouter, NavLink } from 'react-router-dom';
import Arrow from '../../images/down-arrow.png';
import SearchIcon from '../../images/searchicon.png';
import FilterIcon from '../../images/filtericon.png';
import Question from '../../images/questionsicon.png';
import firebase from '../../firebase';


class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            choice: 'All',
            showMenu: false,
        };
    }

    showMenu = event => {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
          });
      
    }

    closeMenu = event => {
        if (!this.dropdownMenu.contains(event.target)) {
      
            this.setState({ showMenu: false }, () => {
              document.removeEventListener('click', this.closeMenu);
            });  
            
          }
    }

    render(){
        if(!this.props.auth.uid) return <Redirect to='/signup'/>
        let colorOne = this.props.palette.palette[0];
        let colorTwo = this.props.palette.palette[1];
        let colorThree = this.props.palette.palette[2];
        let colorFour = this.props.palette.palette[3];
        let colorFive = this.props.palette.palette[4];
        return (
            <Container>
                <Header>
                    <SideNav>
                        <div className="box" style={{ borderRight: `5px solid ${colorOne}` }} >
                            <img src={SearchIcon} alt=""/>
                        </div>
                        <div className="box" style={{ borderRight: `5px solid ${colorTwo}` }}><img src={FilterIcon} alt=""/>
                        </div>
                        <div className="box" style={{ borderRight: `5px solid ${colorThree}` }}>
                        </div>
                        <div className="box" style={{ borderRight: `5px solid ${colorFour}` }}></div>
                        <div className="box last-box" style={{ borderRight: `5px solid ${colorFive}` }}><img src={Question} alt=""/></div>
                    </SideNav>
                    <Pallette />
                </Header>

              <div>
                        { (this.state.choice === 'All')
                         ?
                        <All {...this.props} photos={this.state.photos}/>
                        :
                        (this.state.choice === 'Most Popular')
                        ?
                        <MostLiked {...this.props} />
                        :
                        (this.state.choice === 'Most Viewed')
                        ?
                        <MostViewed {...this.props}/>
                        :
                        <All {...this.props} photos={this.state.photos}/>
                        }
                    </div>
              
            </Container>
        )
    }
}

const SideNav = styled.div`
    height: 500px;
    width: 100px;
    background-color: rgb(255, 218, 99);
    position: fixed;
    left: 0;
    top: 20%;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        width: 100%;
        border-bottom: .1px solid rgb(210, 190, 85);
        img{
            width: 50px;
            height: auto;
        }
        &:hover{
            background-color: rgb(255, 225, 110);
        }
    }
    .last-box{ 
        border-bottom: none;
        img{
            width: 45px;
        }
     }
     
`;

const Header = styled.div`
  display: flex;

  padding-right: 0;
  
`;

const Select = styled.div`
    position: fixed;
    width: 200px;
    background-color: rgba(28,49,68,0.85);
    color: rgb(255, 218, 99);
    height: 35px;
    cursor: pointer;
    .choice{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5% 5% 0 5%;
        img{
            width: 15px;
            height: 15px;
            justify-self: flex-end;
        }
    }
    .menu{
        background-color: rgb(28,49,68);
        text-align: center;
    }
   
`;

const Container =styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   margin-top: 60px;
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