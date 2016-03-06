//loginButton.js
import React, {Component} from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import { LoginButton } from './login-button';


export class LoginModal extends Component{
    constructor(props){
        super(props);

        this.setState = this.setState.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            open: true,
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

    handleOpen(){
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    checkLoginState(response) {
        if(response.authResponse) {

        }
        else {

        }
    };

   click() {
       FB.login(function(response){
            if(response.authResponse){
                this.handleClose();
            }
        }, {scope: 'public_profile, email'});
    }

    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return(
            <div>
                <RaisedButton label="Login with Facebook!" onTouchTap={this.handleOpen} />
                <Dialog
                    title="Facebook Login"
                    actions={actions}
                    modal={false}
                    open={this.state.open}>
                You must log in to continue.
                <LoginButton />
                </Dialog>
            </div>
        );
    }
}

export default LoginModal;
