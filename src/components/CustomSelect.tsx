// src/components/CustomSelect.tsx
import React, { useMemo, useState } from "react";
import { TouchableOpacity, FlatList } from "react-native";
import { Box, Text, Actionsheet, useDisclose, HStack } from "native-base";

type Option = { label: string; value: string };
type Props = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  options: Option[];
};

const CustomSelect = ({
  label,
  value,
  onChange,
  placeholder = "Chọn",
  options,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [query, setQuery] = useState(""); // nếu muốn thêm ô search sau này

  const data = useMemo(() => {
    // nếu có search thì filter ở đây
    return options;
  }, [options]);

  return (
    <Box w="100%">
      <Text fontWeight={700} fontSize={16} color="black" mb={1}>
        {label}
      </Text>

      {/* Trigger */}
      <TouchableOpacity onPress={onOpen} activeOpacity={0.9}>
        <Box
          borderWidth={1}
          borderColor="muted.700"
          borderRadius={100}
          px={4}
          h={10}
          justifyContent="center"
        >
          <Text color={value ? "black" : "muted.500"} fontSize={16}>
            {value
              ? options.find((o) => o.value === value)?.label
              : placeholder}
          </Text>
        </Box>
      </TouchableOpacity>

      {/* ActionSheet với FlatList là scroller DUY NHẤT */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" px={4} py={3}>
            <Text fontWeight={700} fontSize={18}>
              Chọn {label.toLowerCase()}
            </Text>
          </Box>

          <FlatList
            data={data}
            keyExtractor={(item) => item.value}
            style={{ width: "100%" }}
            // KHÔNG bọc ScrollView, FlatList tự cuộn
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onChange(item.value);
                  onClose();
                }}
                activeOpacity={0.8}
              >
                <Box
                  w="100%"
                  px={4}
                  py={3}
                  borderBottomWidth={0.5}
                  borderColor="#eee"
                >
                  <HStack alignItems="center" justifyContent="space-between">
                    <Text>{item.label}</Text>
                    {value === item.value ? <Text>✓</Text> : null}
                  </HStack>
                </Box>
              </TouchableOpacity>
            )}
            // Nếu danh sách ngắn, FlatList vẫn OK; nếu muốn header search:
            // ListHeaderComponent={<SearchBox .../>}
            keyboardShouldPersistTaps="handled"
            removeClippedSubviews
            contentContainerStyle={{ paddingBottom: 8 }}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

export default CustomSelect;
