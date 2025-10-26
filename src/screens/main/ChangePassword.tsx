import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, VStack } from "native-base";
import Header from "../../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";

type Props = {} & NativeStackScreenProps<RootStackParams, "Password">;

const ChangePassword = (props: Props) => {
  const { navigation } = props;

  const handleUpdate = () => {};
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader
        title="Thông tin cá nhân"
        handleBtnBack={() => navigation.goBack()}
      />
      <VStack flex={1} space={4} mt={8} px={4}>
        <InputLabel
          label="Mật khẩu cũ"
          placeholder="Nhập lại mật khẩu cũ"
          showIcon={true}
          secureTextEntry={true}
          borderWidth={1}
        />
        <InputLabel
          label="Mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới"
          showIcon={true}
          secureTextEntry={true}
          borderWidth={1}
        />
        <InputLabel
          label="Nhập lại mật khẩu"
          placeholder="Nhập lại mật khẩu"
          showIcon={true}
          borderWidth={1}
          secureTextEntry={true}
        />
      </VStack>
      <Box mb={10} px={6}>
        <CustomButton btnText="Lưu" handleBtn={handleUpdate} />
      </Box>
    </Box>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
