// main-page.js
import React, { Component } from 'react';

export class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text:"",
      array:[0,1,2,3,4,5]
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
        <ul>
          {this.state.array((element)=>{
            return <li key={element}>{element}</li>
          })}
        </ul>
      </div>
    )
  }
}
