// login-button.js
import React, {Component} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

export class LoginButton extends Component{

    constructor(props){
        super(props);
    }

   onLogout(response){
       this.setState({
           message: ""
       })
   };

   click() {
       this.props.onLogIn();

   }

    render() {
        return (
            <div>
                <RaisedButton label="Login with Facebook!" onTouchTap={this.click.bind(this)} />
            </div>
        )
    }

}

export default LoginButton;
