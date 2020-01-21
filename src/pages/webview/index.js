import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class WebViewComponent extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  state = {
    repositoryUrl: '',
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const { html_url } = navigation.getParam('repository');

    this.setState({ repositoryUrl: html_url });
  }

  render() {
    return (
      <WebView source={{ uri: this.state.repositoryUrl }} />
    );
  }
}
