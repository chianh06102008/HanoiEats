import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Box, VStack } from "native-base";
import Header from "../../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import InputLabel from "../../components/InputLabel";
import { RootState, useAppSelector } from "../../store";
import { EGender } from "../../type/user";
import PickGender from "../../components/PickGender";
import { onInputChange } from "../../utils/forms";
import CustomButton from "../../components/CustomButton";

type Props = {} & NativeStackScreenProps<RootStackParams, "UserInfo">;

type IProfileForm = {
  fullname: string;
  birthday: string;
  gender: EGender;
};

const UserInfo = (props: Props) => {
  const { navigation } = props;
  const user = useAppSelector((state: RootState) => state.user.user);

  const [formData, setFormData] = useState<IProfileForm>({
    fullname: user?.fullname!,
    birthday: user?.birthday!,
    gender: EGender.M,
  });

  const handleUpdate = () => {};
  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader
        title="Thông tin cá nhân"
        handleBtnBack={() => navigation.goBack()}
      />
      <VStack flex={1} space={4} mt={8} px={4}>
        <InputLabel
          label="Họ tên"
          placeholder="Nhập tên"
          value={formData.fullname}
          onChangeText={onInputChange<IProfileForm>(
            "fullname",
            setFormData,
            formData
          )}
          borderWidth={1}
          editable={false}
        />
        <InputLabel
          label="Ngày sinh"
          placeholder="Nhập ngày sinh"
          borderWidth={1}
          value={formData.birthday.slice(0, 10)}
          editable={false}
        />
        <PickGender
          gender={formData.gender}
          setGender={onInputChange<IProfileForm>(
            "gender",
            setFormData,
            formData
          )}
          disabled={true}
        />
      </VStack>
      <Box mb={10} px={6}>
        <CustomButton btnText="Lưu" handleBtn={handleUpdate} />
      </Box>
    </Box>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  
});
