import { StyleSheet, TouchableOpacity, Image as RNImage } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
  useTheme,
  Image, // native-base Image (dễ style), nếu muốn RNImage thì dùng RNImage
  Pressable,
} from "native-base";
import {
  Bag2,
  DollarCircle,
  Gps,
  Location,
  Messages3,
} from "iconsax-react-native";
import BackgroundLayout from "../../components/BackgroundLayout";
import RestaurantComment from "../../components/RestaurantComment";
import Header from "../../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { IComment, IMenuItem, IRestaurant } from "../../type/restaurant";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import {
  formatNumberToCurrency,
  getStatus,
  haversineDistance,
} from "../../utils/utils";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { setUser } from "../../store/user.reducer";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
// nếu bạn có Category enum utils thì giữ, còn không phần Bag2 vẫn render như cũ
import { selectCategory } from "../../data/utils";

type Props = {} & NativeStackScreenProps<RootStackParams, "Restaurant">;
const INITIAL_MENU_COUNT = 2; // số món hiển thị mặc định

const Restaurant = (props: Props) => {
  const { navigation, route } = props;
  const { id } = route.params;
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const [menuExpanded, setMenuExpanded] = useState(false);
  const [listComment, setListComment] = useState<IComment[]>([]);
  const [isNotCommented, setIsNotCommented] = useState<boolean | null>(null);
  const [rating, setRating] = useState(0);
  const user = useAppSelector((state: RootState) => state.user.user);
  const location = useAppSelector(
    (state: RootState) => state.location.location
  );
  const isBookmarkRes = user?.bookmark.includes(id);
  const isFocused = useIsFocused();

  const [res, setRes] = useState<IRestaurant | any>();
  const [textLen, setTextLen] = useState(10);

  // ======= MENU STATE (NEW) =======
  const menu: IMenuItem[] = useMemo(() => res?.menu ?? [], [res?.menu]);
  const menuCats = useMemo(() => {
    const set = new Set<string>();
    (menu || []).forEach((m) => m.category && set.add(m.category));
    return ["all", ...Array.from(set)];
  }, [menu]);
  const [activeMenuCat, setActiveMenuCat] = useState<string>("all");

  const filteredMenu = useMemo(() => {
    if (activeMenuCat === "all") return menu;
    return (menu || []).filter((m) => m.category === activeMenuCat);
  }, [menu, activeMenuCat]);

  const distanceUser = haversineDistance(
    res?.lat || 0,
    res?.lng || 0,
    location?.lat!,
    location?.lng!
  );

  const handleBookmarkRes = async () => {
    dispatch(setLoading());
    try {
      if (user) {
        let newFavourite;
        if (isBookmarkRes) {
          newFavourite = user.bookmark.filter((resId: string) => resId !== id);
        } else {
          newFavourite = [...user.bookmark, id];
        }
        const newUser = { ...user, bookmark: newFavourite };
        dispatch(setUser(newUser));
        await updateDoc(doc(firebaseDb, "users", user.phone), newUser);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(removeLoading());
    }
  };

  // danh sách hiển thị (có/không mở rộng)
  const visibleMenu = useMemo(
    () =>
      menuExpanded ? filteredMenu : filteredMenu.slice(0, INITIAL_MENU_COUNT),
    [filteredMenu, menuExpanded]
  );

  const remaining = Math.max(filteredMenu.length - INITIAL_MENU_COUNT, 0);

  useEffect(() => {
    const fetchComment = async () => {
      const q = query(
        collection(firebaseDb, "comments"),
        where("resId", "==", id)
      );
      const commentSnapShot = await getDocs(q);
      const comments: IComment[] = [];
      commentSnapShot.forEach((doc) => {
        comments.push(doc.data() as any);
      });
      const check = comments.filter((cmt) => cmt.userId == user?.phone);
      setIsNotCommented(!Boolean(check.length));
      setListComment(comments);

      const averageRating =
        comments.reduce((total, curComment) => {
          return total + curComment.comment.avgRating;
        }, 0) / comments.length;
      setRating(averageRating || 0);
    };

    const getInfoRestaurant = async () => {
      try {
        dispatch(setLoading());
        const resRef = doc(firebaseDb, "restaurants-2", id);
        const resSnap = await getDoc(resRef);
        setRes(resSnap.data() as IRestaurant);
        setTextLen(resSnap.data()!.name.length);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(removeLoading());
      }
    };
    getInfoRestaurant();
    fetchComment();
  }, [isFocused]);

  useEffect(() => {
    setMenuExpanded(false);
  }, [activeMenuCat]);

  return (
    <Box flex={1} bgColor={"#fff"}>
      {/* Header + Cover */}
      <Box height="240">
        <BackgroundLayout
          imageSource={{
            uri: res && res.image,
          }}
        >
          <VStack flex={1} justifyContent={"space-between"}>
            <Header.BasicHeader
              bgColor="transparent"
              title=""
              handleBtnBack={() => navigation.goBack()}
            />
          </VStack>
        </BackgroundLayout>
      </Box>

      {/* Info block */}
      <Box
        px={4}
        pt={4}
        pb={3}
        borderBottomWidth={1}
        borderColor="coolGray.200"
        bg="#fff"
      >
        {/* hàng 1: tên + trạng thái + giờ mở cửa */}
        <HStack alignItems="center" justifyContent="space-between" mb={2}>
          <VStack flex={1} pr={3}>
            <Text
              fontSize={18}
              fontWeight={800}
              color="#0F172A"
              numberOfLines={1}
            >
              {res?.name}
            </Text>
            <Text fontSize={12} color="coolGray.500" mt={0.5}>
              {res?.address}
            </Text>
          </VStack>

          {/* trạng thái mở/đóng */}
          <Box
            px={3}
            py={1}
            borderRadius="full"
            bg={
              getStatus(res?.time?.open, res?.time?.close) === "Closed"
                ? "red.50"
                : "emerald.50"
            }
            borderWidth={1}
            borderColor={
              getStatus(res?.time?.open, res?.time?.close) === "Closed"
                ? "red.200"
                : "emerald.200"
            }
          >
            <Text
              fontSize={12}
              fontWeight={700}
              color={
                getStatus(res?.time?.open, res?.time?.close) === "Closed"
                  ? "red.600"
                  : "emerald.700"
              }
            >
              {getStatus(res?.time?.open, res?.time?.close)}
            </Text>
            <Text fontSize={11} color="coolGray.500" textAlign="center">
              {res?.time?.open} - {res?.time?.close}
            </Text>
          </Box>
        </HStack>

        {/* hàng 2: khoảng cách + giá */}
        <HStack alignItems="center" justifyContent="space-between" mt={1}>
          <HStack alignItems="center" space={2}>
            <HStack
              alignItems="center"
              space={1}
              px={2.5}
              py={1}
              borderRadius="full"
              bg="coolGray.100"
            >
              <Gps size={16} color={colors.coolGray[600]} />
              <Text fontSize={12} color="primary.700" fontWeight={600}>
                {distanceUser.toFixed(2)} km
              </Text>
            </HStack>

            <HStack alignItems="center" space={1}>
              <DollarCircle size={18} color={colors.coolGray[500]} />
              <Text fontSize={13} color="coolGray.600">
                {formatNumberToCurrency(res?.price?.min || 0, "đ")} –{" "}
                {formatNumberToCurrency(res?.price?.max || 0, "đ")}
              </Text>
            </HStack>
          </HStack>

          {/* rating badge */}
          <Center px={3} py={1} borderRadius="full" bg="primary.600">
            <Text fontWeight={800} fontSize={13} color="#fff">
              {rating.toFixed(1)}
            </Text>
          </Center>
        </HStack>

        {/* hàng 3: categories chips */}
        <HStack mt={3} flexWrap="wrap" space={1.5}>
          {(res?.category ?? []).map((cat: any, idx: number) => {
            const label = selectCategory?.[cat]?.label ?? cat;
            return (
              <Box
                key={`${cat}-${idx}`}
                px={2.5}
                py={1}
                borderRadius="full"
                bg="coolGray.100"
                borderWidth={1}
                borderColor="coolGray.200"
              >
                <Text fontSize={12} color="#0F172A">
                  {label}
                </Text>
              </Box>
            );
          })}
        </HStack>
        {/* hàng 4: actions */}
        <HStack mt={3.5} alignItems="center" justifyContent="space-between">
          <HStack space={3} alignItems="center">
            {/* Nút viết/đã đánh giá */}
            <TouchableOpacity
              onPress={() => {
                if (isNotCommented) navigation.navigate("CommentForm", { id });
              }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              disabled={!isNotCommented} // khi đã đánh giá thì không bấm được
            >
              <HStack
                px={3}
                py={1.5}
                borderRadius="full"
                alignItems="center"
                space={1}
                bg={isNotCommented ? "coolGray.100" : "emerald.50"}
                borderWidth={1}
                borderColor={isNotCommented ? "coolGray.200" : "emerald.200"}
              >
                <Messages3
                  size={18}
                  color={
                    isNotCommented ? colors.coolGray[700] : colors.emerald[700]
                  }
                />
                <Text
                  fontSize={12}
                  color={isNotCommented ? "coolGray.700" : "emerald.700"}
                  fontWeight={isNotCommented ? 400 : 600}
                >
                  {isNotCommented ? "Write review" : "Reviewed"}
                </Text>
              </HStack>
            </TouchableOpacity>

            {/* Nút lưu quán */}
            <TouchableOpacity
              onPress={handleBookmarkRes}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <HStack
                px={3}
                py={1.5}
                borderRadius="full"
                bg={isBookmarkRes ? "primary.50" : "coolGray.100"}
                borderWidth={1}
                borderColor={isBookmarkRes ? "primary.200" : "coolGray.200"}
                alignItems="center"
                space={1}
              >
                <Ionicons
                  name={isBookmarkRes ? "bookmark" : "bookmark-outline"}
                  size={18}
                  color={
                    isBookmarkRes ? colors.primary[600] : colors.coolGray[700]
                  }
                />
                <Text
                  fontSize={12}
                  color={isBookmarkRes ? "primary.700" : "coolGray.700"}
                >
                  {isBookmarkRes ? "Saved" : "Save restaurant"}
                </Text>
              </HStack>
            </TouchableOpacity>
          </HStack>
        </HStack>
      </Box>

      {/* ===== MENU SECTION (NEW) ===== */}
      <ScrollView>
        <VStack p={4} space={4}>
          {/* Header + Category Chips */}
          <VStack space={2}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontSize={16} fontWeight={800} color="#0F172A">
                Menu
              </Text>
              <Text fontSize={12} color="coolGray.500">
                {filteredMenu.length} items
              </Text>
            </HStack>

            {/* Chips đơn giản, không phụ thuộc CategoryPills để giảm ràng buộc */}
            <HStack flexWrap="wrap" space={2}>
              {menuCats.map((cat) => {
                const active = activeMenuCat === cat;
                return (
                  <Pressable key={cat} onPress={() => setActiveMenuCat(cat)}>
                    <Box
                      px={3}
                      py={1.5}
                      borderRadius={999}
                      bgColor={active ? "primary.600" : "coolGray.100"}
                    >
                      <Text fontSize={13} color={active ? "#fff" : "#0F172A"}>
                        {cat === "all" ? "All" : cat}
                      </Text>
                    </Box>
                  </Pressable>
                );
              })}
            </HStack>
          </VStack>

          {/* Danh sách món */}
          {/* Danh sách món */}
          {filteredMenu.length === 0 ? (
            <Box py={8} alignItems="center">
              <Text color="coolGray.500">No item in this category.</Text>
            </Box>
          ) : (
            <>
              <VStack space={3}>
                {visibleMenu.map((m, idx) => (
                  <HStack
                    key={`${m.id ?? idx}`}
                    space={3}
                    alignItems="center"
                    borderWidth={1}
                    borderColor="coolGray.200"
                    borderRadius="lg"
                    p={2}
                  >
                    {/* Ảnh món */}
                    {m.photo ? (
                      <Image
                        alt={m.name}
                        source={{ uri: m.photo }}
                        width={90}
                        height={70}
                        borderRadius={10}
                        resizeMode="cover"
                        bg="coolGray.100"
                      />
                    ) : (
                      <Box
                        width={90}
                        height={70}
                        borderRadius={10}
                        bg="coolGray.100"
                      />
                    )}

                    {/* Thông tin món */}
                    <VStack flex={1} space={0.5}>
                      <Text
                        numberOfLines={1}
                        fontWeight={700}
                        fontSize={14}
                        color="#0F172A"
                      >
                        {m.name}
                      </Text>
                      {!!m.category && (
                        <Text fontSize={12} color="coolGray.500">
                          {m.category}
                        </Text>
                      )}
                      {typeof m.basePrice === "number" && (
                        <Text
                          fontSize={13}
                          fontWeight={600}
                          color="primary.600"
                          mt={1}
                        >
                          {formatNumberToCurrency(m.basePrice, "đ")}
                        </Text>
                      )}
                    </VStack>
                  </HStack>
                ))}
              </VStack>

              {/* Nút xem thêm / thu gọn */}
              {filteredMenu.length > INITIAL_MENU_COUNT && (
                <Center mt={2}>
                  <Pressable onPress={() => setMenuExpanded((v) => !v)}>
                    <Box
                      px={4}
                      py={2}
                      borderRadius="full"
                      bg={menuExpanded ? "coolGray.100" : "primary.50"}
                      borderWidth={1}
                      borderColor={
                        menuExpanded ? "coolGray.200" : "primary.200"
                      }
                    >
                      <Text
                        fontSize={13}
                        fontWeight={700}
                        color={menuExpanded ? "coolGray.700" : "primary.700"}
                      >
                        {menuExpanded ? "Collapse" : `View more ${remaining} items`}
                      </Text>
                    </Box>
                  </Pressable>
                </Center>
              )}
            </>
          )}

          {/* ===== COMMENTS ===== */}
          <VStack mt={6} space={3}>
            <HStack
              alignItems="center"
              justifyContent="space-between"
              mb={1}
              px={1}
            >
              <Text fontSize={16} fontWeight={800} color="#0F172A">
                Rating ({listComment.length})
              </Text>
              {/* Có thể thêm Sort sau này: Mới nhất / Điểm cao */}
              {/* <Select ... /> */}
            </HStack>

            <VStack space={3}>
              {listComment.map((cmt) => (
                <RestaurantComment key={cmt.id} comments={cmt} />
              ))}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Restaurant;
