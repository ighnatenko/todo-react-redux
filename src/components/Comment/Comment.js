import React, { Component } from 'react';
import './Comment.css';

class Comment extends Component {
  render() {
    let imageUrl = null;
    if (this.props.image != null) {
      imageUrl = this.props.image;
    }
    return(
      <div className='comment_row'>
        <div className='comment_header'>
          <div className='comment_date'>{this.props.createdDate}</div>
          <span className='glyphicon glyphicon-trash comment_delete' onClick={this.props.deleted}></span>
        </div>
        <div className='comment_title'>{this.props.content}</div>
        <img src={imageUrl} alt='' className='comment_img' />
      </div>
    );
  }
}

export default Comment;