import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import Root from "./src/navigations/Root";
import * as SplashScreen from "expo-splash-screen";
import store from "./src/store";
import { useEffect } from "react";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import appTheme from "./src/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DevSeedScreen from "./src/screens/dev/DevSeedScreen";

SplashScreen.preventAutoHideAsync();
export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={appTheme}>
        <Provider store={store}>
          <Root />
          {/* <DevSeedScreen /> */}
        </Provider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
