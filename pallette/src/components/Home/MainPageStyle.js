import styled from 'styled-components';

export const Ctabutton = styled.div`
  width: 200px;
  height: 50px;
  background-color: rgb(255,218,99);
  color: rgb(28, 49, 68);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 6px;
`;

export const Cta = styled.div`
  display: flex;
  margin-top: 200px;
  flex-direction: column;
  margin-left: 15%;
  max-width: 700px;
  h2{
    font-size: 2rem;
    font-weight: lighter;
  }
  .main{
    font-size: 3rem;
    font-weight: lighter;
    margin-bottom: 20px;
  }
`;


export const SideNav = styled.div`
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
    border-bottom: 0.1px solid rgb(210, 190, 85);
    img {
      width: 50px;
      height: auto;
    }
    &:hover {
      background-color: rgb(255, 225, 110);
    }
  }
  .last-box {
    border-bottom: none;
    img {
      width: 45px;
    }
  }
`;

export const Header = styled.div`
  display: flex;

  padding-right: 0;
`;

export const Select = styled.div`
  position: fixed;
  width: 200px;
  background-color: rgba(28, 49, 68, 0.85);
  color: rgb(255, 218, 99);
  height: 35px;
  cursor: pointer;
  .choice {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5% 5% 0 5%;
    img {
      width: 15px;
      height: 15px;
      justify-self: flex-end;
    }
  }
  .menu {
    background-color: rgb(28, 49, 68);
    text-align: center;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
  h1 {
    text-align: center;
    color: white;
    font-weight: 300;
    font-family: 'Lobster', cursive;
  }
`;