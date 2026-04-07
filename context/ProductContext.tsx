import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type Product = {
  id: string;
  title: string;
  price: string;
  image?: string;
  category?: string;

  sellerName?: string;
  phone?: string;
  email?: string;
  address?: string;
};

const demoProducts = [
  {
    id: "1",
    title: "iPhone 13",
    price: "45000",
    category: "Electronics",
    sellerName: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@gmail.com",
    address: "Delhi",
  },
  {
    id: "2",
    title: "Samsung TV 42 inch",
    price: "25000",
    category: "Electronics",
    sellerName: "Amit Verma",
    phone: "9123456780",
    email: "amit@gmail.com",
    address: "Noida",
  },
  {
    id: "3",
    title: "Wooden Study Table",
    price: "5000",
    category: "Furniture",
    sellerName: "Neha Singh",
    phone: "9988776655",
    email: "neha@gmail.com",
    address: "Lucknow",
  },
  {
    id: "4",
    title: "Honda Activa 6G",
    price: "60000",
    category: "Vehicles",
    sellerName: "Ravi Kumar",
    phone: "9871234560",
    email: "ravi@gmail.com",
    address: "Kanpur",
  },
  {
    id: "5",
    title: "Dell Laptop i5",
    price: "35000",
    category: "Electronics",
    sellerName: "Ankit Gupta",
    phone: "9998887776",
    email: "ankit@gmail.com",
    address: "Delhi",
  },
  {
    id: "6",
    title: "Office Chair",
    price: "3000",
    category: "Furniture",
    sellerName: "Priya Sharma",
    phone: "9012345678",
    email: "priya@gmail.com",
    address: "Jaipur",
  },
  {
    id: "7",
    title: "Gaming PC Setup",
    price: "75000",
    category: "Electronics",
    sellerName: "Vikas Yadav",
    phone: "9876541200",
    email: "vikas@gmail.com",
    address: "Gurgaon",
  },
  {
    id: "8",
    title: "Royal Enfield Classic 350",
    price: "120000",
    category: "Vehicles",
    sellerName: "Sandeep Singh",
    phone: "9876501234",
    email: "sandeep@gmail.com",
    address: "Punjab",
  },
  {
    id: "9",
    title: "Double Bed",
    price: "15000",
    category: "Furniture",
    sellerName: "Ritu Jain",
    phone: "9765432109",
    email: "ritu@gmail.com",
    address: "Indore",
  },
  {
    id: "10",
    title: "Air Conditioner 1.5 Ton",
    price: "28000",
    category: "Electronics",
    sellerName: "Manoj Verma",
    phone: "9123498765",
    email: "manoj@gmail.com",
    address: "Delhi",
  },

  // Continue similar pattern...

  {
    id: "11",
    title: "iPad 9th Gen",
    price: "30000",
    category: "Electronics",
    sellerName: "Karan Mehta",
    phone: "9001122334",
    email: "karan@gmail.com",
    address: "Mumbai",
  },
  {
    id: "12",
    title: "Sofa Set 3+1",
    price: "20000",
    category: "Furniture",
    sellerName: "Pooja Sharma",
    phone: "8899776655",
    email: "pooja@gmail.com",
    address: "Delhi",
  },
  {
    id: "13",
    title: "Bajaj Pulsar 150",
    price: "55000",
    category: "Vehicles",
    sellerName: "Arjun Singh",
    phone: "9876123456",
    email: "arjun@gmail.com",
    address: "Patna",
  },
  {
    id: "14",
    title: "HP Printer",
    price: "4000",
    category: "Electronics",
    sellerName: "Rohit Gupta",
    phone: "9090909090",
    email: "rohit@gmail.com",
    address: "Delhi",
  },
  {
    id: "15",
    title: "Dining Table",
    price: "10000",
    category: "Furniture",
    sellerName: "Sneha Kapoor",
    phone: "9811223344",
    email: "sneha@gmail.com",
    address: "Chandigarh",
  },
  {
    id: "16",
    title: "MacBook Air M1",
    price: "70000",
    category: "Electronics",
    sellerName: "Aditya Raj",
    phone: "9887766554",
    email: "aditya@gmail.com",
    address: "Bangalore",
  },
  {
    id: "17",
    title: "Car Hyundai i20",
    price: "500000",
    category: "Vehicles",
    sellerName: "Deepak Kumar",
    phone: "9776655443",
    email: "deepak@gmail.com",
    address: "Delhi",
  },
  {
    id: "18",
    title: "Bookshelf",
    price: "3500",
    category: "Furniture",
    sellerName: "Meena Joshi",
    phone: "9665544332",
    email: "meena@gmail.com",
    address: "Pune",
  },
  {
    id: "19",
    title: "Smart Watch",
    price: "2500",
    category: "Electronics",
    sellerName: "Harsh Patel",
    phone: "9554433221",
    email: "harsh@gmail.com",
    address: "Ahmedabad",
  },
  {
    id: "20",
    title: "Fridge 260L",
    price: "18000",
    category: "Electronics",
    sellerName: "Nikhil Sharma",
    phone: "9443322110",
    email: "nikhil@gmail.com",
    address: "Delhi",
  },

  // You can copy-paste more similar items up to 30–35 easily
];
const ProductContext = createContext<any>(null);

export const useProducts = () => useContext(ProductContext);

export default function ProductProvider({ children }: any) {
  const [products, setProducts] = useState<Product[]>(demoProducts);
  const [loading, setLoading] = useState(true);

  // 🔹 Load data when app starts
  useEffect(() => {
    loadProducts();
  }, []);

  // 🔹 Save data whenever products change
  useEffect(() => {
    saveProducts(products);
  }, [products]);

  // 📥 Load from storage
  const loadProducts = async () => {
    try {
      const data = await AsyncStorage.getItem("products");

      if (data) {
        const parsed = JSON.parse(data);
        setProducts(parsed.length ? parsed : demoProducts);
      } else {
        setProducts(demoProducts);
      }
    } catch (error) {
      console.log(error);
      setProducts(demoProducts);
    } finally {
      setLoading(false);
    }
  };

  // 📤 Save to storage
  const saveProducts = async (products: Product[]) => {
    try {
      await AsyncStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
      console.log("Error saving products", error);
    }
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };
  // 🗑️ Delete product
  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // ✏️ Update product
  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item,
      ),
    );
  };

  const resetProducts = async () => {
    setProducts(demoProducts);
    await AsyncStorage.setItem("products", JSON.stringify(demoProducts));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        loading,
        resetProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
