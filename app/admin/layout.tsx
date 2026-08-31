"use client";

import React, { useState } from "react";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { AdminAuthGate } from "./components/AdminAuthGate";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminTopbar } from "./components/AdminTopbar";
import { X } from "lucide-react";

export default function AdminRootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AdminAuthProvider>
      <AdminAuthGate>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
          <div className="flex flex-1 overflow-hidden">
            {/* Desktop Sidebar (Fixed Left) */}
            <div className="hidden lg:block">
              <AdminSidebar />
            </div>

            {/* Mobile Drawer Overlay */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-50 lg:hidden flex">
                <div
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                  onClick={() => setMobileMenuOpen(false)}
                />
                <div className="relative flex flex-col w-72 max-w-[85vw] bg-slate-900 z-10 shadow-2xl">
                  <div className="absolute top-4 right-4 z-20">
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <AdminSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
                </div>
              </div>
            )}

            {/* Right Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
              <AdminTopbar onOpenMobile={() => setMobileMenuOpen(true)} />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                {children}
              </main>
            </div>
          </div>
        </div>
      </AdminAuthGate>
    </AdminAuthProvider>
  );
}
