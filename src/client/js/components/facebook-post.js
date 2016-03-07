import React, { Component } from 'react';
import { Paper, CardText } from 'material-ui';

export default class FacebookPost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let story = ""
    if (this.props.story) {
      story = (<CardText> {this.props.story} </CardText>);
    }
    return (
      <Paper style={{margin:'10px'}}>
        { story }
        <CardText> {this.props.message} </CardText>
      </Paper>
    )
  }
}
