import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { Box, IBoxProps } from "native-base";

type Props = {
  children: ReactNode;
} & IBoxProps;

const BoxContainer = (props: Props) => {
  const { children, ...boxProps } = props;
  return (
    <Box flex={1} bgColor={"coolGray.100"} {...boxProps}>
      {children}
    </Box>
  );
};

export default BoxContainer;

const styles = StyleSheet.create({});
