import React from 'react';
import styled from 'styled-components';


class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user
        };
    }

    componentDidMount() {
        
    }

    render(){
        const user = this.state.user;
        return (
            <div>
              <div>
                  <img src="" alt=""/>
                  <h1>{user.firstName}</h1>
              </div>
            </div>
        )
    }
}




export default Profile;