import { createStackNavigator } from 'react-navigation-stack';
import SCREEN_NAME from "../../libraries/constants/screenName";
import HomeScreen from "../../screens/HomeScreen";
import MapScreen from "../../screens/MapScreen";

const HomeStack = createStackNavigator({
        [SCREEN_NAME.HOME_SCREEN]: {screen: HomeScreen},
        [SCREEN_NAME.MAP_SCREEN]: {screen: MapScreen},
    }, {
        headerMode: 'none'
    },
    {
        initialRouteName: { screen: HomeScreen },
    }
);

export default HomeStack;