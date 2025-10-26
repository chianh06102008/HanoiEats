import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Box, HStack, Text, VStack, Image } from "native-base";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";
import BoxContainer from "../../components/BoxContainer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { useDispatch } from "react-redux";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { onInputChange, signUpSchema } from "../../utils/forms";
import { firebaseDb } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

type Props = {} & NativeStackScreenProps<RootStackParams, "Auth"> & any;

type ISignUp = {
  phone: string;
  password: string;
  repassword: string;
};

const SignUp = (props: Props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<ISignUp>({
    phone: "",
    password: "",
    repassword: "",
  });
  const [error, setError] = useState<string>("");

  const handleLoginScreen = () => {
    navigation.navigate("Login");
  };

  const handleSignUp = async () => {
    setError("");
    dispatch(setLoading());
    try {
      await signUpSchema.validate(formData);
      if (formData.password !== formData.repassword) {
        throw new Error("Nhập lại mật khẩu chưa đúng");
      }
      const docRef = doc(firebaseDb, "users", formData.phone);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        throw new Error("Số điện thoại đã tồn tại");
      }
      // chuyển sang bước PostAuth (OTP/điền hồ sơ…)
      navigation.navigate("PostAuth", {
        phone: formData.phone,
        password: formData.password,
      });
    } catch (err: any) {
      setError(err?.message || "Có lỗi xảy ra, vui lòng thử lại");
      console.log("SignUp error:", err);
    } finally {
      dispatch(removeLoading());
    }
  };

  return (
    <BoxContainer justifyContent="center" alignItems="center" px={6}>
      {/* LOGO */}
      <VStack flex={1} justifyContent="center" alignItems="center" space={8}>
        <Image
          source={require("../../../assets/logo.png")}
          alt="HanoiEats Logo"
          resizeMode="contain"
          style={{ width: 280, height: 280 }}
        />

        {/* FORM */}
        <VStack w="100%" space={4}>
          <InputLabel
            label="Số điện thoại"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChangeText={onInputChange("phone", setFormData, formData)}
          />
          <InputLabel
            label="Mật khẩu"
            placeholder="Mật khẩu"
            showIcon
            secureTextEntry
            value={formData.password}
            onChangeText={onInputChange("password", setFormData, formData)}
          />
          <InputLabel
            label="Nhập lại mật khẩu"
            placeholder="Nhập lại mật khẩu"
            showIcon
            secureTextEntry
            value={formData.repassword}
            onChangeText={onInputChange("repassword", setFormData, formData)}
          />

          {!!error && (
            <Text fontSize={12} color="error.500">
              {error}
            </Text>
          )}

          <Box mt={4}>
            <CustomButton btnText="Đăng ký" handleBtn={handleSignUp} />
          </Box>
        </VStack>
      </VStack>

      {/* FOOTER */}
      <HStack mb={16} space={1}>
        <Text fontWeight={400}>Bạn đã có tài khoản?</Text>
        <TouchableOpacity onPress={handleLoginScreen}>
          <Text
            fontWeight={500}
            fontSize={12}
            color="primary.600"
            textDecorationLine="underline"
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </HStack>
    </BoxContainer>
  );
};

export default SignUp;
