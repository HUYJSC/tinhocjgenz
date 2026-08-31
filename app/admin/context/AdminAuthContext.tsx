"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminUser {
  userId?: string;
  name: string;
  role: "super_admin" | "academic" | "teacher";
  loggedInAt?: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (pinOrKey: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore and verify session from Server HttpOnly cookie on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/admin/auth/session", {
          method: "GET",
          headers: { "Cache-Control": "no-cache" },
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.authenticated && data?.user) {
            setIsAuthenticated(true);
            setUser({
              userId: data.user.userId,
              name: data.user.name,
              role: data.user.role,
              loggedInAt: data.user.expiresAt,
            });
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        }
      } catch (e) {
        console.warn("Lỗi kiểm tra phiên quản trị máy chủ:", e);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();
  }, []);

  const login = async (pinOrKey: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: pinOrKey }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setUser(data.user);
        return { success: true };
      }

      return {
        success: false,
        message: data.error || "Mật khẩu quản trị không chính xác!",
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "Không thể kết nối đến máy chủ xác thực",
      };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch {}
    setIsAuthenticated(false);
    setUser(null);
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
