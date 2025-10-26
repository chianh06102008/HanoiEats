// src/screens/Home.tsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Box, HStack, Text } from "native-base";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import CategoryPills from "../../components/CategoryPills";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { collection, getDocs } from "firebase/firestore";
import { firebaseDb } from "../../firebase";
import { IRestaurant } from "../../type/restaurant";
import PopUpFilter from "../../components/PopUpFilter";

type Props = {} & NativeStackScreenProps<RootStackParams, "TabNav">;

const Home = ({}: Props) => {
  const [listRes, setListRes] = useState<IRestaurant[]>([]);
  const [allRes, setAllRes] = useState<IRestaurant[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [activeCat, setActiveCat] = useState<string>("all");

  const handleSearch = useCallback(
    (textSearch: string) => {
      const s = textSearch?.trim().toLowerCase();
      if (s) {
        setListRes(
          allRes.filter(
            (r) =>
              r.name?.toLowerCase().includes(s) ||
              r.address?.toLowerCase().includes(s) ||
              (Array.isArray(r.category) &&
                r.category.join(" ").toLowerCase().includes(s))
          )
        );
      } else {
        setListRes(allRes);
      }
    },
    [allRes]
  );

  const fetchAllRestaurant = useCallback(async () => {
    const queryRes = await getDocs(collection(firebaseDb, "restaurants-2"));
    const restaurants: IRestaurant[] = [];
    queryRes.forEach((doc: any) =>
      restaurants.push({ id: doc.id, ...doc.data() })
    );
    setAllRes(restaurants);
    setListRes(restaurants);
  }, []);

  useEffect(() => {
    fetchAllRestaurant().catch(console.error);
  }, [fetchAllRestaurant]);

  const handleFilterBtn = useCallback(
    (district: string, category: string) => {
      let data = [...allRes];
      if (district) data = data.filter((r) => r.district === district);
      if (category) data = data.filter((r) => r.category?.includes(category));
      setListRes(data);
      setActiveCat(category || "all");
      setShowModal(false);
    },
    [allRes]
  );

  // Categories pills (top 6 + All)
  const catItems = useMemo(() => {
    const freq: Record<string, number> = {};
    allRes.forEach((r) =>
      (r.category || []).forEach((c) => {
        if (c) freq[c] = (freq[c] || 0) + 1;
      })
    );
    const sorted = Object.keys(freq)
      .sort((a, b) => freq[b] - freq[a])
      .slice(0, 6);
    return [...sorted.map((c) => ({ label: c, value: c }))];
  }, [allRes]);

  const dataToRender = useMemo(() => {
    if (activeCat === "all") return listRes;
    return listRes.filter((r) => r.category?.includes(activeCat));
  }, [listRes, activeCat]);

  const ListHeader = (
    <View>
      {/* All Categories */}
      <HStack
        alignItems="center"
        justifyContent="space-between"
        style={{ paddingHorizontal: 4, marginTop: 12, marginBottom: 8 }}
      >
        <Text fontSize={16} fontWeight={800} color="#0F172A">
          All Categories
        </Text>
        {/* <Text fontSize={13} color="#2563EB">
          See All
        </Text> */}
      </HStack>
      <CategoryPills
        items={catItems}
        active={activeCat}
        onSelect={(v) => setActiveCat(v)}
      />

      {/* Open Restaurants */}
      <HStack
        alignItems="center"
        justifyContent="space-between"
        style={{ paddingHorizontal: 4, marginTop: 16, marginBottom: 8 }}
      >
        <Text fontSize={16} fontWeight={800} color="#0F172A">
          Open Restaurants
        </Text>
        {/* <Text fontSize={13} color="#2563EB">
          See All
        </Text> */}
      </HStack>
    </View>
  );

  return (
    <Box flex={1} bgColor="#fff">
      <Header.HomeHeader
        handleSearch={handleSearch}
        handleFilter={() => setShowModal(true)}
      />

      <PopUpFilter
        showModal={showModal}
        setShowModal={setShowModal}
        handleBtn={handleFilterBtn}
      />

      <FlatList
        data={dataToRender}
        keyExtractor={(item) => String(item.id ?? item.name)}
        renderItem={({ item }) => <ItemCard restaurant={item} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <Box height={4} />}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <Box alignItems="center" justifyContent="center" py={24}>
            <Text fontSize={16} fontWeight={700} color="#334155">
              No restaurant matches
            </Text>
            <Text mt={1} fontSize={13} color="#64748B">
              Try changing the filter or keyword.
            </Text>
            <Text
              mt={3}
              fontSize={13}
              color="#2563EB"
              onPress={() => {
                // reset nhanh
                setActiveCat("all");
                setListRes(allRes);
              }}
            >
              Reset filter
            </Text>
          </Box>
        }
        // không dùng ScrollView dọc ở đâu khác
      />
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({
  listContent: { padding: 16, paddingBottom: 24 },
});
