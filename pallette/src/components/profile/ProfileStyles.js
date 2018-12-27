import styled from 'styled-components';

export const Upload = styled.div`
  border: 1px solid lightgrey;
  border-radius: 8px;
  height: 400px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  .fileup{
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
    z-index: -1;
  }
  .fileup + label {
    width: 150px;
    height: 35px;
    font-size: .9rem;
    font-weight: 700;
    color: rgb(45,54,98);
    background-color: rgb(255, 0, 236);
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 6px;
    }
    .go + label{
        color: rgb(247,247,247);
        background-color: rgb(22, 155, 35);
    }
    .fileup:focus + label,
    .fileup + label:hover {
        background-color: rgba(255, 0, 236, .5);
    }
    .go:focus + label,
    .go + label:hover{
        color: rgb(247,247,247);
        background-color: rgb(22, 155, 35);
      }
    .fileup + label {
        cursor: pointer; 
    }
    `;

export const ProContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 3%;
  flex-direction: column;
  .upload{
      justify-self: flex-start;
  }
`;

export const Info = styled.div`
  width: 100%;
  padding: 5%;
`;

export const InfoContainer = styled.div`
  display: flex;
`;

export const Card = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 9px 0px 0px white, 
    inset 0 -9px 0px 0px white, 
    inset 10px 0 15px -4px rgba(31, 73, 125, 0.2),
    inset -10px 0 15px -4px rgba(31, 73, 125, 0.2);
  .fileup{
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
    z-index: -1;
  }
  .fileup + label {
    width: 150px;
    height: 35px;
    font-size: .9rem;
    font-weight: 700;
    color: rgb(45,54,98);
    background-color: rgb(255, 0, 236);
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 6px;
    z-index: 3;
    }

    .fileup:focus + label,
    .fileup + label:hover {
        background-color: rgb(255, 70, 236);
        color: white;
    }
    .fileup + label {
        cursor: pointer; 
    }
    button{
        position: absolute;
        margin-left: 100px;
        width: 100px;
        height: 35px;
        border: none;
        border-radius: 6px;
        background-color: rgb(45,54,98);
        color: rgb(255, 0, 236);
        &:hover{
            background-color: rgba(45,54,98, .5);
            color: white;
        }
    }
`;