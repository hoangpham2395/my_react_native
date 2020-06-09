import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from "react-redux";
import styles from "./styles";
import ButtonCmp from "../../libraries/components/Button";
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageName from "../../libraries/constants/AsyncStorageName";
import SCREEN_NAME from "../../libraries/constants/screenName";

class HomeScreen extends Component
{
    constructor(props) {
        super(props);
    }

    signOut = () => {
        AsyncStorage.removeItem(AsyncStorageName.TOKEN);
        this.props.navigation.navigate(SCREEN_NAME.LOGIN_STACK);
    }

    render() {
        return (
            <View>
                <Text>This is Home screen.</Text>
                <ButtonCmp text={'Sign out'} onPress={this.signOut}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);