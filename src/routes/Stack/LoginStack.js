import { createStackNavigator } from 'react-navigation-stack';
import SCREEN_NAME from "../../libraries/constants/screenName";
import SignInScreen from "../../screens/SignInScreen";
import LoginFBScreen from "../../screens/SocialScreen/facebook";
import LoginGGScreen from "../../screens/SocialScreen/google";

const LoginStack = createStackNavigator({
        [SCREEN_NAME.SIGN_IN_SCREEN]: {screen: SignInScreen},
        [SCREEN_NAME.LOGIN_FB_SCREEN]: {screen: LoginFBScreen},
        [SCREEN_NAME.LOGIN_GG_SCREEN]: {screen: LoginGGScreen},
    }, {
        headerMode: 'none'
    },
    {
        initialRouteName: { screen: SignInScreen },
    }
);

export default LoginStack;