"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminUser {
  name: string;
  role: "super_admin" | "manager" | "editor";
  loggedInAt: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (pinOrKey: string) => { success: boolean; message?: string };
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = "tgz_admin_session_v1";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.authenticated) {
          setIsAuthenticated(true);
          setUser({
            name: parsed.name || "Quản trị viên Tối cao",
            role: "super_admin",
            loggedInAt: parsed.loggedInAt || new Date().toISOString()
          });
        }
      }
    } catch (e) {
      console.warn("Failed to restore admin session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (pinOrKey: string): { success: boolean; message?: string } => {
    const clean = pinOrKey.trim();
    // Valid admin keys / PINs
    if (clean === "ph2026" || clean === "admin" || clean === "123456" || clean === "tinhocgenz@2026") {
      const adminData: AdminUser = {
        name: clean === "ph2026" ? "Trưởng Ban Đào Tạo" : "Quản trị viên Hệ thống",
        role: "super_admin",
        loggedInAt: new Date().toISOString()
      };
      setIsAuthenticated(true);
      setUser(adminData);
      try {
        localStorage.setItem(
          ADMIN_STORAGE_KEY,
          JSON.stringify({ authenticated: true, name: adminData.name, loggedInAt: adminData.loggedInAt })
        );
        // Also set cookie for middleware / server compatibility if needed
        document.cookie = `tgz_admin_session=active; path=/admin; max-age=86400; SameSite=Lax`;
      } catch (e) {}
      return { success: true };
    }

    return {
      success: false,
      message: "Mã PIN hoặc Khóa Quản trị không chính xác! (Mã mặc định hệ thống: ph2026)"
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      document.cookie = `tgz_admin_session=; path=/admin; max-age=0`;
    } catch (e) {}
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
