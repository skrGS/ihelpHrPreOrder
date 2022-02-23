import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "../components/MyTextInput";
import axios from "axios";
import { api } from "../../Constants";
import { AntDesign } from "@expo/vector-icons";
import { Button, Overlay, Icon, CheckBox } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";
const CompanyRegisterScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const [name, setName] = useState("Tserumen1");
  const [email, setEmail] = useState("tserumen1d@gmail.com");
  const [phone, setPhone] = useState("99110504");
  const [password, setPassword] = useState("123456");
  const [password1, setPassword1] = useState("123456");
  const [data, setData] = useState([]);
  const [point] = useState(50);
  const signUpHandler = () => {
    if (password !== password1) {
      Alert.alert("Нууц үгнүүд хоорондоо таарахгүй байна!");
      return;
    }
    if (name.length === 0) {
      Alert.alert("Та нэрээ бичнэ үү");
      return;
    }
    if (email.length === 0) {
      Alert.alert("Та и-мэйл хаягаа бичнэ үү");
      return;
    }
    if (phone.length === 0) {
      Alert.alert("Та утасны дугаараа бичнэ үү");
      return;
    }
    axios
      .post(`${api}/profiles/register`, {
        phone: phone,
        email: email,
        name: name,
        point: point,
        isEmployee: isEmployee,
        isEmployer: isEmployer,
        password: password,
        role: "user",
      })
      .then((result) => {
        console.log(result.data.profile);
        setData(result.data.profile);
        setVisible(!visible);
      })
      .catch((err) => {
        console.log(err);
        let message = err.message;
        if (message === "Request failed with status code 404")
          message = "Утасны дугаар нууц үг хоорондоо таарахгүй байна";
        else if (message === "Network Error")
          message =
            "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу..";
        else if (message === "Request failed with status code 500")
          message = "Бүртгэлтэй хэрэглэгч байна";

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
          style={{ flex: 2, height: 230 }}
        >
          <Image
            source={require("../../assets/ihelp/logo.png")}
            style={{ width: 250, height: 90, alignSelf: "center", top: 70 }}
          />

          <View
            style={{
              backgroundColor: "white",
              top: 88,
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
        <View style={{ top: 15 }}>
          <View>
            <Text style={styles.inputHeadText}>Компанийн нэр:</Text>
            <MyTextInput
              placeholder="Компанийн нэрээ оруулна уу!"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.inputHeadText}>Утас:</Text>
            <MyTextInput
              placeholder="Утасны дугаараа оруулна уу!"
              value={phone}
              onChangeText={setPhone}
            />
            <Text style={styles.inputHeadText}>И-мэйл хаяг:</Text>
            <MyTextInput
              placeholder="И-мэйл хаягаа оруулна уу!"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.inputHeadText}>Нууц үг:</Text>
            <MyTextInput
              placeholder="Нууц үгээ оруулна уу!"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <Text style={styles.inputHeadText}>Нууц үг бататгах:</Text>
            <MyTextInput
              placeholder="Нууц үгээ дахин оруулна уу!"
              value={password1}
              onChangeText={setPassword1}
              secureTextEntry={true}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: 20,
              }}
            >
              <CheckBox
                center
                checkedIcon={
                  <Fontisto
                    name="checkbox-active"
                    // type="material"
                    color="#4682B4"
                    size={18}
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                uncheckedIcon={
                  <Fontisto
                    name="checkbox-passive"
                    // type="material"
                    color="grey"
                    size={18}
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                checked={isEmployer}
                onPress={() => setIsEmployer(!isEmployer)}
              />
              {isEmployer === false ? (
                <Text style={styles.checkBoxText}> Ажил олгогч </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    right: 20,
                    top: 15,
                    color: "#4682B4",
                  }}
                >
                  {" "}
                  Ажил олгогч{" "}
                </Text>
              )}
              <CheckBox
                center
                checkedIcon={
                  <Fontisto
                    name="checkbox-active"
                    // type="material"
                    color="#4682B4"
                    size={18}
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                uncheckedIcon={
                  <Fontisto
                    name="checkbox-passive"
                    // type="material"
                    color="grey"
                    size={18}
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                checked={isEmployee}
                onPress={() => setIsEmployee(!isEmployee)}
              />
              {isEmployee === false ? (
                <Text style={styles.checkBoxText}> Ажил хайгч </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    right: 20,
                    top: 15,
                    color: "#4682B4",
                  }}
                >
                  {" "}
                  Ажил хайгч{" "}
                </Text>
              )}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={signUpHandler}>
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
                  Бүртгүүлэх
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
              Нэвтрэх бол{" "}
              <Text
                style={{ color: "#4682B4" }}
                onPress={() => navigation.navigate("CompanyLoginScreen")}
              >
                энд дар
              </Text>{" "}
            </Text>
          </View>
        </View>
        <Overlay isVisible={visible} style={{ paddingHorizontal: 100 }}>
          <View style={{ padding: 10 }}>
            <Text style={styles.textPrimary}> Бүртгэл амжиллтай үүслээ!</Text>
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
            <Text style={{ textAlign: "center", fontSize: 20 }}>👏👏👏</Text>
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

export default CompanyRegisterScreen;

const styles = StyleSheet.create({
  inputHeadText: {
    fontSize: 15,
    paddingLeft: 35,
    paddingTop: 10,
    paddingBottom: 5,
    color: "#4682B4",
    fontWeight: "600",
  },
  checkBoxText: {
    fontSize: 15,
    fontWeight: "500",
    right: 20,
    top: 15,
    color: "grey",
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
