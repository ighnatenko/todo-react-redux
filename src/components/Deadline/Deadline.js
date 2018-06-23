import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

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

  submitHandler = () => {
    this.props.dateChanged(this.state.startDate);
  }

  closeHandler = () => {
    this.props.closed();
  }

  render () {
    return (
      <div>
        <div>Deadline</div>
        <div onClick={this.closeHandler}>Close</div>
        <DatePicker
          fixedHeight
          dateFormat='DD/MM/YYYY'
          selected={this.state.startDate}
          onChange={this.handleChange} />
        <div>date</div>
        <div>time</div>
        <div onClick={this.submitHandler}>Save</div>
        <div onClick={this.closeHandler}>Cancel</div>
      </div>
    )
  }
}

export default Deadline;