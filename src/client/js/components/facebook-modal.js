//loginButton.js
import React, {Component} from 'react';
import { Paper, CardText, RaisedButton, FlatButton, Dialog } from 'material-ui';
import { LoginButton } from './login-button';
import FacebookPost from './facebook-post';


export class FacebookModal extends Component{
    constructor(props){
        super(props);

        this.setState = this.setState.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            open:  true,
            fbFeed: '',
            name: ''
        };
    }

    componentDidMount() {

        window.fbAsynchInit = () => {
            FB.init({
                appId: '902633069835365',
                xfbml: true,
                version: 'v2.5',
                status, true,
            });

            console.log("Hi");

            /*FB.getLoginStatus(function(response) {
                this.statusChangeCallback(response);
                if(response.status === 'connected'){
                    this.handleClose();
                    this.getFeed();
                    this.getName();
                }
            }.bind(this));*/

            FB.Event.subscribe('auth.statusChange', function(response){
                this.statusChangeCallback(response);
            }.bind(this));
        }.bind(this);

        // Load the SDK asynchronously
        ((d, s, id) => {
            const element = d.getElementsByTagName(s)[0];
            const fjs = element;
            let js = element;
            if(d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "http://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=902633069835365";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebood-jssdk'));

        setTimeout(this.getStatus.bind(this), 1000);

    }

    handleOpen(){
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    buildFeed(feed) {
      const fbFeed = feed.map((post, index) => {
        return (<FacebookPost key={index} message={post.message} story={post.story} />);
      });
      this.setState({fbFeed})
    }

    buildName(name) {
      this.setState({name})
    }

    checkLoginState(){
        FB.getLoginStatus(function(response){
            this.statusChangeCallback(response);
        }.bind(this));
    }

    statusChangeCallback(response){

    }

    getFeed(){
      FB.api(
        "/me/feed",
        (response) => {
          if (response && !response.error) {
            this.buildFeed(response.data);
          }
        }
      );
    }

    getName(){
      FB.api(
        "/me",
        (response) => {
          if (response && !response.error) {
            this.buildName(response.name);
          }
        }
      );
    }

    getStatus(){
        FB.getLoginStatus(function(response) {
            if(response.status === 'connected'){
                this.handleClose();
                this.getFeed();
                this.getName();
            }
        }.bind(this));
    }

    login(){
        FB.login((response) => {
          if(response.authResponse){
             this.handleClose();
             this.getFeed();
             this.getName();
            }
        }, {scope: 'public_profile, email, user_posts'});
    }

    render() {
        const actions = [
            <LoginButton
              onLogIn={this.login.bind(this)} buildFeed={this.buildFeed.bind(this)}
              buildName={this.buildName.bind(this)}
              />
        ];

        return(
            <div>
                <Dialog
                    title="Facebook Login"
                    actions={actions}
                    modal={false}
                    open={this.state.open}>
                You must log in to continue.
                </Dialog>
                <Paper style={{margin:'10px', padding:'10px'}}>
                  <CardText> { this.state.name } </CardText>
                  { this.state.fbFeed }
                </Paper>
            </div>
        );
    }
}

export default FacebookModal;
