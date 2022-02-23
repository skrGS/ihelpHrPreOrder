import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PersonLoginScreen from "../screens/PersonLoginScreen";
import PersonRegisterScreen from "../screens/PersonRegisterScreen";
import CompanyRegisterScreen from "../screens/CompanyRegisterScreen";
import CompanyLoginScreen from "../screens/CompanyLoginScreen";

const Stack = createNativeStackNavigator();

const MyStackNavigation = () => {
  // const state = useContext()
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PersonLoginScreen"
          component={PersonLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PersonRegisterScreen"
          component={PersonRegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompanyRegisterScreen"
          component={CompanyRegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CompanyLoginScreen"
          component={CompanyLoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MyStackNavigation;
