import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Api from '../../services/api';

import { Container,
         Form,
         Input,
         SubmitButton,
         List,
         User,
         Avatar,
         Name,
         Bio,
         ProfileButton,
         ProfileButtonText
        } from './styles';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Users',
  };

  // we only use the navigate functions of the navigation property
  //static propTypes = {
    //navigation: PropTypes.shape({
      //navigate: PropTypes.func,
    //}).isRequired(),
  //};

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    if (newUser === "") {
      Alert.alert('Type a name to add');
      return;
    }

    this.setState({ loading: true });

    const response = await Api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data ],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss();
  }

  handleNavigate = (user) => {
    const { navigation } = this.props;
    navigation.navigate('User', { user });
  }

  render() {
    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Add User"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser} />

            <SubmitButton loading={loading} onPress={this.handleAddUser}>
              { loading ? (
                <ActivityIndicator color="#FFF"/>
                ) : (
                  <Icon name="add" size={20} color="#FFF" />
               ) }

            </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }}/>
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>See Profile</ProfileButtonText>
              </ProfileButton>

            </User>
          )}
        />

      </Container>
    );
  }
}
