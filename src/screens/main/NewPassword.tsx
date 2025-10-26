import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { Box, VStack } from "native-base";
import Header from "../../components/Header";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";


type Props = {};

const NewPassword = (props: Props) => {
  const handleBtnBack = () => {};
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Box flex={1} bgColor={"#fff"}>
        <Header.BasicHeader
          title="Đặt lại mật khẩu"
          handleBtnBack={handleBtnBack}
        />
        <VStack
          flex={1}
          px={6}
          marginTop={120}
          justifyContent={"space-between"}
        >
          <VStack space={4}>
            <InputLabel
              label="Mật khẩu cũ"
              placeholder="Mật khẩu cũ"
              showIcon={true}
              secureTextEntry
              borderWidth={1}
            />
            <InputLabel
              label="Mật khẩu mới"
              placeholder="Mật khẩu mới"
              showIcon={true}
              secureTextEntry
              borderWidth={1}
            />
            <InputLabel
              label="Nhập lại mật khẩu"
              placeholder="Nhập lại mật khẩu"
              showIcon={true}
              secureTextEntry
              borderWidth={1}
            />
          </VStack>
          <Box pb={8}>
            <CustomButton btnText="Lưu" />
          </Box>
        </VStack>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default NewPassword;

const styles = StyleSheet.create({});
