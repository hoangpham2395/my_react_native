import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Ratio from "../../../libraries/constants/Ratio";

class InputCmp extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container]}>
                <Text style={[styles.title]}>{this.props.title}</Text>
                <TextInput
                    style={[styles.input]}
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                    secureTextEntry={this.props.secureTextEntry}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: Ratio.ratio * 20,
    },
    title: {
        paddingBottom: Ratio.ratio * 8,
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: Ratio.ratio * 20,
    },
});

export default InputCmp;