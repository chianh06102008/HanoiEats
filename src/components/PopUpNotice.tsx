import { StyleSheet } from "react-native";
import React from "react";
import { Box, Center, Modal, Text, VStack, useTheme } from "native-base";
import CustomButton from "./CustomButton";

type Props = {
  showModal: boolean;
  setShowModal: any;
};

const PopUpNotice = (props: Props) => {
  const { colors } = useTheme();
  const { showModal, setShowModal } = props;
  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => {}} size={"sm"}>
        <Modal.Content>
          <Modal.Body>
            <VStack flex={1} space={2} alignItems={"center"}>
              <Text fontSize={16} fontWeight={700} color="text.900">
                Thông báo
              </Text>
              <Text>
                Đổi mật khẩu thành công.{`\n`} Đăng nhập lại để tiếp tục
              </Text>
            </VStack>
            <Box flex={1} mb={3} mt={3}>
              <CustomButton btnText="Đồng ý" />
            </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default PopUpNotice;

const styles = StyleSheet.create({});
