import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView, //safe margin in iphone x
  TextInput,
  Platform, //android
  StatusBar,
  ScrollView,
  Image,
  Dimensions, //width n height
  Animated, // this makes animation
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Category from "./components/Explore/Category";
import Home from "./components/Explore/Home";
import Tag from "./components/Explore/Tag";

const { height, width } = Dimensions.get("window");

class Explore extends Component {
  componentWillMount() {
    this.scrollY = new Animated.Value(0); //animate header platform android

    this.startHeaderHeight = 80;
    this.endHeaderHeight = 50;
    if (Platform.OS == "android") { //header for android
      this.startHeaderHeight = 100 + StatusBar.currentHeight; //header decrease on scroll
      this.endHeaderHeight = 70 + StatusBar.currentHeight;
    }

    this.animatedHeaderHeight = this.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [this.startHeaderHeight, this.endHeaderHeight],
      extrapolate: "clamp",  //reaches header heigth it stops
    });

    this.animatedOpacity = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    this.animatedTagTop = this.animatedHeaderHeight.interpolate({ //tags animates on move
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [-30, 10],
      extrapolate: "clamp",
    });
    this.animatedMarginTop = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [50, 30],
      extrapolate: "clamp",
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              height: this.animatedHeaderHeight, //android
              backgroundColor: "white",
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "white",
                marginHorizontal: 20,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: "black",
                shadowOpacity: 0.2,
                elevation: 1, // android
                marginTop: Platform.OS == "android" ? 30 : null, //android
              }}
            >
              <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
              <TextInput
                underlineColorAndroid="transparent" //android
                placeholder="Try Nairobi"
                placeholderTextColor="grey"
                style={{ flex: 1, fontWeight: "700", backgroundColor: "white" }}
              />
            </View>
            <Animated.View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
                position: "relative",
                top: this.animatedTagTop,
                opacity: this.animatedOpacity,
              }}
            >
              <Tag name="Guests" />
              <Tag name="Dates" />
            </Animated.View>
          </Animated.View>
          
          <ScrollView
            scrollEventThrottle={16} //sends responses as fast as possible on scroll
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.scrollY } } }, //extracting y n storing on scroll view
            ])}
          >
            <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  paddingHorizontal: 20,
                }}
              >
                What can we help you find, ?
              </Text>

              <View style={{ height: 130, marginTop: 20 }}>
                <ScrollView
                  horizontal={true} //show image hor
                  showsHorizontalScrollIndicator={false}
                >
                  <Category
                    imageUri={require("../assets/home.jpg")}
                    name="Home"
                  />
                  <Category
                    imageUri={require("../assets/experiences.jpg")}
                    name="Experiences"
                  />
                  <Category
                    imageUri={require("../assets/restaurant.jpg")}
                    name="Resturant"
                  />
                </ScrollView>
              </View>

              <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: "700" }}>
                  Introducing inn Plus
                </Text>
                <Text style={{ fontWeight: "100", marginTop: 10 }}>
                  A new selection of homes verified for quality n comfort
                </Text>
                <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                  <Image
                    style={{
                      flex: 1,
                      height: null,
                      width: null,
                      resizeMode: "cover",
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: "#dddddd",
                    }}
                    source={require("../assets/home.jpg")}
                  />
                </View>
              </View>
            </View>

            <View style={{ marginTop: 40 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  paddingHorizontal: 20,
                }}
              >
                Homes around the world
              </Text>
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: 20,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <Home
                  width={width}
                  name="The Cozy Place"
                  type="PRIVATE ROOM - 2 BEDS"
                  price={82}
                  rating={4}
                />
                <Home
                  width={width}
                  name="The Cozy Place"
                  type="PRIVATE ROOM - 2 BEDS"
                  price={82}
                  rating={4}
                />
                <Home
                  width={width}
                  name="The Cozy Place"
                  type="PRIVATE ROOM - 2 BEDS"
                  price={82}
                  rating={4}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
