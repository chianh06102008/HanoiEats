import { StyleSheet, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Center,
  Input,
  TextArea,
  VStack,
  useTheme,
  KeyboardAvoidingView,
  ScrollView,
} from "native-base";
import Header from "../../components/Header";
import CustomButton from "../../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { Camera } from "iconsax-react-native";
import RatingGroup from "../../components/RatingGroup";
import { collection, doc, setDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { IComment } from "../../type/restaurant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// ❌ BỎ 2 import sau
// import { ensureSmallImage, uploadImage } from "../../utils/image";
// ✅ THÊM util Cloudinary
import { uploadAvatarRaw } from "../../utils/cloudinary";

type Props = {} & NativeStackScreenProps<RootStackParams, "CommentForm">;

const BUTTON_HEIGHT = 56;

type PickedAsset = {
  uri: string;
  mimeType?: string | null;
  fileName?: string | null;
};

const CommentForm = (props: Props) => {
  const { navigation, route } = props;
  const { id } = route.params;
  const user = useAppSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const handleBtnBack = () => navigation.goBack();

  const [rate, setRate] = useState({
    "Vị trí": 5,
    "Giá cả": 5,
    "Chất lượng": 5,
    "Dịch vụ": 5,
    "Không gian": 5,
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // ❌ image: string | null
  // const [image, setImage] = useState<string | null>(null);
  // ✅ lưu đủ asset
  const [picked, setPicked] = useState<PickedAsset | null>(null);

  const ratingOption = [
    "Vị trí",
    "Giá cả",
    "Chất lượng",
    "Dịch vụ",
    "Không gian",
  ];

  const getValueRating = (value: number, title: string) => {
    setRate((prev) => ({ ...prev, [title]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1, // không nén
    });
    if (!result.canceled) {
      dispatch(setLoading());
      const a: any = result.assets[0];
      setPicked({ uri: a.uri, mimeType: a.mimeType, fileName: a.fileName });
      dispatch(removeLoading());
    }
  };

  const submittingRef = useRef(false);
  useEffect(
    () => () => {
      submittingRef.current = false;
    },
    []
  );

  const handleAddComment = async () => {
    if (submittingRef.current) return;
    if (!user?.phone) return;
    if (!picked?.uri) return;

    submittingRef.current = true;
    dispatch(setLoading());
    try {
      const avgRating = Number(
        Object.values(rate)
          .reduce((t, cur) => t + cur / 5, 0)
          .toFixed(1)
      );

      // ✅ Upload trực tiếp Cloudinary (unsigned)
      const mime = picked.mimeType || "image/jpeg";
      const { url, publicId } = await uploadAvatarRaw(
        picked.uri,
        mime,
        `comments/${id}` // folder theo resId
      );

      const fullComment: IComment = {
        userId: user.phone!,
        resId: id,
        comment: {
          title,
          content,
          avgRating,
          imageUrl: url, // ✅ lưu url Cloudinary
          imageName: publicId, // ✅ lưu public_id để quản lý/xoá sau này
          timestamp: new Date(),
          vote: {},
        },
      };

      const commentDocRef = doc(collection(firebaseDb, "comments"));
      await setDoc(commentDocRef, { id: commentDocRef.id, ...fullComment });
      navigation.goBack();
    } catch (err) {
      console.log("upload/comment error:", err);
    } finally {
      submittingRef.current = false;
      dispatch(removeLoading());
    }
  };

  const disabledComment = !title || !content || !picked?.uri;

  return (
    <Box flex={1} bgColor="#fff">
      <Header.BasicHeader
        title="Viết bình luận"
        handleBtnBack={handleBtnBack}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          flex={1}
          px={4}
          pt={6}
          contentContainerStyle={{
            paddingBottom: BUTTON_HEIGHT + insets.bottom + 24,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <VStack space={4}>
            <Input
              p={3}
              fontSize={16}
              borderColor={colors.coolGray[300]}
              borderRadius={16}
              color={colors.coolGray[800]}
              placeholder="Tiêu đề"
              placeholderTextColor={colors.coolGray[400]}
              value={title}
              onChangeText={setTitle}
              returnKeyType="next"
              blurOnSubmit={false}
            />

            <TextArea
              borderRadius={16}
              p={4}
              fontSize={16}
              autoCompleteType={true}
              h={40}
              borderColor={colors.coolGray[300]}
              placeholder="Nội dung..."
              placeholderTextColor={colors.coolGray[400]}
              color={colors.coolGray[800]}
              w="100%"
              value={content}
              onChangeText={setContent}
            />

            <Center>
              <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
                <Camera size="20" color="#1C1B1F" />
              </TouchableOpacity>

              {picked?.uri && (
                <Box width="100%" overflow="hidden">
                  <Image
                    source={{ uri: picked.uri }}
                    contentFit="cover"
                    style={{ width: "100%", height: 200, borderRadius: 12 }}
                  />
                </Box>
              )}
            </Center>

            <VStack space={4}>
              {ratingOption.map((value) => (
                <RatingGroup
                  key={value}
                  title={value}
                  getValueRating={getValueRating}
                />
              ))}
            </VStack>
          </VStack>
        </ScrollView>

        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={0}
          px={4}
          pb={Math.max(insets.bottom, 8)}
          pt={8}
          bg="#fff"
          borderTopWidth={1}
          borderColor="coolGray.200"
        >
          <CustomButton
            btnText="Gửi"
            handleBtn={handleAddComment}
            disabled={disabledComment}
          />
        </Box>
      </KeyboardAvoidingView>
    </Box>
  );
};

export default CommentForm;

const styles = StyleSheet.create({
  cameraBtn: {
    backgroundColor: "#D9D9D9",
    borderRadius: 40,
    padding: 8,
    marginBottom: 12,
  },
});
