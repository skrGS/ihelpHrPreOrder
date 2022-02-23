import { NavigationContainer } from "@react-navigation/native";
import MyStackNavigation from "./src/MyNavigation/MyStackNavigation";
import React from "react";
import registerNNPushToken from "native-notify";
export default function App() {
  registerNNPushToken(2169, "IiWO7OrXIrjkdTMbB51JcR");
  return (
    <NavigationContainer>
      <MyStackNavigation />
    </NavigationContainer>
  );
}
