import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from "react-redux";
import styles from "./styles";

class HomeScreen extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>This is Home screen.</Text>
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