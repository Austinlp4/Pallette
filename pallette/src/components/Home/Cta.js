import React from 'react';
import styled from 'styled-components';
import Pallette from '../pallette/Pallette';

class Cta extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <Wrapper>
                <h1 className='cta'>New Palette Every Week!</h1>
                <Pallette />
                <h2 className='instruct'>Just submit a piece of your artwork that follows the five color palette at the top of the homepage every week.
                </h2>
            </Wrapper>
        )
    }
}


const Wrapper = styled.div`
    height: 1000px;
    display: flex;
    flex-direction: column;
    .cta{
        font-family: 'Lobster', cursive;
        font-size: 4rem;
        color: rgb(45,54,98); 
        text-align: center;
    }
    .instruct{
        width: 60%;
        align-self: center;
        text-align: center;
        font-family: 'Lobster', cursive;
        color: rgb(45,54,98); 
        font-size: 2.3rem;
    }
`;


export default Cta;