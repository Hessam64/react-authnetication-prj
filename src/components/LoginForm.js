import React, {Component} from 'react';
import {TextInput, Text} from 'react-native';
import firebase from "firebase";
import {Button, Card, CardSection, Input, Spinner} from "./common";
class LoginForm extends Component {

    state = {email: "", password: "", error: "", loading: false};

    onButtonPress() {

        const {email, password} = this.state;

        this.setState({error: "", loading: true});
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this)).catch(()=> {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onLoginSuccess.bind(this)).catch(this.onLoginFailed.bind(this));
        });
    }

    onLoginSuccess() {

        this.setState({email: "", password: "", loading: false, error: ""});

    }

    onLoginFailed() {

        this.setState({loading: false, error: "Authentication Failed!.."});
    }

    renderButton() {

        if (this.state.loading) {
            return <Spinner size="small"/>
        } else {
            return (
                <Button onPress={this.onButtonPress.bind(this)}>
                    Log in
                </Button>
            );
        }
    }

    render() {

        return (
            <Card>
                <CardSection>
                    <Input placeholder="user@gmail.com" label="Email" value={this.state.email}
                           onChangeText={email=> this.setState({email})}/>
                </CardSection>
                <CardSection>
                    <Input placeholder="password" label="Password" value={this.state.password}
                           secureTextEntry onChangeText={password=> this.setState({password})}/>
                </CardSection>
                <Text style={styles.errorTestStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}
const styles = {

    errorTestStyle: {
        fontSize: 20,
        alignSelf: "center",
        color: "red"
    }
};
export default LoginForm;