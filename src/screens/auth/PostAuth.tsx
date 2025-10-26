import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Text, VStack } from "native-base";
import BoxContainer from "../../components/BoxContainer";
import Header from "../../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams, RootStackParams } from "../../navigations/config";
import { useAppDispatch } from "../../store";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { fillProfileSchema, onInputChange } from "../../utils/forms";
import { doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { setUser } from "../../store/user.reducer";
import CustomButton from "../../components/CustomButton";
import InputLabel from "../../components/InputLabel";
import FormDatePicker from "../../components/FormDatePicker";
import { EGender } from "../../type/user";
import PickGender from "../../components/PickGender";

type Props = {} & NativeStackScreenProps<
  AuthStackParams & RootStackParams,
  "PostAuth"
>;

type IProfileForm = {
  fullname: string;
  birthday: Date;
  gender: EGender;
};

const PostAuth = (props: Props) => {
  const { navigation, route } = props;
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<IProfileForm>({
    fullname: "",
    birthday: new Date(),
    gender: EGender.M,
  });

  const handleSignUp = async () => {
    const { password, phone } = route.params!;
    dispatch(setLoading());
    try {
      await fillProfileSchema.validate(formData);
      const newDoc = doc(firebaseDb, "users", phone);
      const docData = {
        phone,
        password,
        ...formData,
        birthday: formData.birthday.toISOString(),
        bookmark: [],
      };
      await setDoc(newDoc, docData);
      dispatch(setUser(docData));
    } catch (err) {
      console.log("Lỗi hệ thống");
    } finally {
      dispatch(removeLoading());
    }
  };
  return (
    <BoxContainer>
      <Header.BasicHeader title="Nhập thông tin" />
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
        />
        <FormDatePicker
          value={formData.birthday}
          onChange={onInputChange<IProfileForm>(
            "birthday",
            setFormData,
            formData
          )}
        />
        <PickGender
          gender={formData.gender}
          setGender={onInputChange<IProfileForm>(
            "gender",
            setFormData,
            formData
          )}
        />
      </VStack>
      <Box mb={10} px={6}>
        <CustomButton btnText="Lưu" handleBtn={handleSignUp} />
      </Box>
    </BoxContainer>
  );
};

export default PostAuth;

const styles = StyleSheet.create({});
