import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from "react-redux";
import styles from "./styles";
import ButtonCmp from "../../libraries/components/Button";
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageName from "../../libraries/constants/AsyncStorageName";
import SCREEN_NAME from "../../libraries/constants/screenName";
import {truncateUsersDB} from "../../libraries/database/example";

class HomeScreen extends Component
{
    constructor(props) {
        super(props);
    }

    signOut = () => {
        truncateUsersDB();
        AsyncStorage.removeItem(AsyncStorageName.TOKEN);
        this.props.navigation.navigate(SCREEN_NAME.LOGIN_STACK);
    }

    render() {
        return (
            <View>
                <Text>This is Home screen.</Text>
                <ButtonCmp text={'Sign out'} onPress={this.signOut}/>
                <ButtonCmp text={'Database local'} onPress={() => this.props.navigation.navigate(SCREEN_NAME.USER_SCREEN)}/>
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