import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import './SignUp.css';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirm_password: ''
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.signUp(this.state.email, this.state.password);
  }

  inputChangedHandler = (event, inputType) => {
    switch(inputType) {
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      case 'confirm_password':
        this.setState({ confirm_password: event.target.value });
        break;  
      default:
        break;
    }
  }

  render() {
    let errorMessage = null;
    if (this.props.error !== null) {
      errorMessage = <p>{this.props.error}</p>;
    }

    let spinner = null; 
    if (this.props.loading) {
      spinner = <p>Loading...</p>;
    }

    return (
      <div className='sign_up'>
        {spinner}
        <div className='sign_up_title'>Sign Up</div>
        <form onSubmit={this.submitHandler} className='sign_up_form'>
          {errorMessage}

          <div class="form-group">
            <input type="email" class="form-control" placeholder="Enter email"
            value={this.state.email} onChange={(event) => this.inputChangedHandler(event, 'email')} />
          </div>

          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" 
            value={this.state.password} onChange={(event) => this.inputChangedHandler(event, 'password')} />
          </div>

          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" 
            value={this.state.confirm_password} onChange={(event) => this.inputChangedHandler(event, 'confirm_password')} />
          </div>
          
          <button type="button" className="btn btn-info sign_up_btn" onClick={this.submitHandler}>Sign Up</button>
        </form>

        <div className='already_member'>Already a member ? <Link to='/sign_in'>SignIn</Link></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: (email, password) => dispatch(actions.signUp(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);