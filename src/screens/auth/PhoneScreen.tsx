import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { Box, Center, Text, VStack } from "native-base";
import Header from "../../components/Header";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";
import BoxContainer from "../../components/BoxContainer";

type Props = {};

const PhoneScreen = (props: Props) => {
  const handleBtnBack = () => {};
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <BoxContainer>
        <Header.BasicHeader
          title="Quên mật khẩu"
          handleBtnBack={handleBtnBack}
        />
        <VStack flex={1} px={6} justifyContent={"space-between"}>
          <Box>
            <Center mt={4} mb={20}>
              <Text color="text.400">
                Nhập số điện thoại để khôi phục mật khẩu
              </Text>
            </Center>
            <InputLabel
              label="Số điện thoại"
              placeholder="Nhập số điện thoại/Email"
            />
          </Box>
          <Box pb={8}>
            <CustomButton btnText="Đặt lại mật khẩu" />
          </Box>
        </VStack>
      </BoxContainer>
    </TouchableWithoutFeedback>
  );
};

export default PhoneScreen;

const styles = StyleSheet.create({});
