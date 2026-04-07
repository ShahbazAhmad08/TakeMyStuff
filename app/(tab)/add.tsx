import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useProducts } from "../../context/ProductContext";

export default function Add() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const { addProduct } = useProducts();
  const router = useRouter();

  const inputStyle = {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAdd = () => {
    if (!title || !price) {
      alert("Please fill all required fields");
      return;
    }

    addProduct({
      id: Date.now().toString(),
      title,
      price,
      image: image || undefined,
      category,

      sellerName,
      phone,
      email,
      address,
    });

    // reset
    setTitle("");
    setPrice("");
    setImage(null);
    setCategory("");

    router.replace("/home"); // better UX
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
        Add Product
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
          placeholder="Product Title"
          value={title}
          onChangeText={setTitle}
          style={{
            backgroundColor: "#f1f1f1",
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />

        {/* Price */}
        <TextInput
          placeholder="Price (₹)"
          value={price}
          onChangeText={setPrice}
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
          placeholder="Category (e.g. Electronics)"
          value={category}
          onChangeText={setCategory}
          style={{
            backgroundColor: "#f1f1f1",
            padding: 12,
            borderRadius: 10,
            marginBottom: 15,
          }}
        />

        {/* Image Picker */}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            borderWidth: 1,
            borderStyle: "dashed",
            borderColor: "#ccc",
            borderRadius: 10,
            padding: 20,
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ color: "gray" }}>
            {image ? "Change Image" : "Pick Image"}
          </Text>
        </TouchableOpacity>

        {/* Image Preview */}
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              height: 150,
              borderRadius: 10,
              marginBottom: 15,
            }}
          />
        )}

        <TextInput
          placeholder="Seller Name"
          value={sellerName}
          onChangeText={setSellerName}
          style={inputStyle}
        />

        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={inputStyle}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={inputStyle}
        />

        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={inputStyle}
        />

        {/* Add Button */}
        <TouchableOpacity
          onPress={handleAdd}
          style={{
            backgroundColor: "#2ecc71",
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
          disabled={!title || !price}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Add Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
