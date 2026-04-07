import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    await signup(email, password);
    setEmail("");
    setPassword("");

    router.replace("/home"); // ✅ redirect after signup
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f8f9fa",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* Title */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        Create Account 🚀
      </Text>

      {/* Card */}
      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        {/* Email */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            backgroundColor: "#f1f1f1",
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            backgroundColor: "#f1f1f1",
            padding: 12,
            borderRadius: 10,
            marginBottom: 20,
          }}
        />

        {/* Signup Button */}
        <TouchableOpacity
          onPress={handleSignup}
          style={{
            backgroundColor: "#2ecc71",
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Create Account
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          onPress={() => router.push("/login")}
          style={{ marginTop: 15, alignItems: "center" }}
        >
          <Text style={{ color: "#3498db" }}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
