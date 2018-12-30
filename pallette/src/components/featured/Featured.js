import React from 'react';
import styled from 'styled-components';
import Slider from './Carousel';


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
              <Slider />
            </div>
        )
    }
}


export default Featured;