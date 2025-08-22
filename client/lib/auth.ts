import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Login function
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    const { user, token } = response.data;

    // Store token and user in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

// Register function
export const register = async (
  name: string,
  email: string,
  password: string,
  phone?: string
): Promise<User> => {
  try {
    const response = await api.post<LoginResponse>("/auth/register", {
      name,
      email,
      password,
      phone,
    });

    const { user, token } = response.data;

    // Store token and user in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    // Continue with logout even if API call fails
  } finally {
    // Always clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;

  const userString = localStorage.getItem("user");
  if (!userString) return null;

  try {
    return JSON.parse(userString);
  } catch {
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("token");
  const user = getCurrentUser();

  return !!(token && user);
};

// Refresh user data
export const refreshUser = async (): Promise<User> => {
  try {
    const response = await api.get<User>("/auth/me");
    const user = response.data;

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    throw new Error("Failed to refresh user data");
  }
};
