import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase, { auth } from '../../firebase';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';

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
   const creds = {email,password};
    this.props.signIn(creds)
    this.props.history.push('/')

// firebase
//      .auth()
//      .signInWithEmailAndPassword(email, password)
//      .then((user) => {
//        console.log(user);
//       if (user) {
//         this.props.setUser(
//           user.user.uid,
//           user.user.email, 
//         );}
//        this.props.history.push('/');
//      })
//      .catch((error) => {
//        this.setState({ error: error });
//      });
 };
 render() {
   const { authError } = this.props;
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
             <div>
                {authError ? <p>{authError}</p> : null}
             </div>
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

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))