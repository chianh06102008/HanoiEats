import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ErrorOverlay from "../components/ErrorOverlay";
import LoadingOverlay from "../components/LoadingOverlay";
import { RootStackParams } from "./config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, useTheme } from "native-base";
import { StatusBar } from "expo-status-bar";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import AuthStack from "./AuthStack";
import TabNav from "./TabNav";
import Policy from "../screens/main/Policy";
import NewPassword from "../screens/main/NewPassword";
import CommentForm from "../screens/main/CommentForm";
import Restaurant from "../screens/main/Restaurant";
import * as Location from "expo-location";
import { removeLoading, setLoading } from "../store/loading.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseDb } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "../store/user.reducer";
import { IUserProfile } from "../type/user";
import { setError } from "../store/error.reducer";
import { setLocation } from "../store/location.reducer";
import UserInfo from "../screens/main/UserInfo";
import ChangePassword from "../screens/main/ChangePassword";
import ChangeAvatar from "../screens/main/ChangeAvatar";
import Onboarding from "../screens/auth/Onboarding";

const Stack = createNativeStackNavigator<RootStackParams>();

const Root = () => {
  const user = useAppSelector((state: RootState) => state.user.user);

  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          dispatch(
            setError({
              title: "Lỗi hệ thống",
              message: "Permission to access location was denied",
            })
          );
          return;
        }
        const loc: any = await Location.getCurrentPositionAsync({});
        dispatch(
          setLocation({ lat: loc.coords.latitude, lng: loc.coords.longitude })
        );
      } catch {}
    })();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading());
      const phone = await AsyncStorage.getItem("phone");
      if (phone) {
        const docRef = doc(firebaseDb, "users", phone);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const userProfile = { ...data };
          await AsyncStorage.setItem("phone", phone);
          dispatch(setUser(userProfile as IUserProfile));
        }
      }
      dispatch(removeLoading());
    };
    fetchUser();
  }, []);

  return (
    <Box
      style={{
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: colors.primary[600],
        flex: 1,
      }}
    >
      <StatusBar style="light" />
      <LoadingOverlay />
      <ErrorOverlay />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Onboarding" // ✅ luôn bắt đầu bằng Onboarding
        >
          {!user ? (
            // Chưa đăng nhập: luôn cho thấy Onboarding + Auth flow
            <>
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Auth" component={AuthStack} />
            </>
          ) : (
            // Đã đăng nhập: toàn bộ main flow
            <Stack.Group>
              <Stack.Screen name="TabNav" component={TabNav} />
              <Stack.Screen name="Password" component={ChangePassword} />
              <Stack.Screen name="ChangeAvatar" component={ChangeAvatar} />
              <Stack.Screen name="Policy" component={Policy} />
              <Stack.Screen name="UserInfo" component={UserInfo} />
              <Stack.Screen name="NewPassword" component={NewPassword} />
              <Stack.Screen name="CommentForm" component={CommentForm} />
              <Stack.Screen name="Restaurant" component={Restaurant} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  );
};

export default Root;

const styles = StyleSheet.create({});
