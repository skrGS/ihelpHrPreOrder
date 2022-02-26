import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "../components/MyTextInput";
import axios from "axios";
import { api } from "../../Constants";
import { AntDesign } from "@expo/vector-icons";
import { Button, Overlay } from "react-native-elements";
import * as Animatable from "react-native-animatable";

const CompanyLoginScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  const signUpHandler = () => {
    if (password.length < 6) {
      Alert.alert("Нууц үг хамгийн багадаа 6 оронтой байна");
      return;
    }
    if (email.length === 0) {
      Alert.alert("Та и-мэйл хаягаа бичнэ үү");
      return;
    }
    axios
      .post(`${api}/profiles/login`, {
        email: email,
        password: password,
      })
      .then((result) => {
        console.log(result.data.profile);
        setData(result.data.profile);
        setVisible(!visible);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err);
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Утасны дугаар нууц үг хоорондоо таарахгүй байна";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        else if (message === "Request failed with status code 500")
          message = "Бүртгэлтэй хэрэглэгч байна";
        else if (message === "Request failed with status code 401")
          message = " Утасны дугаар болон нууц үгээ зөв оруулна уу";

        Alert.alert(message);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }}>
        <AntDesign
          name="arrowleft"
          size={30}
          color="#ffffff"
          style={{
            position: "absolute",
            top: 50,
            left: 10,
            zIndex: 2,
          }}
          onPress={() => navigation.goBack()}
        />
        <ImageBackground
          source={require("../../assets/ihelp/companyhead.png")}
          style={{ flex: 1, height: 220 }}
          resizeMode="cover"
        >
          <Animatable.Image
            animation="pulse"
            iterationCount="infinite"
            direction="alternate"
            easing="ease-out"
            source={require("../../assets/ihelp/logo.png")}
            style={{ width: 250, height: 90, alignSelf: "center", top: 65 }}
          />
          <View
            style={{
              backgroundColor: "white",
              top: 80,
              marginHorizontal: 100,
              borderRadius: 50,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              elevation: 10,
              padding: 6,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                color: "#4682B4",
              }}
            >
              Company
            </Text>
          </View>
        </ImageBackground>

        <View style={{ top: 10, flex: 1 }}>
          <View>
            <Text style={styles.inputHeadText}>И-мэйл хаяг:</Text>
            <MyTextInput value={email} onChangeText={setEmail} />
            <Text style={styles.inputHeadText}>Нууц үг:</Text>
            <MyTextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1, top: 5 }}
              onPress={signUpHandler}
            >
              <ImageBackground
                source={require("../../assets/ihelp/companybutton.png")}
                style={{ height: 100 }}
              >
                <Text
                  style={{
                    top: 45,
                    fontSize: 18,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Нэвтрэх
                </Text>
              </ImageBackground>
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                position: "absolute",
                top: 100,
                alignSelf: "center",
              }}
            >
              Бүртгүүлэх бол{" "}
              <Text
                style={{ color: "#4682B4" }}
                onPress={() => navigation.navigate("CompanyRegisterScreen")}
              >
                энд дар
              </Text>{" "}
            </Text>
          </View>
        </View>
        <Overlay isVisible={visible} style={{ paddingHorizontal: 100 }}>
          <View style={{ padding: 10 }}>
            <Text style={styles.textPrimary}> Бүртгэл үүссэн</Text>
            <Text style={styles.textSecondary}>
              Компанийн нэр:{" "}
              <Text style={{ color: "black", fontWeight: "500" }}>
                {data.name}
              </Text>{" "}
            </Text>

            <Text style={styles.textSecondary}>
              Утасны дугаар:{" "}
              <Text style={{ color: "black", fontWeight: "500" }}>
                {data.phone}
              </Text>
            </Text>
            <Text style={styles.textSecondary}>
              И-мэйл хаяг:{" "}
              <Text style={{ color: "black", fontWeight: "500" }}>
                {data.email}
              </Text>
            </Text>
            <Text
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontSize: 17,
                color: "green",
              }}
            >
              Таны пойнт:{" "}
              <Text style={{ fontWeight: "bold" }}>{data.point} ipoint </Text>
            </Text>
            <Button
              title="Буцах"
              onPress={() => navigation.navigate("HomeScreen")}
              style={{ paddingTop: 20, paddingBottom: 20 }}
            />
          </View>
        </Overlay>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CompanyLoginScreen;

const styles = StyleSheet.create({
  inputHeadText: {
    fontSize: 15,
    paddingLeft: 35,
    paddingTop: 10,
    paddingBottom: 5,
    color: "#4682B4",
    fontWeight: "600",
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
    color: "grey",
    fontWeight: "bold",
  },
});
