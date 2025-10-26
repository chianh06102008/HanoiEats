import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Text, HStack, Slider } from "native-base";

type RatingProps = {
  title: string;
  getValueRating: any;
  handleValue?: () => {};
};
const RatingGroup = (props: RatingProps) => {
  const [onChangeValue, setOnChangeValue] = useState(5);

  useEffect(() => {
    props.getValueRating(onChangeValue, props.title);
  }, [onChangeValue]);
  return (
    <Box width="100%" px={2}>
      <HStack space={3} alignItems={"center"}>
        <Box width={20}>
          <Text fontWeight={400} fontSize={14}>
            {props.title}
          </Text>
        </Box>
        <Box flex={1}>
          <Slider
            maxValue={10}
            minValue={0}
            defaultValue={5}
            size="md"
            onChange={(v) => {
              setOnChangeValue(Math.floor(v));
            }}
            // onChangeEnd={(v) => {
            //   v && setOnChangeEndValue(Math.floor(v));
            // }}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb bgColor={"#fff"} shadow={1} />
          </Slider>
        </Box>
        <Box>
          <Text fontWeight={400} fontSize={16}>
            {onChangeValue}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default RatingGroup;
