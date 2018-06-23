import React, { Component } from 'react';

class Comment extends Component {
  render() {
    let imageUrl = null;
    if (this.props.image != null) {
      imageUrl = this.props.image;
    }
    return(
      <div className=''>
        <div>{this.props.content}</div>
        <div>{this.props.createdDate}</div>
        <img src={imageUrl} alt='' />
        <div onClick={this.props.deleted}>Delete</div>
      </div>
    );
  }
}

export default Comment;