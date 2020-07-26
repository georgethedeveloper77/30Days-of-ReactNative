import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

//import { Camera, Permissions } from 'expo'
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import * as MediaLibrary from "expo-media-library";

import { Container, Header, Item, Icon, Input } from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class CameraComponent extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back, //back camera
    rollGranted: false,
    cameraGranted: false,
  };

  async UNSAFE_componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  async getCameraRollPermissions() {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      this.setState({ rollGranted: true });
    } else {
      console.log("Uh oh! The user has not granted us permission.");
      this.setState({ rollGranted: false });
    }
  }

  takePictureAndCreateAlbum = async () => {
    console.log("tpaca");
    const { uri } = await this.camera.takePictureAsync();
    console.log("uri", uri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    console.log("asset", asset);
    MediaLibrary.createAlbumAsync("Expo", asset)
      .then(() => {
        Alert.alert("Album created!");
      })
      .catch((error) => {
        Alert.alert("An Error Occurred!");
      });
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text> No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1, justifyContent: "space-between" }}
            type={Camera.Constants.Type.back}
          >
            <Container
              searchBar
              rounded
              style={{
                //position: "absolute",
                backgroundColor: "transparent",
                left: 0,
                top: 0,
                right: 0,
                zIndex: 100,
                alignItems: "center",
              }}
            >
              <Header
                style={{
                  position: "absolute",
                  backgroundColor: "transparent",
                  left: 0,
                  top: 0,
                  right: 0,
                  zIndex: 100,
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", flex: 4 }}>
                  <Icon name="logo-snapchat" style={{ color: "white" }} />
                  <Item style={{ backgroundColor: "transparent" }}>
                    <Icon
                      name="ios-search"
                      style={{
                        color: "white",
                        fontSize: 24,
                        fontWeight: "bold",
                      }}
                    ></Icon>

                    <Input placeholder="Search" placeholderTextColor="white" />
                  </Item>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    flex: 2,
                    justifyContent: "space-around",
                  }}
                >
                  <Icon
                    name="ios-flash"
                    style={{ color: "white", fontWeight: "bold" }}
                  />
                  <TouchableOpacity>
                    <Icon
                      onPress={() => {
                        //changes type of camera
                        this.setState({
                          type:
                            this.state.type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back,
                        });
                      }}
                      name="ios-reverse-camera"
                      style={{ color: "white", fontWeight: "bold" }}
                    />
                  </TouchableOpacity>
                </View>
              </Header>
            </Container>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginBottom: 15,
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="message-reply"
                  style={{ color: "white", fontSize: 36 }}
                ></MaterialCommunityIcons>
              </TouchableOpacity>

              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  //name="circle-outline"
                  style={{ color: "white", fontSize: 100 }}
                ></MaterialCommunityIcons>
                <TouchableOpacity>
                  <Icon
                    name="ios-images"
                    style={{ color: "white", fontSize: 36 }}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() =>
                  this.state.rollGranted && this.state.cameraGranted
                    ? this.takePictureAndCreateAlbum()
                    : Alert.alert("Permissions not granted")
                }
                style={styles.buttonContainer}
              >
                <View>
                  <MaterialCommunityIcons
                    style={styles.button}
                    name="google-circles-communities"
                    style={{ color: "white", fontSize: 36 }}
                  ></MaterialCommunityIcons>
                </View>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  button: {
    width: 200,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
  },
});

export default CameraComponent;
