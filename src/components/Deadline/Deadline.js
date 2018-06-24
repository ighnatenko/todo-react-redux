import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './Deadline.css';

class Deadline extends Component {
  constructor (props) {
    super(props)

    let startDate = (this.props.date == null) ? moment() : moment(this.props.date.toString());

    this.state = { 
      startDate: startDate
    };
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.dateChanged(this.state.startDate);
  }

  closeHandler = (e) => {
    e.preventDefault();
    this.props.closed();
  }

  render () {
    return (
      <div>
        <div className='deadline_header'>Deadline</div>
        <DatePicker className='deadline_input'
          fixedHeight
          dateFormat='DD/MM/YYYY'
          selected={this.state.startDate}
          onChange={this.handleChange} />
        <div className='deadline_buttons'>
          <button type="button" className="btn btn-info" onClick={this.submitHandler}>Save</button>
          <button type="button" className="btn btn-default" onClick={this.closeHandler}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default Deadline;