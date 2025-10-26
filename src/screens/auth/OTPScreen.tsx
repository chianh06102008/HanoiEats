import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  Text,
  VStack,
  useTheme,
} from "native-base";
import Header from "../../components/Header";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useDispatch } from "react-redux";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import BoxContainer from "../../components/BoxContainer";

type Props = {};

const OTPScreen = (props: Props) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [OTP, setOTP] = useState("");
  const handleBtnBack = () => {};

  async function verifyOTP() {
    try {
      dispatch(setLoading());
    } catch (err) {
      console.log(err);

      dispatch(removeLoading());
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <BoxContainer>
        <Header.BasicHeader
          title="Quên mật khẩu"
          handleBtnBack={handleBtnBack}
        />
        <VStack px={6} mt={24} alignItems={"center"}>
          <VStack alignItems={"center"}>
            <Text fontSize={16} fontWeight={400} color="coolGray.800">
              Mã xác thực OTP đã được gửi tới
            </Text>
            <Text fontSize={16} fontWeight={700} color="coolGray.800">
              SĐT 0345622***
            </Text>
          </VStack>
          <OTPInputView
            pinCount={4}
            style={{ height: 100, width: "60%" }}
            codeInputFieldStyle={styles.inputField}
            placeholderTextColor={colors.muted[300]}
            onCodeChanged={setOTP}
            onCodeFilled={verifyOTP}
          />
          <HStack space={1} marginTop={58}>
            <Text fontSize={16} fontWeight={400}>
              Gửi lại mã sau
            </Text>
            <Text fontSize={16} fontWeight={500}>
              00:59
            </Text>
          </HStack>
        </VStack>
      </BoxContainer>
    </TouchableWithoutFeedback>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 30,
    height: 65,
    fontWeight: "400",
  },
});
