import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import { AuthStackParams } from "./config";
import PhoneScreen from "../screens/auth/PhoneScreen";
import OTPScreen from "../screens/auth/OTPScreen";
import ForgotPassword from "../screens/auth/ForgotPassword";
import PostAuth from "../screens/auth/PostAuth";

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="PostAuth" component={PostAuth} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
