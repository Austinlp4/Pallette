import React from 'react';
import styled from 'styled-components';
import Slider from './Carousel';
import MostViewed from './MostViewed';
import All from './All';


class Featured extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        
    }

    render(){
        
        return (
            <div>
              {/* <Slider {...this.props}/>
              <Bar></Bar>
              <Call>Most Viewed</Call>
              <MostViewed {...this.props}/>
              <Bar></Bar> */}
              {/* <Call>All</Call> */}
              <All {...this.props}/>
            </div>
        )
    }
}


const Call = styled.h1`
    text-align: center;
    color: white;
    font-weight: 300;
    font-family: 'Lobster', cursive;
`;

const Bar = styled.div`
    margin: 0 auto;
    background: 
    linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
    linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
    linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
    height: 4px;
    width: 70%;
    border-radius: 6px;
`;

export default Featured;