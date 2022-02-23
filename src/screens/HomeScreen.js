import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        paddingVertical: 10,
      }}
    >
      <TouchableOpacity
        style={{ flex: 0.5 }}
        onPress={() => navigation.navigate("CompanyRegisterScreen")}
      >
        <ImageBackground
          source={require("../../assets/ihelp/HomeCompany.png")}
          style={{
            flex: 1,
            justifyContent: "center",
          }}
          resizeMode="contain"
        >
          <Text style={{ flex: 1 }}></Text>
          <Image
            source={require("../../assets/ihelp/logocompany.png")}
            style={{
              alignSelf: "center",
              justifyContent: "center",
              flex: 0.8,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 30,
              textAlign: "center",
              fontWeight: "300",
              top: 50,
              flex: 1,
            }}
          >
            Компани
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 0.5 }}
        onPress={() => navigation.navigate("PersonRegisterScreen")}
      >
        <ImageBackground
          source={require("../../assets/ihelp/HomePerson.png")}
          style={{
            flex: 1,
            justifyContent: "center",
          }}
          resizeMode="contain"
        >
          <Text style={{ flex: 1 }}></Text>
          <Image
            source={require("../../assets/ihelp/logoperson.png")}
            style={{
              alignSelf: "center",
              justifyContent: "center",
              flex: 0.8,
              resizeMode: "contain",
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 30,
              textAlign: "center",
              fontWeight: "300",
              top: 50,
              flex: 1,
            }}
          >
            Хувь хүн
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
