import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  
  checkIfLoggedIn = () => {  //if (!this.isUserEqual(googleUser, firebaseUser)) {
    firebase.auth().onAuthStateChanged(
      function(user) { //can also ..(user => {
        console.log('AUTH STATE CHANGED CALLED ')
        if (user) {  //if user exists
          this.props.navigation.navigate('DashboardScreen');
        } else {
          this.props.navigation.navigate('LoginScreen');
        }
      }.bind(this)  //bind instead of passing => function
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue"/>
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
