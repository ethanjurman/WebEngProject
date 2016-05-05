import React, {Component} from 'react';
import { Paper, CardText, RaisedButton, FlatButton, Dialog } from 'material-ui';
import FacebookPost from './facebook-post';

export class FacebookFeed extends Component{

    constructor(props){
        super(props);

        this.setState = this.setState.bind(this);

        this.state = {
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

    buildFeed(feed) {
      const fbFeed = feed.map((post, index) => {
        return (<FacebookPost key={index} message={post.message} story={post.story} />);
      });
      this.setState({fbFeed})
    }
    buildName(name) {
      this.setState({name})
    }

    getFeed(){
      FB.api(
        "/me/feed",
        (response) => {
          if (response && !response.error) {
            buildFeed(response.data);
          }
        }
      );
    }

    getName(){
      FB.api(
        "/me",
        (response) => {
          if (response && !response.error) {
            buildName(response.name);
          }
        }
      );
    }

    render(){
        getFeed();
        getName();
        return(
            <div>
                <Paper style={{margin:'10px', padding:'10px'}}>
                  <CardText> { this.state.name } </CardText>
                  { this.state.fbFeed }
                </Paper>
            </div>
        );
    }
}

export default FacebookFeed;
