import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../firebase/firebase';


export default class SigninScreen extends Component {

    constructor() {
        super();
        this.state = {
            email: 'xyz@akhil.com',
            password: 'password',
            isLoading: false
        }
    }

    updateInputVal = (val, prop) => {
        //  console.log(prop);
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    userLogin = () => {
        if (this.state.email === '' || this.state.password === '') {
            Alert.alert('Enter details to signin!')
        } else {
            this.setState({
                isLoading: true,
            })
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    // console.log(res)
                    console.log('User logged-in successfully!')
                    this.setState({
                        isLoading: false,
                        email: '',
                        password: ''
                    })
                    this.props.navigation.replace('App')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.inputStyle}
                    placeholder="Email"
                    placeholderTextColor="black"
                    value={this.state.email}
                    onChangeText={(val) => this.updateInputVal(val, 'email')}
                />
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.inputStyle}
                    placeholder="Password"
                    placeholderTextColor="black"
                    value={this.state.password}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                    maxLength={15}
                    secureTextEntry={false}
                />
                <Button
                    color="#3740FE"
                    title="Signin"
                    onPress={() => this.userLogin()}
                />



                <Text
                    style={styles.loginText}
                    onPress={() => this.props.navigation.navigate('Signup')}>
                    Don't have account? Click here to signup
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1,
        color: 'black'
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});