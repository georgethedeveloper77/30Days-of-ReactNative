//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  View } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';

// IOS=View -> UIView    ..ANDROID= -> androidview
export default function App() {
   return (
     <ViewImageScreen/>
     <WelcomeScreen/>    
  );
}

