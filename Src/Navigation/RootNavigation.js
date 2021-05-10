import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from '../Screens/Login';
import Register from '../Screens/Register';
import NewEntry from '../Screens/NewEntry';

const AppNavigator = createSwitchNavigator(
  {
    Login: Login,
    Register: Register,
    NewEntry: NewEntry

  },
  {
    initialRouteName: 'Login',
  },
);
export default createAppContainer(AppNavigator);
