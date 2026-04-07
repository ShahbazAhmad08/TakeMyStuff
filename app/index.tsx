import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { user, loading } = useAuth();

  // 🔄 Loading state (better UX)
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <ActivityIndicator size="large" color="#2ecc71" />
      </View>
    );
  }

  // 🔐 Not logged in → Login
  if (!user) return <Redirect href="/login" />;

  // ✅ Logged in → Home
  return <Redirect href="/home" />;
}
