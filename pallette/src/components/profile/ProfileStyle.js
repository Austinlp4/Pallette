import styled from 'styled-components';

export const UploadCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    border-radius: 6px;
    height: 90%;
    width: 90%;
    margin: 20px auto;
    flex-direction: column;
    color: white;
    h1{
        font-size: 4rem;
        font-weight: 300;
        margin-top: 10px;
    }
`;

export const SettingsInput = styled.input`
    height: 40px; 
    width: 300px;
    border: .5px solid rgb(45, 54, 98);
    padding-left: 5px;
    border-radius: 6px;
`;

export const ProfilePicCont = styled.div`
   
`;

export const ProfilePic = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background-image: ${props => (props.image ? `url(${props.image})` : 'null')};
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    position: absolute;
    bottom: -40%;
    left: 35%;
    border: 7px solid rgb(28,49,68);
    box-shadow: 0 4px 2px -2px black;
`;

export const Edit = styled.div`
    position: absolute;
    bottom: 0;
    color: rgb(255, 218, 99);
    font-weight: 300;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.6);
    height: 150px;
    width: 287px;
    left: 0;
    border-bottom-right-radius: 150px;
    border-bottom-left-radius: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
`;

export const Modal = styled.div`
    height: 700px;
    width: 700px;
    display: flex;
    border-radius: 6px;
    background-color: rgb(78, 107, 140);
    flex-direction: column;
`;

export const ModalContainer = styled.div`
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


export const Settings = styled.button`
    border: none;
    border-radius: 6px;
    box-shadow: 0 4px 2px -2px rgba(28, 49, 68, 0.6);
    background-color: rgb(255,102,79);
    color: rgba(255, 218, 99, 0.9);
    height: 40px;
    width: 100px;
    justify-self: end;
    margin: 2% 2% 0 0;
    font-weight: 500;
    font-size: 1.1rem;
    &:hover{
        cursor: pointer;
        background-color: rgb(255,134,118);
    }
`;

export const Social = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 140px;
    height: 50px;
    .facebook{
        width: 40px;
        height: 40px;
        cursor: pointer;
        &:hover{
            background-color: rgba(255,255,255, 0.5);
            border-radius: 6px;
        }
    }
    .instagram{
        width: 30px;
        height: 30px;
        cursor: pointer;
        &:hover{
            background-color: rgba(255,255,255, 0.5);
            border-radius: 6px;
        }
    }
    .twitter{
        width: 35px;
        height: 35px;
        cursor: pointer;
        &:hover{
            background-color: rgba(255,255,255, 0.5);
            border-radius: 6px;
        }
    }
`;

export const General = styled.div`
    display: flex;
    flex-direction: column;
    h1{
        color: rgb(255,218,99);
        font-size: 2rem;
        font-weight: 300;
    }
    .bio{
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        height: 250px;
        width: 300px;
        p{
            color: rgb(255,218,99);
        }
    }
`;

export const Information = styled.div`
    display: flex;
    padding: 2%;
    background-color: rgb(28, 49, 68);
    height: 300px;
    justify-content: space-between;
    
`;

export const Header = styled.div`
    background-color: rgb(78, 107, 140);
    display: flex;
    position: relative;
    justify-content: flex-end;
    height: 300px;
    img{
        position: absolute;
        bottom: -40%;
        margin: 0 auto;
        left: 35%;
        width: 300px;
        height: 300px;
    }
    
`;

export const Stats = styled.div`
    width: 100%;
    max-width: 200px;
    
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1020px;
`;