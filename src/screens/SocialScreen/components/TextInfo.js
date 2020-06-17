import React, {Component} from "react";
import {Text, View} from "react-native";

class TextInfo extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text><Text style={{fontWeight: 'bold'}}>{this.props.title}</Text>: {this.props.value}</Text>
            </View>
        );
    }
}

export default TextInfo;