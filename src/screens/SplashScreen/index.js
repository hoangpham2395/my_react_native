import React, {Component} from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import styles from "./styles";
import SCREEN_NAME from "../../libraries/constants/screenName";
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageName from "../../libraries/constants/AsyncStorageName";
import NetInfo from "@react-native-community/netinfo";

class SplashScreen extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            token: '',
        };
    }

    componentDidMount() {
        this.getToken().then((res) => {}).catch((err) => console.log(err));
        setTimeout(this.onNavigate, 500);
        NetInfo.fetch().then(state => {
            console.log(state);
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (!state.isConnected) {
                alert('Not connect internet');
            }
        });
    }

    async getToken() {
        const token = await AsyncStorage.getItem(AsyncStorageName.TOKEN);
        if (token !== null || !token) {
            this.setState({token});
        }
    }

    onNavigate = () => {
        const token = this.state.token;
        if (token === null || !token) {
            this.props.navigation.navigate(SCREEN_NAME.LOGIN_STACK);
        } else {
            this.props.navigation.navigate(SCREEN_NAME.HOME_STACK);
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onNavigate}>
                <View style={{flex: 1}}>
                    <Text>This is Splash screen.</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default SplashScreen;