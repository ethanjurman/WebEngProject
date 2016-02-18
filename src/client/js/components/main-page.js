// main-page.js
import React, { Component } from 'react';

export class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:""
    }
  }

  componentDidMount() {
    this.setState({text:"Hello World"})
    // gets called once (when the component is loaded properly)
  }

  render() {
    // gets called every time state is updated
    return (
      <div>
        {this.state.text}
        <a href="/list.html"> link </a>
      </div>
    )
  }
}
