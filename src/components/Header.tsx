import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Box, HStack, Icon, Input, Text, VStack, useTheme } from "native-base";
import {
  Add,
  ArrowLeft2,
  FilterSearch,
  Location,
  SearchNormal,
} from "iconsax-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { RootState, useAppSelector } from "../store";

const HomeHeader = ({ handleSearch, handleFilter = () => {} }: any) => {
  const user = useAppSelector((state: RootState) => state.user.user);

  const insets = useSafeAreaInsets();
  return (
    <Box
      bgColor={"primary.600"}
      px={4}
      py={2}
      style={{ paddingTop: insets.top }}
    >
      <VStack space={2}>
        <HStack alignItems={"center"} justifyContent={"space-between"}>
          <TouchableOpacity onPress={handleFilter}>
            <HStack space={1}>
              <Box>
                <FilterSearch size="24" color="#fff" />
              </Box>
              <Text fontSize={16} color="#fff">
                Filter
              </Text>
            </HStack>
          </TouchableOpacity>
          <Box size={8} borderRadius={100} overflow={"hidden"}>
            <Image
              source={{
                uri:
                  user?.avatarUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgc2u0F9JdscSSIM4LH0ca2FLNgVS-vat7LSZKFb73azHEfhVfW7vwnFaq5bidMl1_tsg&usqp=CAU",
              }}
              style={{ width: 32, height: 32 }}
            />
          </Box>
        </HStack>
        <SearchingBar handleSearch={handleSearch} />
      </VStack>
    </Box>
  );
};

const SearchingBar = ({ handleSearch }: any) => {
  const { colors } = useTheme();
  const [textSearch, setTextSearch] = useState("");
  return (
    <Box mb={2}>
      <Input
        value={textSearch}
        onChangeText={setTextSearch}
        backgroundColor={"#fff"}
        borderRadius={100}
        px={1.5}
        py={3}
        placeholder="Search"
        placeholderTextColor={colors.muted[400]}
        InputLeftElement={
          <TouchableOpacity onPress={() => handleSearch(textSearch)}>
            <Icon
              as={<SearchNormal size="16" color={colors.muted[400]} />}
              size={5}
              ml="2"
              color="muted.400"
            />
          </TouchableOpacity>
        }
      />
    </Box>
  );
};

type Props = {
  handleBtnBack?: any;
  handleAdd?: any;
  handleDone?: any;
  handleSearch?: any;
  title: string;
  bgColor?: string;
};

const BasicHeader = (props: Props) => {
  const insets = useSafeAreaInsets();
  // set when have user
  const user = true;
  const {
    title,
    handleBtnBack = null,
    handleAdd = null,
    handleDone = null,
    handleSearch = null,
    bgColor = "primary.600",
  } = props;
  return (
    <Box bgColor={bgColor} px={4} py={2} style={{ paddingTop: insets.top }}>
      <HStack alignItems={"center"} justifyContent={"space-between"} mb={2}>
        {handleBtnBack ? (
          <TouchableOpacity onPress={handleBtnBack}>
            <ArrowLeft2 size="32" color="#fff" />
          </TouchableOpacity>
        ) : (
          <Box size={8} />
        )}
        <Text fontSize={16} fontWeight={500} color="#fff">
          {title}
        </Text>

        {handleAdd && (
          <TouchableOpacity onPress={handleAdd}>
            <Add size="32" color="#fff" />
          </TouchableOpacity>
        )}
        {handleDone && (
          <TouchableOpacity onPress={handleAdd}>
            <Text fontSize={16} fontWeight={500}>
              Done
            </Text>
          </TouchableOpacity>
        )}
        {!handleAdd && !handleDone && <Box size={8} />}
      </HStack>
      {handleSearch && <SearchingBar />}
    </Box>
  );
};

export default {
  BasicHeader,
  HomeHeader,
};

const styles = StyleSheet.create({});
