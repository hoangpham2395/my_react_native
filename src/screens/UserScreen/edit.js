import React, {Component} from 'react';
import {View, Text, Alert, ScrollView} from 'react-native';
import InputCmp from "../SignInScreen/components/InputCmp";
import ButtonCmp from "../../libraries/components/Button";
import {isEmail} from "../../libraries/commons/functions";
import {updateUser} from "../../libraries/database/example";
import {connect} from "react-redux";
import SCREEN_NAME from "../../libraries/constants/screenName";

class UserEditScreen extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            fullname: '',
            email: '',
            address: '',
            tel: '',
        }
    }

    componentDidMount() {
        this.getInfoUser();
    }

    getInfoUser() {
        let user = this.props.navigation.getParam('user');
        let {id, fullname, email, address, tel} = user;
        this.setState({id, fullname, email, address, tel});
    }

    updateUser() {
        let {id, fullname, email, address, tel} = this.state;
        if (!fullname) {
            return Alert.alert('', 'Fullname is required.');
        }

        if (!email) {
            return Alert.alert('', 'Email is required.');
        }

        if (!isEmail(email)) {
            return Alert.alert('', 'Email is invalid.');
        }

        updateUser(id, {fullname, email, address, tel});

        let that = this;
        return Alert.alert('', 'Update success!', [
            {
                text: 'OK',
                onPress: () => that.props.navigation.navigate(SCREEN_NAME.USER_SCREEN),
            }
        ])
    }

    render() {
        return (
            <ScrollView style={{paddingHorizontal: 20, paddingTop: 30}}>
                <Text style={{fontWeight: 'bold'}}>Update user:</Text>
                <View>
                    <InputCmp title={'Fullname'} value={this.state.fullname} onChangeText={(fullname) => this.setState({fullname})}/>
                    <InputCmp title={'Email'} value={this.state.email} onChangeText={(email) => this.setState({email})}/>
                    <InputCmp title={'Address'} value={this.state.address} onChangeText={(address) => this.setState({address})}/>
                    <InputCmp title={'Telephone'} value={this.state.tel} onChangeText={(tel) => this.setState({tel})}/>
                </View>
                <ButtonCmp text={'Update'} onPress={() => this.updateUser()}/>
            </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserEditScreen);