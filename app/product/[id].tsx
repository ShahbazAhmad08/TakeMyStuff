import { useLocalSearchParams } from "expo-router";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { useProducts } from "../../context/ProductContext";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const { products } = useProducts();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f8f9fa",
        padding: 20,
      }}
    >
      {/* Image */}
      {product.image ? (
        <Image
          source={{ uri: product.image }}
          style={{
            height: 220,
            borderRadius: 12,
            marginBottom: 15,
          }}
        />
      ) : (
        <View
          style={{
            height: 220,
            borderRadius: 12,
            backgroundColor: "#e0e0e0",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ color: "gray" }}>No Image Available</Text>
        </View>
      )}

      {/* Title */}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{product.title}</Text>

      {/* Price */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "#2ecc71",
          marginTop: 5,
        }}
      >
        ₹{product.price}
      </Text>

      {/* Category */}
      {product.category && (
        <Text style={{ color: "gray", marginTop: 10 }}>
          Category: {product.category}
        </Text>
      )}

      {/* Description (placeholder) */}
      {/* <Text style={{ marginTop: 20, lineHeight: 20 }}>
        This is a great product listed on your marketplace. You can add more
        details here like condition, location, seller info, etc.
      </Text> */}
      {/* <TouchableOpacity
        style={{
          backgroundColor: "#3498db",
          padding: 14,
          borderRadius: 10,
          marginTop: 20,
          alignItems: "center",
        }}
      > */}
      <View style={{ marginTop: 25 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Seller Details
        </Text>

        <Text>👤 {product.sellerName || "N/A"}</Text>
        <Text>📞 {product.phone || "N/A"}</Text>
        <Text>✉️ {product.email || "N/A"}</Text>
        <Text>📍 {product.address || "N/A"}</Text>
        <TouchableOpacity
          onPress={() =>
            product.phone && Linking.openURL(`tel:${product.phone}`)
          }
          style={{
            backgroundColor: "#2ecc71",
            padding: 14,
            borderRadius: 10,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Call Seller</Text>
        </TouchableOpacity>
      </View>
      {/* </TouchableOpacity> */}
    </View>
  );
}
