import React, { Component } from 'react';
import { ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import Api from '../../services/api';

import {
  Container,
  Avatar,
  Name,
  Bio,
  Header,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author
 } from './styles';

// can pass props (then will have everything) or just desconstruct it
export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  //static propTypes = {
    //navigation: PropTypes.shape({
      //getParam: PropTypes.func,
    //}).isRequired(),
  //};

  state = {
    stars: [],
    loading: false,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    this.setState({ loading: true });

    const response = await Api.get(`/users/${user.login}/starred`);

    this.setState({
      stars: response.data,
      loading: false,
    });
  }

  handleNavigate = (repository) => {
    const { navigation } = this.props;
    //console.tron.log(repository);
    navigation.navigate('WebView', { repository });
  }

  render() {
    const { stars, loading } = this.state;
    const { navigation } = this.props;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
         <Avatar source={{ uri: user.avatar }}/>
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Name>
          Stars
        </Name>

        { loading ? (
            <ActivityIndicator/>
          ) : (
            <Stars
              data={stars}
              keyExtractor={star => String(star.id)}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => this.handleNavigate(item)}>
                  <Starred>
                    <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                    <Info>
                      <Title>{item.name}</Title>
                      <Author>{item.owner.login}</Author>
                    </Info>
                  </Starred>
                </TouchableWithoutFeedback>
              )}>
            </Stars>
        )}
      </Container>
    );
  }
}
