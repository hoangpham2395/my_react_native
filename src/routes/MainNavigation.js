import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SCREEN_NAME from "../libraries/constants/screenName";
import SplashScreen from "../screens/SplashScreen";
import LoginStack from "./Stack/LoginStack";
import HomeStack from "./Stack/HomeStack";

const mainStack = createSwitchNavigator({
    [SCREEN_NAME.SPLASH_SCREEN]: {screen: SplashScreen},
    [SCREEN_NAME.LOGIN_STACK]: {screen: LoginStack},
    [SCREEN_NAME.HOME_STACK]: {screen: HomeStack},
});

const MainNavigation = createAppContainer(mainStack);
export default MainNavigation;