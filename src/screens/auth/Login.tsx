import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Alert, Box, HStack, Text, VStack } from "native-base";
import InputLabel from "../../components/InputLabel";
import CustomButton from "../../components/CustomButton";
import BoxContainer from "../../components/BoxContainer";
import { useDispatch } from "react-redux";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { setUser } from "../../store/user.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUserProfile } from "../../type/user";
import { Image } from "native-base";

type Props = {} & NativeStackScreenProps<RootStackParams, "Auth"> & any;

const Login = (props: Props) => {
  const { navigation } = props;
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    navigation.navigate("SignUp");
  };

  const handleLogIn = async () => {
    dispatch(setLoading());
    try {
      const docRef = doc(firebaseDb, "users", phone);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.password !== password) {
          Alert("Wrong password");
        } else {
          const userProfile = {
            ...data,
          };
          await AsyncStorage.setItem("phone", phone);
          dispatch(setUser(userProfile as IUserProfile));
        }
      } else {
        setError("Phone number not registered");
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(removeLoading());
    }
  };
  return (
    <BoxContainer justifyContent={"center"} alignItems={"center"} px={6}>
      {/* Logo */}
      <VStack flex={1} justifyContent={"center"} space={2} alignItems="center">
        <Image
          source={require("../../../assets/logo.png")} // đường dẫn tuỳ thuộc cấu trúc dự án
          alt="HanoiEats Logo"
          resizeMode="contain"
          style={{ width: 280, height: 280 }}
        />

        {/* Form login */}
        <VStack w="100%" space={2}>
          <InputLabel
            label="Phone number"
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
          />
          <InputLabel
            label="Password"
            placeholder="Enter password"
            secureTextEntry={true}
            showIcon={true}
            value={password}
            onChangeText={setPassword}
          />

          <HStack justifyContent={"space-between"} mb={4}>
            <Box>
              {error && (
                <Text fontSize={12} fontWeight={400} color="error.500">
                  {error}
                </Text>
              )}
            </Box>
          </HStack>

          <Box>
            <CustomButton btnText={"Login"} handleBtn={handleLogIn} />
          </Box>
        </VStack>
      </VStack>

      {/* Footer */}
      <HStack mb={16} space={1}>
        <Text fontWeight={400} fontSize={14}>
          You don't have an account?
        </Text>
        <TouchableOpacity onPress={onSignUp}>
          <Text
            fontWeight={400}
            fontSize={14}
            color={"primary.600"}
            textDecorationLine={"underline"}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </HStack>
    </BoxContainer>
  );
};

export default Login;
