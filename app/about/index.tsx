import React from "react";
import { Text, View } from "react-native";

export default function about() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#7a7373",
      }}
    >
      <Text style={{ color: "white", fontSize: 24 }}>about</Text>
    </View>
  );
}
