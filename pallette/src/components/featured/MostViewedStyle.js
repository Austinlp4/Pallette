import styled from 'styled-components';

export const Imgcont = styled.div`
    display: flex;
    width: 110px;
    justify-content: space-between;
  `;

export const Wrapper = styled.div`
  .alice-carousel__prev-btn,
  .alice-carousel__next-btn {
    display: inline-block;
    width: 50%;
    padding: 15px 10px;
    box-sizing: border-box;
  
    [data-area] {
      &::after {
        content: attr(data-area);
        position: relative;
      }
    }

    .alice-carousel__prev-btn-wrapper {
      text-align: center;
    }

    .alice-carousel__next-btn-wrapper {
      text-align: center;
    }


    .alice-carousel__prev-btn-item,
   .alice-carousel__next-btn-item {
  display: inline-block;
  color: white;
  cursor: pointer;
  font-family: 'Lobster', cursive;
  font-size: 2rem;
  &:hover {
    color: pink;
  }
  &.__inactive {
    opacity: .4;
  }
}
  }
  `;

 export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1100px;
    margin: 100px auto;
    justify-content: center;
  `;

 export const Card = styled.div`
  width: 325px;
  height: 325px;
  overflow: hidden;
  background: no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1% 1%;
  border-radius: 6px;
  position: relative;
  img {
    position: relative;
    width: 500px;
    height: auto;
    background: no-repeat center;
    background-size: cover;
  }
  .banner {
    box-sizing: border-box;
    position: absolute;
    z-index: 3;
    background-color: rgb(28, 49, 68);
    height: 60px;
    width: 100%;
    bottom: 0;
    border: 1px solid rgb(28, 49, 68);
    border-top: none;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3%;
    left: 0;
    h1 {
      font-size: 1.2rem;
      color: rgb(255,218,99);
      margin: 0;
    }
    h4 {
      font-size: 0.9rem;
      color: rgb(255,218,99);
      margin: 0;
    }
    .view-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 40px;
        border-radius: 6px;
        background-color: rgb(21, 37, 51);
        h4{
            align-self: center;
        }
      }
    .view {
      width: 30px;
      height: 20px;
    }
    .like-container{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 40px;
        border-radius: 6px;
        background-color: rgb(21, 37, 51);
        h4{
            align-self: center;
        }
      }
    .like {
      width: 25px;
      height: 20px;
      margin-right: 4%;
    }
    .title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      width: 150px;
    }
    
  }
`;