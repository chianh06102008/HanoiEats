import { StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  Box,
  IInputProps,
  Icon,
  Input,
  Pressable,
  Text,
  useTheme,
} from "native-base";
import { Eye, EyeSlash } from "iconsax-react-native";

type Props = {
  label: string;
  showIcon?: boolean;
} & IInputProps;

const InputLabel = (props: Props) => {
  const {
    label,
    secureTextEntry,
    showIcon = false,
    borderWidth = 0,
    ...inputProps
  } = props;
  const [show, setShow] = useState(false);
  const { colors } = useTheme();
  return (
    <Box width="100%">
      <Text mb={1} color={"coolGray.500"}>
        {label}
      </Text>
      <Input
        width={"100%"}
        color="coolGray.800"
        px={3}
        py={4}
        autoComplete="off"
        textContentType="none"
        autoCorrect={false}
        borderRadius={100}
        backgroundColor={"#fff"}
        borderWidth={borderWidth}
        fontSize={16}
        secureTextEntry={secureTextEntry && !show}
        placeholderTextColor={colors.coolGray[400]}
        InputRightElement={
          showIcon ? (
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  show ? (
                    <Eye size="24" color={colors.muted[400]} />
                  ) : (
                    <EyeSlash size="24" color={colors.muted[400]} />
                  )
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          ) : (
            <Box />
          )
        }
        {...inputProps}
      />
    </Box>
  );
};

export default InputLabel;

const styles = StyleSheet.create({});
