import React from 'react';
import firebase from 'firebase';


class Register extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    jobTitle: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  submitHandler = e => {
    const user = firebase.auth().currentUser;
    e.preventDefault();
    if (user) {
      this.props.newUser(
        user.uid,
        user.email, 
        this.state.firstName, 
        this.state.lastName,  
        this.state.street, 
        this.state.city, 
        this.state.state, 
        this.state.zipCode, 
      );
      this.setState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
      });
      this.props.history.push('/');
    } else {
      console.log('No user to push');
    }
  }

  render() {
    console.log(firebase.auth().currentUser);
    return (
      <div>
        <div>
          <h2>Register</h2>
          
          <form onSubmit={this.submitHandler}>
            <h4>Personal Information</h4>
            <div>
            <div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.changeHandler}
                required
              />
              <label htmlFor="firstName">
                First
              </label>
            </div>

            <div>   
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.changeHandler}
                required
              />
              <label htmlFor="lastName">
                Last
              </label>
            </div>
            </div>
            <h4>Location</h4>
            <div>
            <div>
              <input
                id="street"
                name="street"
                type="text"
                value={this.state.street}
                onChange={this.changeHandler}
                required
              />
              <label htmlFor="street">
                Street
              </label>
            </div>
            
            <div>
              <input
                id="city"
                name="city"
                type="text"
                value={this.state.city}
                onChange={this.changeHandler}
                required
              />
              <label htmlFor="city">
                City
              </label>
            </div>
            
            <div>
              <input
                id="state"
                name="state"
                type="text"
                value={this.state.state}
                onChange={this.changeHandler}
                required
              />
              <label htmlFor="state">
                State
              </label>
            </div>
            
            <div>
              <input
                id="zipCode" 
                name="zipCode"
                type="text"
                value={this.state.zipCode}
                onChange={this.changeHandler}
                required
              />
              <label htmlFor="zipCode">
                Zip Code
              </label>
            </div>

            </div>
            
            <button>Sign Up</button>            
          </form>          
        </div>
      </div>
    );
  }
}

export default Register;