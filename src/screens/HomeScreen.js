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
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.navigate("CompanyRegisterScreen")}
      >
        <ImageBackground
          source={require("../../assets/ihelp/HomeCompany.png")}
          style={{ justifyContent: "center", flex: 1, top: 30 }}
          resizeMode="contain"
        >
          <Image
            source={require("../../assets/ihelp/logocompany.png")}
            style={{ width: 200, height: 100, alignSelf: "center", top: 20 }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 30,
              textAlign: "center",
              top: 100,
              fontWeight: "300",
            }}
          >
            Компани
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.navigate("PersonRegisterScreen")}
      >
        <ImageBackground
          source={require("../../assets/ihelp/HomePerson.png")}
          style={{ justifyContent: "center", flex: 1, bottom: 30 }}
          resizeMode="contain"
        >
          <Image
            source={require("../../assets/ihelp/logoperson.png")}
            style={{ width: 212, height: 100, alignSelf: "center", top: 20 }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 30,
              textAlign: "center",
              top: 100,
              fontWeight: "300",
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
