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

   onLogout(response){
       this.setState({
           message: ""
       })
   };

   getFeed(){
     FB.api(
       "/me/feed",
       (response) => {
         if (response && !response.error) {
           this.props.buildFeed(response.data);
         }
       }
     );
   }

   getName(){
     FB.api(
       "/me",
       (response) => {
         if (response && !response.error) {
           this.props.buildName(response.name);
         }
       }
     );
   }

   click() {
       FB.login((response) => {
         if(response.authResponse){
            this.props.onLogIn();
            this.getFeed();
            this.getName();
           }
       }, {scope: 'public_profile, email, user_posts'});
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
