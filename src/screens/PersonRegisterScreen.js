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
import { Button, Overlay, Icon, CheckBox } from "react-native-elements";
import { Fontisto } from "@expo/vector-icons";

const PersonRegisterScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const [isEmployee, setIsEmployee] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const [lastName, setLastName] = useState("Азжаргал12");
  const [firstName, setFirstName] = useState("Цэлмэн12");
  const [email, setEmail] = useState("tseurmendsda@gmail.com");
  const [phone, setPhone] = useState("45454545");
  const [password, setPassword] = useState("123456");
  const [password1, setPassword1] = useState("123456");
  const [data, setData] = useState([]);
  const [point] = useState(10);
  const signUpHandler = () => {
    if (password !== password1) {
      Alert.alert("Нууц үгнүүд хоорондоо таарахгүй байна!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Нууц үг хамгийн багадаа 6 оронтой байна");
      return;
    }
    if (lastName.length === 0) {
      Alert.alert("Та овогоо бичнэ үү");
      return;
    }
    if (firstName.length === 0) {
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
      .post(`${api}/cvs`, {
        phone: phone,
        email: email,
        firstName: firstName,
        lastName: lastName,
        point: point,
        isEmployee: isEmployee,
        isEmployer: isEmployer,
        password: password,
        role: "user",
      })
      .then((result) => {
        console.log(result.data.data);
        setData(result.data.data);
        setVisible(!visible);
      })
      .catch((err) => {
        console.log(err.message);
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
          source={require("../../assets/ihelp/personhead.png")}
          style={{ flex: 1, height: 220 }}
          resizeMode="cover"
        >
          <Image
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
                color: "#765097",
              }}
            >
              Person
            </Text>
          </View>
        </ImageBackground>

        <View style={{ bottom: 11, flex: 1 }}>
          <View>
            <Text style={styles.inputHeadText}>Овог:</Text>
            <MyTextInput
              placeholder="Овог оруулна уу!"
              value={lastName}
              onChangeText={setLastName}
            />
            <Text style={styles.inputHeadText}>Нэр:</Text>
            <MyTextInput
              placeholder="Өөрийн нэрээ оруулна уу!"
              value={firstName}
              onChangeText={setFirstName}
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
                    color="#765097"
                    size={18}
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                uncheckedIcon={
                  <Fontisto
                    name="checkbox-passive"
                    color="grey"
                    size={18}
                    iconStyle={{ marginRight: 10 }}
                  />
                }
                checked={isEmployer}
                onPress={() => setIsEmployer(!isEmployer)}
              />
              {isEmployer === false ? (
                <Text style={styles.checkBoxText}> Ажил олгогч</Text>
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    right: 20,
                    top: 15,
                    color: "#765097",
                  }}
                >
                  {" "}
                  Ажил олгогч
                </Text>
              )}
              <CheckBox
                center
                checkedIcon={
                  <Fontisto
                    name="checkbox-active"
                    // type="material"
                    color="#765097"
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
                <Text style={styles.checkBoxText}> Ажил хайгч</Text>
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    right: 20,
                    top: 15,
                    color: "#765097",
                  }}
                >
                  {" "}
                  Ажил хайгч
                </Text>
              )}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1, bottom: 20 }}
              onPress={signUpHandler}
            >
              <ImageBackground
                source={require("../../assets/ihelp/personbutton.png")}
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
                top: 80,
                alignSelf: "center",
              }}
            >
              Нэвтрэх бол{" "}
              <Text
                style={{ color: "#765097" }}
                onPress={() => navigation.navigate("PersonLoginScreen")}
              >
                энд дар
              </Text>{" "}
            </Text>
          </View>
        </View>
        <Overlay isVisible={visible} style={{ paddingHorizontal: 100 }}>
          <View style={{ padding: 10 }}>
            <Text style={styles.textPrimary}>Бүртгэл амжилттай үүслээ!</Text>
            <Text style={styles.textSecondary}>
              Овог нэр:{" "}
              <Text style={{ color: "black", fontWeight: "500" }}>
                {data.lastName} {data.firstName}
              </Text>
            </Text>
            <Text style={styles.textSecondary}>
              Утасны дугаар:
              <Text style={{ color: "black", fontWeight: "500" }}>
                {" "}
                {data.phone}
              </Text>{" "}
            </Text>

            <Text style={styles.textSecondary}>
              И-мэйл хаяг:{" "}
              <Text style={{ color: "black", fontWeight: "500" }}>
                {data.email}
              </Text>{" "}
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
              style={{ paddingVertical: 20 }}
            />
          </View>
        </Overlay>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PersonRegisterScreen;

const styles = StyleSheet.create({
  inputHeadText: {
    fontSize: 15,
    paddingLeft: 35,
    paddingTop: 10,
    paddingBottom: 5,
    color: "#765097",
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
