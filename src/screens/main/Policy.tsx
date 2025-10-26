import React from "react";
import { Box, ScrollView, Text } from "native-base";
import Header from "../../components/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigations/config";

type Props = {} & NativeStackScreenProps<RootStackParams, "Policy">;

const Policy = (props: Props) => {
  const { navigation } = props;
  const handleBtnBack = () => {
    navigation.goBack();
  };
  return (
    <Box flex={1}>
      <Header.BasicHeader
        title="Privacy Policy"
        handleBtnBack={handleBtnBack}
      />
      <ScrollView p={4} flex={1}>
        <Text>
          Privacy Policy – HanoiEats{"\n\n"}
          1. Purpose and Scope of Information Collection{"\n"}
          The HanoiEats application may collect certain necessary information to improve user experience, including:{"\n"}
          - Account registration details (name, email, phone number).{"\n"}
          - Location information (if the user grants permission) to suggest nearby restaurants.{"\n"}
          - In-app behavioral data (e.g., restaurants viewed or saved) to personalize recommendations.{"\n\n"}

          2. Scope of Information Use{"\n"}
          User information is used for the following purposes:{"\n"}
          - To provide, maintain, and enhance HanoiEats services.{"\n"}
          - To personalize restaurant recommendations.{"\n"}
          - To support customer service, handle feedback, and resolve complaints.{"\n"}
          - To send notifications about new restaurants or promotions (if you consent).{"\n\n"}

          3. Information Storage and Security{"\n"}
          - Personal data is securely stored on our servers in compliance with security standards.{"\n"}
          - HanoiEats applies technical measures (encryption, access control) to prevent unauthorized access, loss, or misuse of information.{"\n"}
          - We do not sell or share your personal information with third parties without your consent.{"\n\n"}

          4. User Rights{"\n"}
          Users have the right to:{"\n"}
          - Review, update, edit, or delete their personal information at any time.{"\n"}
          - Opt out of receiving marketing notifications from the application.{"\n"}
          - Request deletion of stored data related to their account.{"\n\n"}

          5. Information Sharing with Third Parties{"\n"}
          In certain cases, we may share information with trusted partners (e.g., mapping or payment services) to ensure service quality. Such sharing will always comply with our privacy principles.{"\n\n"}

          6. Changes to the Privacy Policy{"\n"}
          HanoiEats may update this policy from time to time. Any significant changes will be notified within the application or via email (if applicable).{"\n\n"}

          7. Contact Information{"\n"}
          If you have any questions regarding this Privacy Policy, please contact us at:{"\n"}
          📧 Email: support@hanoieats.vn{"\n"}

        </Text>
      </ScrollView>
    </Box>
  );
};

export default Policy;
