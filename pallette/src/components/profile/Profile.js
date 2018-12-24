import React from 'react';
import styled from 'styled-components';


class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }

    render(){
        const user = this.props.user;
        console.log(this.props.user)
        return (
              <ProContainer>
                  <Upload className='upload'>
                      <div className='upicon'>
                          Upload
                      </div>
                  </Upload>
                  <Info>
                    <h1>{user.firstName} {user.lastName}</h1>
                  </Info>
              </ProContainer>
        )
    }
}

const Upload = styled.div`
  border: 1px solid lightgrey;
  border-radius: 8px;
  height: 400px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 3%;
  .upload{
      justify-self: flex-start;
  }
`;

const Info = styled.div`
  width: 100%;
  padding: 5%;
`;

export default Profile;