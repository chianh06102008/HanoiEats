import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Box, HStack, Text, VStack, useTheme } from "native-base";
import { Image } from "expo-image";
import { IComment } from "../type/restaurant";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../firebase";
import { IUserProfile } from "../type/user";
import { getDMY } from "../utils/utils";
import { DirectDown, DirectUp } from "iconsax-react-native";

type Props = {
  comments: IComment;
};

const RestaurantComment = (props: Props) => {
  const { comments } = props;
  const { colors } = useTheme();
  const [commentState, setCommentState] = useState<IComment>(comments);
  const [user, setUser] = useState<IUserProfile>();

  const getUserFromId = async () => {
    const userRef = doc(firebaseDb, "users", comments.userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data() as any as IUserProfile;
    setUser(userData);
  };

  const commentsUp = Object.values(commentState.comment.vote).filter(
    (value) => value == 1
  ).length;
  const commentsDown = Object.values(commentState.comment.vote).filter(
    (value) => value == -1
  ).length;

  const checkExistComment = commentState.comment.vote[commentState.userId];

  useEffect(() => {
    getUserFromId();
  }, []);

  const handleVoteComment = async (voteValue: -1 | 1) => {
    try {
      const { id, userId } = comments;
      const cloneComment = { ...comments };
      // check exist vote on comment
      if (
        cloneComment.comment.vote[userId] &&
        cloneComment.comment.vote[userId] == voteValue
      ) {
        delete cloneComment.comment.vote[userId];
      } else {
        cloneComment.comment.vote[userId] = voteValue;
      }
      setCommentState(cloneComment);
      await updateDoc(doc(firebaseDb, "comments", id!), cloneComment);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VStack space={2}>
      <HStack alignItems={"center"} justifyContent={"space-between"}>
        <HStack alignItems={"center"} space={3}>
          <Box size={12} borderRadius={100} overflow={"hidden"}>
            <Image
              source={{
                uri:
                  user?.avatarUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgc2u0F9JdscSSIM4LH0ca2FLNgVS-vat7LSZKFb73azHEfhVfW7vwnFaq5bidMl1_tsg&usqp=CAU",
              }}
              style={{ width: 48, height: 48 }}
            />
          </Box>
          <VStack>
            <Text fontWeight={500} fontSize={14}>
              {user?.fullname}
            </Text>
            <Text fontWeight={400} fontSize={12} color="coolGray.500">
              {getDMY(commentState.comment.timestamp)}
            </Text>
            <HStack alignItems={"center"} space={2}>
              <Text fontWeight={500} fontSize={14}>
                Rating
              </Text>
              <Text fontWeight={500} fontSize={14}>
                -
              </Text>
              <Text fontWeight={700} fontSize={16} color="error.500">
                {commentState.comment.avgRating}
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <HStack alignItems={"center"} space={4}>
          {/* TODO: Setup up down vote */}
          <HStack space={1}>
            <TouchableOpacity onPress={() => handleVoteComment(1)}>
              <DirectUp
                size="24"
                color={
                  checkExistComment == 1
                    ? colors.primary[600]
                    : colors.coolGray[500]
                }
              />
            </TouchableOpacity>
            <Text fontWeight={500} fontSize={18}>
              {commentsUp - commentsDown}
            </Text>
            <TouchableOpacity onPress={() => handleVoteComment(-1)}>
              <DirectDown
                size="24"
                color={
                  checkExistComment == -1
                    ? colors.primary[600]
                    : colors.coolGray[500]
                }
              />
            </TouchableOpacity>
          </HStack>
        </HStack>
      </HStack>
      <Box>
        <Text fontWeight={700} fontSize={16}>
          {commentState.comment.title}
        </Text>
        <Text fontWeight={400} fontSize={14}>
          {commentState.comment.content}
        </Text>
      </Box>
      <Box>
        <Image
          source={{ uri: commentState.comment.imageUrl }}
          alt={commentState.comment.imageName}
          style={{ height: 200, width: "100%", borderRadius: 8 }}
        />
      </Box>
    </VStack>
  );
};

export default RestaurantComment;
