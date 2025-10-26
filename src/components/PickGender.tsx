import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Box, Center, HStack, Text } from "native-base";

type PickGenderProps = {
  gender: any;
  setGender: any;
  disabled?: boolean;
};

const PickGender = ({
  gender,
  setGender,
  disabled = false,
}: PickGenderProps) => {
  const genderArr = [
    {
      gen: "M",
      name: "Nam",
    },
    {
      gen: "F",
      name: "Nữ",
    },
  ];
  return (
    <Box width="100%">
      <Text mb={1} color={"text.400"}>
        Giới tính
      </Text>
      <HStack
        justifyContent={"space-between"}
        borderColor={"muted.700"}
        borderRadius={100}
        space={4}
      >
        {genderArr.map((elm) => (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setGender(elm.gen)}
            key={elm.gen}
            disabled={disabled}
          >
            <Center
              bgColor={elm.gen == gender ? "primary.600" : "transparent"}
              height={10}
              borderWidth={elm.gen == gender ? 0 : 1}
              borderColor={"primary.600"}
              borderRadius={100}
            >
              <Text
                color={elm.gen == gender ? "white" : "text.600"}
                fontSize={16}
              >
                {elm.name}
              </Text>
            </Center>
          </TouchableOpacity>
        ))}
      </HStack>
    </Box>
  );
};

export default PickGender;

const styles = StyleSheet.create({});
