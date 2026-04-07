import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useProducts } from "../../context/ProductContext";

export default function Home() {
  const { products, deleteProduct } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const categories = ["Electronics", "Vehicles", "Furniture"];

  const filteredProducts = products.filter((item: any) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());

    const matchCategory = selectedCategory
      ? item.category?.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchSearch && matchCategory;
  });
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#f8f9fa" }}>
      <TextInput
        placeholder="🔍 Search products..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 0,
          padding: 12,
          marginBottom: 10,
          borderRadius: 10,
          backgroundColor: "#f1f1f1",
        }}
      />
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() =>
              setSelectedCategory(cat === selectedCategory ? "" : cat)
            }
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              backgroundColor: selectedCategory === cat ? "#000" : "#eee",
              marginRight: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: selectedCategory === cat ? "white" : "black",
              }}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 50, color: "gray" }}>
            No products yet 😕
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/product/${item.id}`)}
            activeOpacity={0.8}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 12,
                marginBottom: 12,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
              }}
            >
              {/* Image */}
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={{
                    height: 150,
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
              )}

              {/* Title */}
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {item.title}
              </Text>

              {/* Price */}
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#2ecc71",
                  marginTop: 5,
                }}
              >
                ₹{item.price}
              </Text>

              {/* Category */}
              {item.category && (
                <Text style={{ color: "gray", marginTop: 5 }}>
                  {item.category}
                </Text>
              )}

              {/* Actions */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/edit",
                      params: { ...item },
                    })
                  }
                  style={{
                    backgroundColor: "#3498db",
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleteProduct(item.id)}
                  style={{
                    backgroundColor: "#e74c3c",
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
