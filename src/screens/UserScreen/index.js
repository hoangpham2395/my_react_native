import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from "react-redux";
import styles from "./styles";
import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorageName from "../../libraries/constants/AsyncStorageName";
import SCREEN_NAME from "../../libraries/constants/screenName";
import {deleteUser, getUsersDB, truncateUsersDB, usersSQL} from "../../libraries/database/example";
import colors from "../../assets/colors";

class UserScreen extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        this.getListUsers();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getListUsers();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    getListUsers() {
        let db = getUsersDB();
        let sql = usersSQL.getList;
        let users = [];
        db.transaction((txn) => {
            txn.executeSql(sql, [], (tx, res) => {
                let len = res.rows.length;
                for (let i = 0; i < len; i++) {
                    const {id, fullname, email, address, tel} = res.rows.item(i);
                    users.push({id, fullname, email, address, tel});
                }
                this.setState({users});
            })
        });
    }

    createUser() {
        this.props.navigation.navigate(SCREEN_NAME.USER_CREATE_SCREEN);
    }

    updateUser(user) {
        this.props.navigation.navigate(SCREEN_NAME.USER_EDIT_SCREEN, {user});
    }

    deleteUser(index) {
        let users = this.state.users;
        deleteUser(users[index].id);
        users.splice(index, 1);
        this.setState({users});
    }

    render() {
        return (
            <ScrollView>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={{paddingTop: 20, paddingLeft: 10, fontWeight: 'bold'}}>List users:</Text>
                    <TouchableOpacity onPress={() => this.createUser()} style={{backgroundColor: colors.Green1, paddingVertical: 5, borderRadius: 50, width: 100, alignItems: 'center'}}>
                        <Text style={{color: colors.White}}>Create</Text>
                    </TouchableOpacity>
                </View>
                {this.state.users.map((user, index) => {
                    return (
                        <View key={index} style={{paddingVertical: 10, paddingLeft: 15}}>
                            <Text>{user.fullname}</Text>
                            <Text>{user.email}</Text>
                            <Text>{user.address}</Text>
                            <Text>{user.tel}</Text>
                            <TouchableOpacity onPress={() => this.updateUser(user)} style={{backgroundColor: colors.Blue1, paddingVertical: 5, borderRadius: 50, width: 100, alignItems: 'center', marginVertical: 5}}>
                                <Text style={{color: colors.White}}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.deleteUser(index)} style={{backgroundColor: colors.Red1, paddingVertical: 5, borderRadius: 50, width: 100, alignItems: 'center',}}>
                                <Text style={{color: colors.White}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
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
export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);