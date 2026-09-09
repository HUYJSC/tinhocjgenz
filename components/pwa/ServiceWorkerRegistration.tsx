"use client";

import { useEffect, useSyncExternalStore } from "react";

function subscribeToNetworkStatus(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const register = () => { void navigator.serviceWorker.register("/sw.js", { scope: "/" }); };
    if (document.readyState === "complete") {
      register();
      return;
    }
    window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);

  const isOnline = useSyncExternalStore(subscribeToNetworkStatus, () => navigator.onLine, () => true);
  return isOnline ? null : (
    <div role="status" aria-live="polite" className="offline-banner">
      Bạn đang ngoại tuyến. Nội dung đã tải trước vẫn có thể xem.
    </div>
  );
}
