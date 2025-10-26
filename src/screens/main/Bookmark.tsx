import React, { useEffect, useState, useCallback } from "react";
import { Box, Center, Text, VStack, useTheme } from "native-base";
import Header from "../../components/Header";
import { Bookmark as BookmarkIcon } from "iconsax-react-native";
import ItemCard from "../../components/ItemCard";
import { IRestaurantMockup } from "../../type/restaurant";
import { RootState, useAppSelector } from "../../store";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { useIsFocused } from "@react-navigation/native";

type Props = {};

const Bookmark = ({}: Props) => {
  const { colors } = useTheme();
  const user = useAppSelector((state: RootState) => state.user.user);
  const isFocused = useIsFocused();

  const [listRes, setListRes] = useState<IRestaurantMockup[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookmarkRes = useCallback(async () => {
    const ids = user?.bookmark || [];
    if (!ids.length) {
      setListRes([]);
      return;
    }

    setLoading(true);
    try {
      const list: IRestaurantMockup[] = [];
      // tuần tự an toàn (ít thay đổi code), có thể tối ưu song song Promise.all như trước
      await Promise.all(
        ids.map(async (resId) => {
          const resRef = doc(firebaseDb, "restaurants-2", resId);
          const resSnap = await getDoc(resRef);
          if (resSnap.exists()) {
            list.push({ ...(resSnap.data() as any), id: resId });
          }
        })
      );
      setListRes(list);
    } catch (e) {
      console.log("fetchBookmarkRes error:", e);
      setListRes([]);
    } finally {
      setLoading(false);
    }
  }, [user?.bookmark]);

  // Refetch khi:
  // - màn Bookmark được focus
  // - danh sách bookmark thay đổi
  useEffect(() => {
    if (isFocused) fetchBookmarkRes();
  }, [isFocused, fetchBookmarkRes]);

  return (
    <Box flex={1} bgColor="#fff">
      <Header.BasicHeader title="Saved" />

      {loading ? (
        <Center flex={1}>
          <Text color="coolGray.400">Loading…</Text>
        </Center>
      ) : listRes.length > 0 ? (
        <Box flex={1}>
          <VStack p={4} flex={1} space={4}>
            {listRes.map((res) => (
              <Box key={res.id}>
                <ItemCard restaurant={res} />
              </Box>
            ))}
          </VStack>
        </Box>
      ) : (
        <Center flex={1}>
          <Box>
            <BookmarkIcon size="64" color={colors.coolGray[300]} />
          </Box>
          <Box mt={2}>
            <Text fontWeight={400} fontSize={14} color={colors.coolGray[400]}>
              You haven't saved any restaurant
            </Text>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default Bookmark;
