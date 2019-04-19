import styled from 'styled-components';

export const Settings = styled.button`
    border: none;
    border-bottom-right-radius: 6px;
    border-top-right-radius: 6px;
    box-shadow: 0 4px 2px -2px rgba(28, 49, 68, 0.6);
    background-color: rgb(255,102,79);
    color: rgba(255, 218, 99, 0.9);
    height: 75px;
    width: 75px;
    justify-self: end;
    font-weight: 500;
    font-size: 1.1rem;
    &:hover{
        cursor: pointer;
        background-color: rgb(255,134,118);
    }
`;

export const CommentBox = styled.div`
    height: 400px;
    width: 375px;
    overflow: hidden;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 0.5em;
        height: 0.5em;
        background-color: black;
        border-radius: 6px;
       }
       ::-webkit-scrollbar-thumb {
        background-color: lightblue;
        border-radius: 6px;
     
        &:hover {
         background: rgba(255,255,255,.2);
        }
       }
`;


export const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 800px;
`;

export const Modal = styled.div`
    height: 700px;
    display: flex;
    overflow: hidden;
    .image-cont{
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.9)
    }
    border-radius: 6px;
`;

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background-color: rgb(28, 49, 68);
  color: rgb(255,218,99);
  h2{
      font-size: 2rem;
  }
`;