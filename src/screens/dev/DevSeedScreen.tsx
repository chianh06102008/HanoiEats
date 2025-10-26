// src/screens/DevSeedScreen.tsx
import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import { seedRestaurantsWithMenus } from "../../data/mockup";

export default function DevSeedScreen() {
  const [log, setLog] = useState<string>("");

  const handleSeed = async () => {
    try {
      setLog("Seeding...");
      await seedRestaurantsWithMenus();
      setLog(
        "Done! Check Firestore: /restaurants-2/* (menu embedded trong document)."
      );
    } catch (e: any) {
      const msg = e?.message || String(e);
      setLog("Error: " + msg);
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Seed Restaurants + Menus (DEV only)"
        onPress={handleSeed}
      />
      <Text style={{ marginTop: 12, textAlign: "center" }}>{log}</Text>
    </View>
  );
}
