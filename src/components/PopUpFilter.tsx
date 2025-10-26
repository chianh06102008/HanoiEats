// src/components/PopUpFilter.tsx
import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Box,
  Text,
  Center,
  Modal,
  VStack,
  HStack,
  ScrollView,
  Pressable,
  useTheme,
  Divider,
  Badge,
} from "native-base";
import { CloseSquare } from "iconsax-react-native";
import CustomButton from "./CustomButton";
import { selectCategory, selectDistrict } from "../data/utils";

type Props = {
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  handleBtn: (district: string, category: string) => void;
};

const Chip = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress}>
    <Box
      px={3.5}
      py={2}
      borderRadius="2xl"
      bgColor={active ? "primary.600" : "coolGray.100"}
      borderWidth={active ? 0 : 1}
      borderColor="coolGray.200"
      margin={1}
    >
      <Text
        fontSize={13}
        color={active ? "#fff" : "#0F172A"}
        fontWeight={active ? 700 : 500}
      >
        {label}
      </Text>
    </Box>
  </Pressable>
);

const Section = ({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) => (
  <HStack alignItems="center" justifyContent="space-between" mb={2} mt={1}>
    <Text fontSize={15} fontWeight={800} color="#0F172A">
      {title}
    </Text>
    {right}
  </HStack>
);

const PopUpFilter = ({ showModal, setShowModal, handleBtn }: Props) => {
  const { colors } = useTheme();
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");

  const selectedCount = useMemo(
    () => [district, category].filter(Boolean).length,
    [district, category]
  );

  const handleReset = () => {
    setDistrict("");
    setCategory("");
  };

  const onApply = () => {
    handleBtn(district, category);
  };

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="full">
        <Modal.Content
          maxWidth="100%"
          borderTopRadius="2xl"
          mt="auto"
          pb={0}
          _light={{ bg: "#fff" }}
        >
          {/* Header */}
          <VStack px={4} pt={4}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight={800} fontSize={18} color="primary.600">
                Filter
              </Text>
              <Pressable onPress={() => setShowModal(false)}>
                <CloseSquare size="28" color="#373737" />
              </Pressable>
            </HStack>
            <HStack mt={1} space={2} alignItems="center">
              <Text fontSize={12} color="coolGray.500">
                {selectedCount === 0 ? "No filter selected" : "Filter selected"}
              </Text>
              {district ? (
                <Badge rounded="full" variant="subtle" _text={{ fontSize: 11 }}>
                  District
                </Badge>
              ) : null}
              {category ? (
                <Badge rounded="full" variant="subtle" _text={{ fontSize: 11 }}>
                  Food
                </Badge>
              ) : null}
            </HStack>
          </VStack>

          <Divider mt={3} />

          {/* Body */}
          <ScrollView
            style={{ maxHeight: 500 }}
            contentContainerStyle={{ padding: 16 }}
          >
            {/* District */}
            <Section
              title="District"
              right={
                district ? (
                  <Pressable onPress={() => setDistrict("")}>
                    <Text fontSize={12} color="primary.600" underline>
                      Reset
                    </Text>
                  </Pressable>
                ) : null
              }
            />
            <HStack flexWrap="wrap">
              {selectDistrict.map((d) => (
                <Chip
                  key={String(d.value)}
                  label={d.label}
                  active={district === d.value}
                  onPress={() => setDistrict(d.value as string)}
                />
              ))}
            </HStack>

            {/* Category */}
            <Section
              title="Food"
              right={
                category ? (
                  <Pressable onPress={() => setCategory("")}>
                    <Text fontSize={12} color="primary.600" underline>
                      Reset
                    </Text>
                  </Pressable>
                ) : null
              }
            />
            <HStack flexWrap="wrap">
              <Chip
                label="All"
                active={category === ""}
                onPress={() => setCategory("")}
              />
              {selectCategory.map((c) => (
                <Chip
                  key={String(c.value)}
                  label={c.label}
                  active={category === c.value}
                  onPress={() => setCategory(c.value as string)}
                />
              ))}
            </HStack>

            <Box h={4} />
          </ScrollView>

          {/* Footer actions */}
          <Box
            px={4}
            py={3}
            borderTopWidth={1}
            borderColor="coolGray.200"
            bg="#fff"
          >
            <HStack space={3}>
              <Box flex={1}>
                <CustomButton
                  btnText="Reset"
                  handleBtn={handleReset}
                  background="#fff"
                  color="primary.600"
                  active={false}
                />
              </Box>
              <Box flex={2}>
                <CustomButton btnText="Apply" handleBtn={onApply} />
              </Box>
            </HStack>
          </Box>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default PopUpFilter;

const styles = StyleSheet.create({});
