// src/components/CategoryPills.tsx
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Box } from "native-base";
import { selectCategory } from "../data/utils";

type Pill = { label: string; value: string };
type Props = {
  items: Pill[];
  active?: string;
  onSelect?: (v: string) => void;
};

export default function CategoryPills({ items, active, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.wrap}
    >
      {items.map((p) => {
        console.log(p.value);
        const isActive = active === p.value;
        return (
          <Box
            key={p.value}
            style={[styles.pill, isActive && { backgroundColor: "#111827" }]}
            onTouchEnd={() => onSelect?.(p.value)}
          >
            <Text style={[styles.pillText, isActive && { color: "#fff" }]}>
              {selectCategory[Number(p.value)].label}
            </Text>
          </Box>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 4 },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
  },
  pillText: { color: "#111827", fontWeight: "700", fontSize: 12.5 },
});
