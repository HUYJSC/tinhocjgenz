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

    // Clean up any stale/legacy caches from earlier versions
    if ("caches" in window) {
      caches.keys().then((keys) => {
        const CURRENT_CACHE = "tinhocgenz-brand-v9";
        keys.forEach((key) => {
          if (key !== CURRENT_CACHE) {
            caches.delete(key);
          }
        });
      });
    }

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((registration) => {
          // If a new worker is installed, update immediately
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  // New update available, claim clients
                  newWorker.postMessage({ type: "SKIP_WAITING" });
                }
              });
            }
          });
        })
        .catch(() => {});
    };

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
