//login-page.js
import React, { Component } from 'react';

export default class LoginPage extends Component{
    constructor(props){
        super(props);

        this.state ={
            message: ""
        };
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

    onStatusChange(response) {
      console.log( response );
      var self = this;

      if( response.status === "connected" ) {
         FB.api('/me', function(response) {
            var message = "Welcome " + response.name;
            self.setState({
               message: message
            });
        });
      }
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
                <button className="facebookLogin" onClick={this.click}>Login with Facebook!</button>
            </div>
        )
    }
}
