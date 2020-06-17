import React, {Component} from 'react';
import {ScrollView, View, Text, Image} from 'react-native';
import ButtonCmp from "../../../libraries/components/Button";
import styles from "../facebook/styles";
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import TextInfo from "../components/TextInfo";

class LoginGGScreen extends Component
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

    componentDidMount() {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '195558640776-ol3h0t7teggrngrpshbomuj659p3ouj3.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }

    signIn = async () => {
        if (this.state.isLogin) {
            return this.signOut();
        }

        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo);
            this.setState({
                isLogin: true,
                token: userInfo.idToken,
                id: userInfo.user.id,
                name: userInfo.user.name,
                email: userInfo.user.email,
                avatar: userInfo.user.photo,
            });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                alert('Error: user cancelled the login flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Error: operation (e.g. sign in) is in progress already');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('Error: play services not available or outdated');
            } else {
                alert('Error: ' + error.toString() );
            }
        }
    };

    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        this.setState({ isLoginScreenPresented: !isSignedIn });
    };

    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        this.setState({ currentUser });
    };

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({
                isLogin: false,
                token: null,
                id: '',
                name: '',
                email: '',
                avatar: '',
            });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <View style={[styles.container, {paddingBottom: 30}]}>
                {(this.state.isLogin) &&
                <ScrollView>
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
                </ScrollView>
                }
                <ButtonCmp text={this.state.isLogin ? 'Logout Google' : 'Login Google'} onPress={this.signIn}/>
            </View>
        );
    }
}

export default LoginGGScreen;