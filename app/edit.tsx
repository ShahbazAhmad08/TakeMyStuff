import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useProducts } from "../context/ProductContext";

export default function Edit() {
  const { id, title, price, image, category } = useLocalSearchParams();
  const { updateProduct } = useProducts();
  const router = useRouter();

  const [newTitle, setNewTitle] = useState(title as string);
  const [newPrice, setNewPrice] = useState(price as string);
  const [newCategory, setNewCategory] = useState((category as string) || "");

  const handleUpdate = () => {
    if (!newTitle || !newPrice) {
      alert("Please fill all fields");
      return;
    }

    updateProduct({
      id: id as string,
      title: newTitle,
      price: newPrice,
      image: image ? (image as string) : undefined,
      category: newCategory,
    });

    router.replace("/home"); // ✅ better UX
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
        Edit Product
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
        {/* Title */}
        <TextInput
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="Product Title"
          style={{
            backgroundColor: "#f1f1f1",
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />

        {image && (
          <Image
            source={{ uri: image as string }}
            style={{ height: 150, borderRadius: 10, marginBottom: 15 }}
          />
        )}

        {/* Price */}
        <TextInput
          value={newPrice}
          onChangeText={setNewPrice}
          placeholder="Price"
          keyboardType="numeric"
          style={{
            backgroundColor: "#f1f1f1",
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />

        {/* Category */}
        <TextInput
          value={newCategory}
          onChangeText={setNewCategory}
          placeholder="Category"
          style={{
            backgroundColor: "#f1f1f1",
            padding: 12,
            borderRadius: 10,
            marginBottom: 20,
          }}
        />

        {/* Update Button */}
        <TouchableOpacity
          onPress={handleUpdate}
          style={{
            backgroundColor: "#3498db",
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Update Product
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
