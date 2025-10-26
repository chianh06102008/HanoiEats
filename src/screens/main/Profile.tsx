// src/screens/main/Profile.tsx
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useCallback } from "react";
import { Avatar, Box, HStack, Text, VStack, useTheme } from "native-base";
import {
  ArrowRight2,
  InfoCircle,
  Lock,
  MessageQuestion,
} from "iconsax-react-native";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { removeUser } from "../../store/user.reducer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { useNavigation } from "@react-navigation/native";
import { setLoading, removeLoading } from "../../store/loading.reducer";

type Props = {} & NativeStackScreenProps<RootStackParams, "TabNav">;

const BoxInfo = ({ type }: { type: "Password" | "UserInfo" | "Policy" }) => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const map = {
    Password: {
      title: "Mật khẩu",
      icon: <Lock size="32" color={colors.coolGray[500]} variant="Bold" />,
    },
    UserInfo: {
      title: "Thông tin",
      icon: (
        <InfoCircle size="32" color={colors.coolGray[500]} variant="Bold" />
      ),
    },
    Policy: {
      title: "Chính sách bảo mật",
      icon: (
        <MessageQuestion
          size="32"
          color={colors.coolGray[500]}
          variant="Bold"
        />
      ),
    },
  } as const;

  return (
    <TouchableOpacity onPress={() => navigation.navigate(type)}>
      <HStack alignItems="center" justifyContent="space-between">
        <HStack space={3} alignItems="center" py={4}>
          {map[type].icon}
          <Text fontWeight={400} fontSize={16} color="coolGray.800">
            {map[type].title}
          </Text>
        </HStack>
        <ArrowRight2 size="24" color={colors.coolGray[300]} />
      </HStack>
    </TouchableOpacity>
  );
};

const Profile = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();

  const items: Array<"UserInfo" | "Policy"> = ["UserInfo", "Policy"];
  // Nếu muốn bật trang đổi mật khẩu sau: thêm "Password" vào mảng items.

  const handleAvatar = () => navigation.navigate("ChangeAvatar");

  const performLogout = useCallback(async () => {
    try {
      dispatch(setLoading());
      // Xoá đúng key đăng nhập, tránh clear toàn bộ storage app
      await AsyncStorage.multiRemove(["phone"]);
      // Xoá redux user
      dispatch(removeUser());
      // Reset điều hướng về Onboarding (vì app luôn bắt đầu bằng Onboarding)
      navigation.reset({
        index: 0,
        routes: [{ name: "Onboarding" }],
      });
    } catch (e) {
      // optional: có thể show toast lỗi
      console.log("logout error:", e);
    } finally {
      dispatch(removeLoading());
    }
  }, [dispatch, navigation]);

  const handleLogout = useCallback(() => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất khỏi HanoiEats?",
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Đăng xuất",
          style: "destructive",
          onPress: performLogout,
        },
      ]
    );
  }, [performLogout]);

  return (
    <Box flex={1} bgColor="#fff">
      <Header.BasicHeader title="Cá nhân" />
      <VStack flex={1} px={4} py={6} justifyContent="space-between">
        <VStack space={4}>
          {/* Avatar row */}
          <TouchableOpacity onPress={handleAvatar}>
            <Box p={3} borderRadius={16} bgColor="coolGray.100">
              <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center" space={4}>
                  <Avatar
                    size="12"
                    source={{
                      uri:
                        user?.avatarUrl ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgc2u0F9JdscSSIM4LH0ca2FLNgVS-vat7LSZKFb73azHEfhVfW7vwnFaq5bidMl1_tsg&usqp=CAU",
                    }}
                  />
                  <VStack>
                    <Text fontWeight={600} fontSize={16}>
                      {user?.fullname || "Người dùng"}
                    </Text>
                    <Text fontWeight={400} fontSize={12} color="coolGray.500">
                      {user?.phone}
                    </Text>
                    <Text
                      mt={1}
                      fontWeight={400}
                      fontSize={14}
                      color="coolGray.800"
                    >
                      Đổi hình đại diện
                    </Text>
                  </VStack>
                </HStack>
                <ArrowRight2 size="24" color={colors.coolGray[300]} />
              </HStack>
            </Box>
          </TouchableOpacity>

          {/* Menu */}
          <Box px={4} borderRadius={16} bgColor="coolGray.100">
            {items.map((value, idx) => (
              <Box
                key={value}
                borderBottomWidth={idx < items.length - 1 ? 1 : 0}
                borderColor="coolGray.200"
              >
                <BoxInfo type={value} />
              </Box>
            ))}
          </Box>
        </VStack>

        {/* Logout */}
        <Box>
          <CustomButton btnText="Đăng xuất" handleBtn={handleLogout} />
        </Box>
      </VStack>
    </Box>
  );
};

export default Profile;

const styles = StyleSheet.create({});
