import React, {Component} from "react";
import {View, Text} from "react-native";
import firebase from "firebase";
import {Header, Button, Spinner} from "./components/common";
import LoginForm from "./components/LoginForm";
class App extends Component {

    state = {loggedIn: null};

    componentWillMount() {

        firebase.initializeApp({
            apiKey: "AIzaSyCbcUc7OoZEpGkUlv3k9EI1DZJhl4qlpu4",
            authDomain: "authnetication-ff9d8.firebaseapp.com",
            databaseURL: "https://authnetication-ff9d8.firebaseio.com",
            storageBucket: "authnetication-ff9d8.appspot.com",
            messagingSenderId: "875521609544"
        });

        firebase.auth().onAuthStateChanged((user)=> {

            if (user) {
                this.setState({loggedIn: true});
            } else {
                this.setState({loggedIn: false});
            }

        });
    }

    renderContent() {

        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button onPress={()=> firebase.auth().signOut()}>
                        Log out
                    </Button>
                );
            case false:
                return <LoginForm/>;
            default:
                return <Spinner size="large"/>;

        }

    }

    render() {
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        );

    }
}

export default App;
