import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import styled from 'styled-components';

class Login extends Component {
 state = {
   email: '',
   password: '',
   error: null,
 };
handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };
handleSubmit = (event) => {
   event.preventDefault();
   const { email, password } = this.state;
firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then((user) => {
       console.log(user);
      if (user) {
        this.props.setUser(
          user.user.uid,
          user.user.email, 
          user.user.firstName, 
          user.user.lastName,  
          user.user.street, 
          user.user.city, 
          user.user.state, 
          user.user.zipCode, 
        );}
       this.props.history.push('/');
     })
     .catch((error) => {
       this.setState({ error: error });
     });
 };
 render() {
   const { email, password, error } = this.state;
   return (
     <SigninContainer>
       <div>
         <div>
           <h3>Log In</h3>
         </div>
       </div>
       {error ? (
         <div>
           <div>
             <p>{error.message}</p>
           </div>
         </div>
       ) : null}
       <div>
         <div>
           <form onSubmit={this.handleSubmit}>
             <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />
             <input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={this.handleInputChange}
             />
             <button children="Log In" />
           </form>
         </div>
       </div>
     </SigninContainer>
   );
 }
}

const SigninContainer = styled.div`
  height: 400px;
  width: 400px;
  border: 1px solid lightgray;
`;

export default withRouter(Login)