// src/screens/Onboarding.tsx
import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Pressable as RNPressable,
  ImageBackground,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";
import { Box, Text, VStack, HStack, Pressable, useTheme } from "native-base";
import { StatusBar } from "expo-status-bar";

type Props = {} & NativeStackScreenProps<RootStackParams, "Onboarding">;

// thay ảnh của bạn ở đây
const SLIDES = [
  {
    key: "s1",
    image: require("../../../assets/onboarding/intro-1.png"),
    text: "🌍 Discover Hanoi’s Delicious Dishes",
    sub: "Find quality nearby places with constantly updated recommendations.",
  },
  {
    key: "s2",
    image: require("../../../assets/onboarding/intro-2.png"),
    text: "📜 Transparent and Clear Menu",
    sub: "View prices, food photos, and real customer reviews.",
  },
  {
    key: "s3",
    image: require("../../../assets/onboarding/intro-3.png"),
    text: "⭐ Bookmark & Share",
    sub: "Save your favorite spots and leave helpful comments.",
  },
];

export default function Onboarding({ navigation }: Props) {
  const [page, setPage] = useState(0);

  // animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current; // translateY

  const animateIn = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(20);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    animateIn();
  }, [page]);

  const onSkip = () => {
    navigation.navigate("Auth");
  };

  const onNext = () => {
    if (page < SLIDES.length - 1) {
      setPage((p) => p + 1);
    } else {
      navigation.navigate("Auth");
    }
  };

  const current = SLIDES[page];

  return (
    <ImageBackground
      source={current.image}
      alt="onboarding-bg"
      resizeMode="cover"
      style={styles.bg}
      imageStyle={styles.bgImage}
    >
      <StatusBar style="light" />

      {/* overlay tối nhẹ để chữ dễ đọc */}
      <Box
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
        bg="rgba(0,0,0,0.25)"
      />

      {/* content (animated) */}
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <VStack flex={1} justifyContent="flex-end" px={6} pb={10} space={5}>
          {/* message */}
          <VStack space={2} alignItems="center">
            <Text
              fontSize={24}
              fontWeight={800}
              color="#fff"
              textAlign="center"
            >
              {current.text}
            </Text>
            {!!current.sub && (
              <Text
                fontSize={16}
                color="coolGray.100"
                textAlign="center"
                lineHeight={20}
              >
                {current.sub}
              </Text>
            )}
          </VStack>

          {/* dots */}
          <HStack justifyContent="center" alignItems="center" space={2}>
            {SLIDES.map((_, i) => {
              const active = i === page;
              return (
                <Box
                  key={i}
                  width={active ? 6 : 4}
                  height={4}
                  borderRadius={999}
                  bg={active ? "primary.500" : "coolGray.400"}
                />
              );
            })}
          </HStack>

          {/* actions */}
          <HStack justifyContent="space-between" alignItems="center" mt={1}>
            <RNPressable onPress={onSkip} hitSlop={10}>
              <Text color="coolGray.100" fontSize={13} fontWeight={600}>
                Skip
              </Text>
            </RNPressable>

            <Pressable onPress={onNext}>
              <Box
                bg="primary.600"
                px={6}
                py={3}
                borderRadius={14}
                shadow={1}
                alignItems="center"
              >
                <Text color="#fff" fontSize={15} fontWeight={800}>
                  {page === SLIDES.length - 1 ? "Start" : "Next"}
                </Text>
              </Box>
            </Pressable>
          </HStack>
        </VStack>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,

    justifyContent: "flex-end",
  },
  bgImage: {},
});
