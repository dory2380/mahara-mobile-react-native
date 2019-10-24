import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { addToken, userName, userTags, userFolders, userBlogs } from '../../actions/actions.ts';
import GetUser from '../../components/GetUser/GetUser.tsx';
import styles from './LoginScreen.style.ts';

export class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ''
    };
  }

  static navigationOptions = {
    header: null,
  };

  login = async (json) => {
    const url = 'https://master.dev.mahara.org/';
    const serverUrl = url + 'webservice/rest/server.php?alt=json';
    const api = 'module_mobileapi_sync';

    const body = {
      blogs: {},
      folders: {},
      tags: {},
      userprofile: {},
      userprofileicon: {},
      wsfunction: "module_mobileapi_sync",
      wstoken: this.state.token
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    try {
      const response = await fetch(serverUrl, requestOptions);
      const json = await response.json();
      this.receiveRequest(json);
    } catch (error) {
      this.errorHandle(error);
    }
  };

  receiveRequest = (json) => {
    if(json) {
      const username = json.userprofile.myname;
      const usertags = json.tags.tags;
      const userblogs = json.blogs.blogs;
      const userfolders = json.folders.folders;

      this.props.dispatch(userName(username));
      this.props.dispatch(userTags(usertags));
      this.props.dispatch(userBlogs(userblogs));
      this.props.dispatch(userFolders(userfolders));

      this.props.navigation.navigate('Profile');
    }
  }

  errorHandle = (error) => {
    console.log('error', error);
  }

  handleToken = (value) => {

    this.setState({token: value}, function() {
      this.login();
    });

    this.props.dispatch(addToken(value));
  }

  render() {

    return (
      <View style={styles.view}>
        <GetUser handler={this.handleToken} style={styles.component} />
      </View>
    );
  }
};

const mapStateToProps = state => {
  return {
    token: state.app.token,
    username: state.app.username,
    usertags: state.app.tags,
    userblogs: state.app.userblogs,
    userfolders: state.app.userfolders
  }
}

export default connect(mapStateToProps)(LoginScreen);