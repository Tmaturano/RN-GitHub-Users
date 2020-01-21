import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import WebView from './pages/webview';

// any navigation type should go inside the createAppContainer
const Routes = createAppContainer(
  createStackNavigator({
    Main,
    User,
    WebView,
  }, {
    headerTitleAlign: 'center',
    defaultNavigationOptions: {
      headerStyle:{
        backgroundColor: '#7159c1',
      },
      headerTintColor: '#FFF',
      headerBackTitleVisible: false,
    },
  }),
);

export default Routes;
