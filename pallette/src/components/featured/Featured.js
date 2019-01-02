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
              <Slider {...this.props}/>
              <Call>Most Viewed</Call>
              <MostViewed {...this.props}/>
              <Call>All</Call>
              <All {...this.props}/>
            </div>
        )
    }
}


const Call = styled.h1`
    text-align: center;
    color: white;
    font-weight: 300;
`;

export default Featured;