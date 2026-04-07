import { useProducts } from "@/context/ProductContext";
import { useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { resetProducts } = useProducts();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
      }}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Profile
      </Text>

      {/* Profile Card */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 20,
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        {/* Avatar */}
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            backgroundColor: "#2ecc71",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 32, fontWeight: "bold" }}>
            {user?.email?.[0]?.toUpperCase() || "U"}
          </Text>
        </View>

        {/* Email */}
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 5,
          }}
        >
          {user?.email || "Guest User"}
        </Text>

        <Text style={{ color: "gray", marginBottom: 20 }}>
          Manage your account settings
        </Text>

        {/* Divider */}
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#eee",
            marginBottom: 20,
          }}
        />

        {/* Menu Options */}
        <View style={{ width: "100%" }}>
          <TouchableOpacity style={{ paddingVertical: 12 }}>
            <Text style={{ fontSize: 16 }}>📦 My Listings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ paddingVertical: 12 }}>
            <Text style={{ fontSize: 16 }}>❤️ Favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ paddingVertical: 12 }}>
            <Text style={{ fontSize: 16 }}>⚙️ Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetProducts}>
            <Text>Reset Demo Data</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: "#e74c3c",
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 10,
            marginTop: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
