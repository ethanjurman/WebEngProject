// login-button.js
import React, {Component} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

export class LoginButton extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount() {

        window.fbAsynchInit = () => {
            FB.init({
                appId: '902633069835365',
                xfbml: true,
                version: 'v2.5',
            });
        };

        // Load the SDK asynchronously
        ((d, s, id) => {
            const element = d.getElementsByTagName(s)[0];
            const fjs = element;
            let js = element;
            if(d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=902633069835365";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebood-jssdk'));


    }

   checkLoginState(response) {
      if(response.authResponse) {

      }
      else {

      }
   };

   onLogout(response){
       this.setState({
           message: ""
       })
   }

   click() {
       FB.login(function(response){
           if(response.authResponse){

           }
       }, {scope: 'public_profile, email'});
   }

    render() {
        return (
            <div>
                <RaisedButton label="Login with Facebook!" onTouchTap={this.click} />
            </div>
        )
    }

}

export default LoginButton;
