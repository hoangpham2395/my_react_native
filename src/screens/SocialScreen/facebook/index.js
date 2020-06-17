import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import FBLoginButton from "./components/FBLoginButton";
import {LoginManager, GraphRequest, GraphRequestManager, AccessToken} from 'react-native-fbsdk';
import styles from "./styles";
import ButtonCmp from "../../../libraries/components/Button";

class LoginFBScreen extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            token: null,
            id: '',
            name: '',
            email: '',
            avatar: '',
        }
    }

    loginFB() {
        if (this.state.isLogin) {
            return this.logoutFB();
        }

        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
            (result) => {
                if (result.isCancelled) {
                    alert('Login was cancelled');
                } else {
                    //alert('Login was successful with permissions: ' + result.grantedPermissions.toString());
                    AccessToken.getCurrentAccessToken().then((data) => {
                        let token = data.accessToken.toString();
                        this.setState({token});

                        const processRequest = new GraphRequest(
                            '/me',
                            {
                                accessToken: token,
                                parameters: {
                                    fields: {
                                        string: 'email,name,picture.type(large)',
                                    },
                                }
                            },
                            (error, result) => {
                                if (error) {
                                    alert('Error fetch data: ' + error.toString());
                                } else {
                                    console.log(result);
                                    this.setState({
                                        isLogin: true,
                                        id: result.id,
                                        name: result.name,
                                        email: result.email,
                                        avatar: result.picture.data.url,
                                    });
                                }
                            }
                        );
                        new GraphRequestManager().addRequest(processRequest).start();
                    });
                }
            },
            (error) => {
                alert('Login failed with error: ' + error);
            }
        );
    }

    logoutFB() {
        this.setState({
            isLogin: false,
            token: null,
            id: '',
            name: '',
            email: '',
            avatar: '',
        });
    }

    render() {
        return (
            <View style={[styles.container]}>
                {(this.state.isLogin) &&
                    <View style={{paddingHorizontal: 20, paddingBottom: 30}}>
                        <Text style={{fontSize: 30, paddingBottom: 20}}>Welcome to my app</Text>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{
                                uri: this.state.avatar,
                            }}
                        />
                        <TextInfo title={'ID'} value={this.state.id}/>
                        <TextInfo title={'Name'} value={this.state.name}/>
                        <TextInfo title={'Email'} value={this.state.email}/>
                        <TextInfo title={'Access token'} value={this.state.token}/>
                    </View>
                }
                <ButtonCmp text={this.state.isLogin ? 'Logout Facebook' : 'Login facebook'} onPress={() => this.loginFB()}/>
            </View>
        );
    }
}

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

export default LoginFBScreen;