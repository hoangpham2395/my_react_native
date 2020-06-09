import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import Ratio from "../../constants/Ratio";
import colors from "../../../assets/colors";

class ButtonCmp extends Component
{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={[styles.viewButton]} onPress={this.props.onPress}>
                <Text style={[styles.textButton]}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    viewButton: {
        marginTop: Ratio.ratio * 40,
        backgroundColor: colors.Black,
        paddingVertical: Ratio.ratio * 20,
        paddingHorizontal: Ratio.ratio * 80,
        borderRadius: 50,
    },
    textButton: {
        color: colors.White,
        fontSize: Ratio.ratio * 30,
    },
});

export default ButtonCmp;