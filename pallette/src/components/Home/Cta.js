// import React from 'react';
// import styled from 'styled-components';
// import Pallette from '../pallette/Pallette';
// import Gold from '../../images/goldribbon.png';
// import Silver from '../../images/silverribbon.png';
// import Bronze from '../../images/bronzeribbon.png';

// class Cta extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {

//         }
//     }

//     redirect = () => {
//         this.props.history.push('/signup');
//     }

//     render(){
//         return (
//             <Wrapper>
//                 <h1 className='cta'>New Palette Every Week!</h1>
//                 <Pallette />
//                 <h2 className='instruct'>Just submit a piece of your artwork that follows the five color palette at the top of the homepage every week.
//                 </h2>
//                 <Bar></Bar>
//                 <RibbonsWrapper>
//                     <h2 className='com'>The Community picks the winners for each week. Top 3 recieve a ribbon to be placed on their winning work</h2>
//                     <Ribbons>
//                         <img src={Gold} alt="" style={{ width: '200px' , height: '350px'}}/>
//                         <img src={Silver} alt="" style={{ width: '200px' , height: '350px'}}/>
//                         <img src={Bronze} alt="" style={{ width: '200px' , height: '350px'}}/>
//                     </Ribbons>
//                 </RibbonsWrapper>
//                 <Button onClick={this.redirect}>Sign Up Now!</Button>
//             </Wrapper>
//         )
//     }
// }

// const Button = styled.button`
//   height: 50px;
//   width: 350px;
//   border: none;
//   border-radius: 6px;
//   align-self: center;
//   background-color: rgb(45, 54, 98);
//   color: white;
//   font-size: 1.8rem;
//   font-family: 'Lobster', cursive;
//   margin-top: 50px;
//   &:hover{
//     background-color: rgba(45, 54, 98, 0.3);
//     color: rgb(45, 54, 98)
//   }
// `;

// const Bar = styled.div`
//   height: 5px;
//   width: 70%;
//   background-color: rgb(45,54,98);
//   align-self: center;
//   border-radius: 6px;
// `;

// const RibbonsWrapper = styled.div`
//   align-self: center;
//   width: 700px;
//   display: flex;
//   flex-direction: column;
//   .com{
//       width: 100%;
//       font-family: 'Lobster', cursive;
//       color: rgb(45,54,98); 
//       font-size: 2rem;
//   }
// `;

// const Ribbons = styled.div`
//   display: flex;
//   width: 700px;
//   justify-content: space-between;
// `;

// const Wrapper = styled.div`
//     height: 1000px;
//     display: flex;
//     flex-direction: column;
//     .cta{
//         font-family: 'Lobster', cursive;
//         font-size: 4rem;
//         color: rgb(45,54,98); 
//         text-align: center;
//     }
//     .instruct{
//         width: 60%;
//         align-self: center;
//         text-align: center;
//         font-family: 'Lobster', cursive;
//         color: rgb(45,54,98); 
//         font-size: 2.3rem;
//     }
// `;


// export default Cta;