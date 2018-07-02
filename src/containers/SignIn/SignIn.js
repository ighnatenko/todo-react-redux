import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Link } from 'react-router-dom';
import './SignIn.css';

class SignIn extends Component {
  state = {
    email: 'qq@q.ua',
    password: 'qqqqqqqq'
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.signIn(this.state.email, this.state.password);
  }

  inputChangedHandler = (event, inputType) => {
    switch(inputType) {
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      default: break;
    }
  }

  render() {
    let errorMessage = null;
    if (this.props.error !== null) {
      errorMessage = <p className='sign_in_warning'>{this.props.error}</p>;
    }

    let spinner = null; 
    if (this.props.loading) {
      spinner = <p>Loading...</p>;
    }

    return(
      <div className='sign_in'>
        {spinner}
        <div className='sign_in_title'>Sign In</div>
        <form onSubmit={this.submitHandler} className='sign_in_form'>
          {errorMessage}

          <div className="form-group">
            <input type="email" className="form-control" placeholder="Enter email"
            value={this.state.email} onChange={(event) => this.inputChangedHandler(event, 'email')} />
          </div>

          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" 
            value={this.state.password} onChange={(event) => this.inputChangedHandler(event, 'password')} />
          </div>
          
          <button type="button" className="btn btn-info sign_in_btn" onClick={this.submitHandler}>Sign In</button>
        </form>

         <Link className='sign_up_link' to='/sign_up'>Sign Up</Link>
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
    signIn: (email, password) => dispatch(actions.signIn(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);