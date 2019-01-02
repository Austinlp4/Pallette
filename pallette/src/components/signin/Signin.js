import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase, { auth } from '../../firebase';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect, NavLink } from 'react-router-dom';


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
   const { email, password } = this.state;
   const creds = {email,password};
    this.props.signIn(creds)
    this.props.history.push('/')

 };
 render() {
   const { authError } = this.props;
   const { email, password, error } = this.state;
   if(this.props.auth.uid) return <Redirect to='/' />
   return (
     <SigninContainer>
       <div>
         <div>
           <h3>Log In</h3>
           <NavLink to='/signup' className='reroute'>
              New? Sign Up Here!
           </NavLink>
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
             <Button children="Log In" />
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
  height: 500px;
  width: 400px;
  border: 1px solid rgb(255, 0, 198);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10% 0;
  border-radius: 8px;
  background-color: rgb(45,54,98);
  .reroute{
    color: white;
    &:hover{
      color: rgb(255, 0, 198);
    }
  }
  h3{
    font-family: 'Lobster', cursive;
    font-size: 3rem;
    color: rgb(255, 0, 198);
  }
  form{
    display: flex;
    flex-direction: column;
    input{
      padding-left: 3%;
      margin: 5% 0;
      height: 40px;
      width: 250px;
      border: none;
      border-radius: 6px;
      &:focus{
        outline: none;
        border: 1px solid rgb(255, 0, 198) !important;

      }
    }
    input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active  {
          -webkit-box-shadow: 0 0 0 30px white inset;
      }
  }
`;

const Button = styled.button`
  height: 40px;
  width: 250px;
  border: none;
  border-radius: 6px;
  background-color: rgb(255, 0, 198);
  color:  rgb(45,54,98);
  &:hover{
    background-color: rgb(255,126,70);
  }
`;

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))