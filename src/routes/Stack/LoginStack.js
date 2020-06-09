import { createStackNavigator } from 'react-navigation-stack';
import SCREEN_NAME from "../../libraries/constants/screenName";
import SignInScreen from "../../screens/SignInScreen";

const LoginStack = createStackNavigator({
        [SCREEN_NAME.SIGN_IN_SCREEN]: {screen: SignInScreen},
    }, {
        headerMode: 'none'
    },
    {
        initialRouteName: { screen: SignInScreen },
    }
);

export default LoginStack;