import React, {Component} from 'react';
import {connect} from "react-redux";
import {View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from "./styles";
import InputCmp from "./components/InputCmp";
import AsyncStorageName from "../../libraries/constants/AsyncStorageName";
import SCREEN_NAME from "../../libraries/constants/screenName";
import ButtonCmp from "../../libraries/components/Button";

class SignInScreen extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    signIn = () => {
        let {email, password} = this.state;
        if (!email || email === null) {
            return Alert.alert('', "Please enter email.");
        }

        if (!password || password === null) {
            return Alert.alert('', "Please enter password.");
        }

        let that = this;
        return Alert.alert('', 'Login success', [
            {
                text: 'OK',
                onPress: () => {
                    AsyncStorage.setItem(AsyncStorageName.TOKEN, 'my_react_native_login');
                    that.props.navigation.navigate(SCREEN_NAME.HOME_STACK);
                }
            }
        ]);
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={[styles.viewLogo]}>
                    <Text style={[styles.logo]}>My react native</Text>
                </View>
                <View style={[styles.viewInput]}>
                    <InputCmp title={'Email'} onChangeText={(email) => this.setState({email})}/>
                    <InputCmp title={'Password'} onChangeText={(password) => this.setState({password})} secureTextEntry={true}/>
                </View>
                <ButtonCmp text={'Sign in'} onPress={this.signIn}/>
                <ButtonCmp text={'Login Facebook'} onPress={() => this.props.navigation.navigate(SCREEN_NAME.LOGIN_FB_SCREEN)}/>
                <ButtonCmp text={'Login Google'} onPress={() => this.props.navigation.navigate(SCREEN_NAME.LOGIN_GG_SCREEN)}/>
            </View>
        );
    }
}

// Get data from reducer
const mapStateToProps = (state) => {
    return {

    }
};

// Map action
const mapDispatchToProps = (dispatch) => {
    return {

    }
};

// Connect saga
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);