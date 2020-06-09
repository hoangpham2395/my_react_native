import { createStackNavigator } from 'react-navigation-stack';
import SCREEN_NAME from "../../libraries/constants/screenName";
import HomeScreen from "../../screens/HomeScreen";

const HomeStack = createStackNavigator({
        [SCREEN_NAME.HOME_SCREEN]: {screen: HomeScreen},
    }, {
        headerMode: 'none'
    },
    {
        initialRouteName: { screen: HomeScreen },
    }
);

export default HomeStack;