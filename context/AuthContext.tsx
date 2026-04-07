import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load user from storage
  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem("user");
      if (data) setUser(JSON.parse(data));
      setLoading(false);
    };
    loadUser();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    const userData = { email, password }; // basic (no validation)
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Signup (same as login for now)
  const signup = async (email: string, password: string) => {
    const userData = { email, password };
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    console.log(user);
  };

  // Logout
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
