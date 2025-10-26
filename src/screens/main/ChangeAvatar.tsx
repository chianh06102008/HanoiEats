import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Center, VStack } from "native-base";
import Header from "../../components/Header";
import { Image } from "expo-image";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import * as ImagePicker from "expo-image-picker";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Camera } from "iconsax-react-native";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import CustomButton from "../../components/CustomButton";
import { setUser } from "../../store/user.reducer";
import { uploadAvatarRaw } from "../../utils/cloudinary";

// giữ Props như cũ
type Props = {} & NativeStackScreenProps<RootStackParams, "ChangeAvatar">;

type PickedAsset = {
  uri: string;
  mimeType?: string | null;
  fileName?: string | null;
};

const ChangeAvatar = (props: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.user);
  const [picked, setPicked] = useState<PickedAsset | null>(null);
  const { navigation } = props;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      // KHÔNG nén: bỏ quality hoặc để 1.0
      quality: 1,
    });
    if (!result.canceled) {
      dispatch(setLoading());
      const a: any = result.assets[0];
      setPicked({ uri: a.uri, mimeType: a.mimeType, fileName: a.fileName });
      dispatch(removeLoading());
    }
  };

  const updateAvatar = async () => {
    if (!user?.phone) return;
    if (!picked?.uri) return;
    dispatch(setLoading());
    try {
      // Upload thẳng Cloudinary
      const mime = picked.mimeType || "image/jpeg"; // fallback an toàn
      const { url, publicId } = await uploadAvatarRaw(
        picked.uri,
        mime,
        `avatars/${user.phone}`
      );

      const newUser: any = {
        ...user,
        avatarUrl: url,
        avatarName: publicId,
        cloudinaryPublicId: publicId,
        cloudinaryRawUrl: url,
      };
      await updateDoc(doc(firebaseDb, "users", user.phone), newUser);
      await dispatch(setUser(newUser));
      navigation.goBack();
    } catch (e) {
      console.error(e); // nếu lỗi, xem log trả về từ Cloudinary (đã .text())
    } finally {
      dispatch(removeLoading());
    }
  };

  const previewUri =
    picked?.uri ||
    user?.avatarUrl ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgc2u0F9JdscSSIM4LH0ca2FLNgVS-vat7LSZKFb73azHEfhVfW7vwnFaq5bidMl1_tsg&usqp=CAU";

  return (
    <Box flex={1} bgColor={"#fff"}>
      <Header.BasicHeader
        title="Xem trước ảnh đại diện"
        handleBtnBack={() => navigation.goBack()}
      />
      <VStack justifyContent={"space-between"} flex={1} p={12}>
        <Center flex={1}>
          <Box position={"relative"}>
            <Image
              source={{ uri: previewUri }}
              style={{ width: 256, height: 256, borderRadius: 500 }}
            />
          </Box>
          <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
            <Camera size="20" color="#1C1B1F" />
          </TouchableOpacity>
        </Center>
        <CustomButton btnText="Lưu" handleBtn={updateAvatar} />
      </VStack>
    </Box>
  );
};

export default ChangeAvatar;

const styles = StyleSheet.create({
  cameraBtn: {
    backgroundColor: "#D9D9D9",
    borderRadius: 40,
    padding: 8,
    bottom: 0,
    marginTop: -12,
  },
});
