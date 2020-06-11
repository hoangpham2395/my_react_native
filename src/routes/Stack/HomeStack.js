import { createStackNavigator } from 'react-navigation-stack';
import SCREEN_NAME from "../../libraries/constants/screenName";
import HomeScreen from "../../screens/HomeScreen";
import UserScreen from "../../screens/UserScreen";
import UserEditScreen from "../../screens/UserScreen/edit";
import UserCreateScreen from "../../screens/UserScreen/create";

const HomeStack = createStackNavigator({
        [SCREEN_NAME.HOME_SCREEN]: {screen: HomeScreen},
        [SCREEN_NAME.USER_SCREEN]: {screen: UserScreen},
        [SCREEN_NAME.USER_EDIT_SCREEN]: {screen: UserEditScreen},
        [SCREEN_NAME.USER_CREATE_SCREEN]: {screen: UserCreateScreen},
    }, {
        headerMode: 'none'
    },
    {
        initialRouteName: { screen: HomeScreen },
    }
);

export default HomeStack;