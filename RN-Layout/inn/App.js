import React from "react";
import { Image } from "react-native";

import { createBottomTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import Explore from "./screens/Explore";
import Saved from "./screens/Saved";
import Inbox from "./screens/Inbox";
import Trips from "./screens/Trips";

export default createBottomTabNavigator(
  {
    Explore: {
      screen: Explore,
      navigationOptions: {  //it must be there
        tabBarLabel: "EXPLORE",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-search" color={tintColor} size={24} />
        ),
      },
    },
    Saved: {
      screen: Saved,
      navigationOptions: {
        tabBarLabel: "SAVED",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-heart-half" color={tintColor} size={24} />
        ),
      },
    },
    Trips: {
      screen: Trips,
      navigationOptions: {
        tabBarLabel: "TRIPS",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("./assets/airbnb.png")} //images just looks like icon
            style={{ height: 24, width: 24, tintColor: tintColor }}
          />
        ),
      },
    },
    Inbox: {
      screen: Inbox,
      navigationOptions: {
        tabBarLabel: "INBOX",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-chatboxes" color={tintColor} size={24} />
        ),
      },
    },
    Profile: {
      screen: Inbox,
      navigationOptions: {
        tabBarLabel: "PROFILE",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={24} />
        ),
      },
    },
  },
  {
    tabBarOptions: { // applicable to al
      activeTintColor: "red",
      inactiveTintColor: "grey",
      style: {
        backgroundColor: "white",
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: "black",
        shadowOpacity: 0.5,
        elevation: 5, //this makes it work on android {}
      },
    },
  }
);


