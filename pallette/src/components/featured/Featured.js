import React from 'react';
import styled from 'styled-components';
import Carousel from './Carousel';


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
              <Carousel />
            </div>
        )
    }
}


export default Featured;