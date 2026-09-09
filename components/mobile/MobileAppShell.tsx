"use client";

import {
  Bell,
  BookOpen,
  FileText,
  GraduationCap,
  Home,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type OverlayName = "drawer" | "search" | "notifications" | null;

const SEARCH_ITEMS = [
  { label: "Tất cả khóa học", description: "MOS, IC3 và tin học văn phòng", href: "/khoa-hoc" },
  { label: "Luyện thi MOS", description: "Word, Excel và PowerPoint", href: "/mos" },
  { label: "Chứng chỉ IC3 GS6", description: "Kỹ năng số chuẩn quốc tế", href: "/ic3" },
  { label: "Thi thử miễn phí", description: "Kiểm tra trình độ trong 5 phút", href: "/thi-thu" },
  { label: "Kho học liệu", description: "Tài liệu và đề thi mẫu", href: "/tai-lieu" },
  { label: "Cẩm nang học tập", description: "Mẹo thi và kiến thức mới", href: "/blog" },
  { label: "Bảng giá học phí", description: "Học phí và ưu đãi hiện hành", href: "/bang-gia" },
];

const BOTTOM_NAV = [
  { label: "Trang chủ", shortLabel: "Trang chủ", href: "/", icon: Home, match: (path: string) => path === "/" },
  { label: "Khóa học", shortLabel: "Khóa học", href: "/khoa-hoc", icon: GraduationCap, match: (path: string) => ["/khoa-hoc", "/mos", "/ic3", "/word", "/excel", "/powerpoint", "/python", "/cntt-co-ban", "/tin-hoc-van-phong"].some((route) => path === route || path.startsWith(`${route}/`)) },
  { label: "Thi thử", shortLabel: "Thi thử", href: "/thi-thu", icon: FileText, match: (path: string) => path.startsWith("/thi-thu") },
  { label: "Học liệu", shortLabel: "Học liệu", href: "/tai-lieu", icon: BookOpen, match: (path: string) => path.startsWith("/tai-lieu") || path.startsWith("/blog") || path.startsWith("/tin-cong-nghe") },
  { label: "Tài khoản", shortLabel: "Tài khoản", href: "/portal/student", icon: UserRound, match: (path: string) => path.startsWith("/portal") },
];

const DRAWER_GROUPS = [
  {
    title: "Khóa học",
    items: [
      ["Tất cả khóa học", "/khoa-hoc"],
      ["Luyện thi MOS", "/mos"],
      ["Chứng chỉ IC3", "/ic3"],
      ["CNTT cơ bản", "/cntt-co-ban"],
      ["Word", "/word"],
      ["Excel", "/excel"],
      ["PowerPoint", "/powerpoint"],
    ],
  },
  {
    title: "Khám phá",
    items: [
      ["Học liệu", "/tai-lieu"],
      ["Thi thử", "/thi-thu"],
      ["Tin tức & cẩm nang", "/blog"],
      ["Bảng giá", "/bang-gia"],
      ["Giới thiệu", "/gioi-thieu"],
      ["Liên hệ", "/lien-he"],
    ],
  },
] as const;

function useAccessibleOverlay(open: boolean, onClose: () => void) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return { panelRef, closeRef };
}

function MobileDrawer({ open, pathname, onClose }: { open: boolean; pathname: string; onClose: () => void }) {
  const { panelRef, closeRef } = useAccessibleOverlay(open, onClose);
  if (!open) return null;

  return (
    <div className="mobile-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        className="mobile-drawer"
      >
        <div className="mobile-sheet-heading">
          <div>
            <p className="mobile-kicker">Điều hướng</p>
            <h2 id="mobile-menu-title" className="text-lg font-black text-slate-950">Khám phá Tin Học Gen Z</h2>
          </div>
          <button ref={closeRef} type="button" className="mobile-icon-button" onClick={onClose} aria-label="Đóng menu">
            <X size={22} aria-hidden="true" />
          </button>
        </div>

        <div className="mobile-drawer-content">
          {DRAWER_GROUPS.map((group) => (
            <section key={group.title} aria-labelledby={`drawer-${group.title}`}>
              <h3 id={`drawer-${group.title}`} className="mobile-drawer-group-title">{group.title}</h3>
              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-1">
                {group.items.map(([label, href]) => {
                  const active = pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <Link key={href} href={href} onClick={onClose} aria-current={active ? "page" : undefined} className={`mobile-drawer-link ${active ? "is-active" : ""}`}>
                      {label}
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}

          <section aria-labelledby="drawer-lms">
            <h3 id="drawer-lms" className="mobile-drawer-group-title">Hệ thống học trực tuyến</h3>
            <div className="grid gap-2">
              <a href="https://hoctructuyen.tinhocgenz.io.vn/" target="_blank" rel="noopener noreferrer" onClick={() => { trackEvent("student_portal_click", { source: "mobile_drawer" }); onClose(); }} className="mobile-portal-link">
                <GraduationCap size={20} aria-hidden="true" />
                <span><strong>Cổng Học viên</strong><small>Đăng nhập và vào lớp học</small></span>
              </a>
              <a href="https://hoctructuyen.tinhocgenz.io.vn/" target="_blank" rel="noopener noreferrer" onClick={() => { trackEvent("teacher_portal_click", { source: "mobile_drawer" }); onClose(); }} className="mobile-portal-link mobile-portal-link--teacher">
                <UserRound size={20} aria-hidden="true" />
                <span><strong>Cổng Giảng viên</strong><small>Quản lý lớp và học viên</small></span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function MobileSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [recentHrefs] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem("tinhocgenz-mobile-search-history") || "[]").slice(0, 3);
    } catch {
      return [];
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const { panelRef, closeRef } = useAccessibleOverlay(open, onClose);
  const normalizedQuery = query.trim().toLocaleLowerCase("vi");
  const results = useMemo(() => {
    if (normalizedQuery) return SEARCH_ITEMS.filter((item) => `${item.label} ${item.description}`.toLocaleLowerCase("vi").includes(normalizedQuery));
    const recent = recentHrefs.map((href) => SEARCH_ITEMS.find((item) => item.href === href)).filter((item): item is (typeof SEARCH_ITEMS)[number] => Boolean(item));
    return [...recent, ...SEARCH_ITEMS.filter((item) => !recentHrefs.includes(item.href))].slice(0, 5);
  }, [normalizedQuery, recentHrefs]);

  const rememberSearch = (href: string) => {
    try {
      const history = [href, ...recentHrefs.filter((item) => item !== href)].slice(0, 3);
      window.localStorage.setItem("tinhocgenz-mobile-search-history", JSON.stringify(history));
    } catch {
      // Search remains usable when storage is unavailable.
    }
  };

  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => window.clearTimeout(focusTimer);
  }, [open]);

  if (!open) return null;
  return (
    <div className="mobile-overlay mobile-overlay--search" role="presentation">
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="mobile-search-title" className="mobile-search-panel">
        <div className="mobile-sheet-heading">
          <div>
            <p className="mobile-kicker">Tìm nhanh</p>
            <h2 id="mobile-search-title" className="text-lg font-black text-slate-950">Bạn muốn học gì?</h2>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="mobile-icon-button" aria-label="Đóng tìm kiếm"><X size={22} /></button>
        </div>
        <div className="mobile-search-field">
          <Search size={20} aria-hidden="true" />
          <input ref={inputRef} type="search" inputMode="search" enterKeyHint="search" autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="MOS, Excel, thi thử…" aria-label="Từ khóa tìm kiếm" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Xóa từ khóa"><X size={18} /></button>}
        </div>
        <div className="mobile-search-results" aria-live="polite">
          <p className="text-sm font-bold text-slate-500">{normalizedQuery ? `${results.length} kết quả phù hợp` : recentHrefs.length ? "Tìm gần đây & gợi ý" : "Gợi ý phổ biến"}</p>
          {results.length ? results.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => { rememberSearch(item.href); trackEvent("mobile_search", { query, result: item.href }); onClose(); }} className="mobile-search-result">
              <span><strong>{item.label}</strong><small>{item.description}</small></span>
              <span aria-hidden="true">›</span>
            </Link>
          )) : (
            <div className="mobile-empty-state"><Search size={28} /><strong>Chưa tìm thấy nội dung</strong><span>Thử “MOS”, “Excel” hoặc “thi thử”.</span></div>
          )}
        </div>
      </div>
    </div>
  );
}

function NotificationSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { panelRef, closeRef } = useAccessibleOverlay(open, onClose);
  if (!open) return null;
  return (
    <div className="mobile-overlay mobile-overlay--bottom" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="notification-title" className="mobile-bottom-sheet">
        <div className="mobile-sheet-handle" aria-hidden="true" />
        <div className="mobile-sheet-heading">
          <div><p className="mobile-kicker">Cập nhật</p><h2 id="notification-title" className="text-lg font-black text-slate-950">Thông báo</h2></div>
          <button ref={closeRef} type="button" onClick={onClose} className="mobile-icon-button" aria-label="Đóng thông báo"><X size={22} /></button>
        </div>
        <div className="mobile-empty-state py-8"><Bell size={30} /><strong>Chưa có thông báo mới</strong><span>Thông báo lớp học sẽ hiển thị trong hệ thống học trực tuyến.</span></div>
        <a href="https://hoctructuyen.tinhocgenz.io.vn/" target="_blank" rel="noopener noreferrer" className="mobile-primary-button" onClick={onClose}>Mở hệ thống học tập</a>
      </div>
    </div>
  );
}

export default function MobileAppShell() {
  const pathname = usePathname();
  const isPortal = pathname.startsWith("/portal");
  const [overlay, setOverlay] = useState<OverlayName>(null);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeOverlay = useCallback(() => {
    setOverlay(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);
  const openOverlay = (name: Exclude<OverlayName, null>, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setOverlay(name);
    if (name === "drawer") trackEvent("mobile_menu_open", { path: pathname });
  };

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const updateKeyboardState = () => setKeyboardOpen(window.innerHeight - viewport.height > 150);
    viewport.addEventListener("resize", updateKeyboardState);
    viewport.addEventListener("scroll", updateKeyboardState);
    return () => {
      viewport.removeEventListener("resize", updateKeyboardState);
      viewport.removeEventListener("scroll", updateKeyboardState);
    };
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      document.body.classList.remove("has-mobile-shell");
      return;
    }
    document.body.classList.add("has-mobile-shell");
    return () => {
      document.body.classList.remove("has-mobile-shell");
    };
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="mobile-app-shell lg:hidden">
      {!isPortal && <header className="mobile-app-header">
        <Link href="/" className="mobile-brand" aria-label="Tin Học Gen Z - Trang chủ">
          <Image src="/logo-icon.png" width={40} height={40} alt="" aria-hidden="true" priority />
          <span><strong>TIN HỌC GEN Z</strong><small>MOS • IC3 • VĂN PHÒNG</small></span>
        </Link>
        <div className="flex items-center gap-1">
          <button type="button" className="mobile-icon-button" onClick={(event) => openOverlay("search", event.currentTarget)} aria-label="Mở tìm kiếm"><Search size={21} /></button>
          <button type="button" className="mobile-icon-button relative" onClick={(event) => openOverlay("notifications", event.currentTarget)} aria-label="Mở thông báo"><Bell size={21} /></button>
          <button type="button" className="mobile-icon-button" onClick={(event) => openOverlay("drawer", event.currentTarget)} aria-label="Mở menu" aria-expanded={overlay === "drawer"}><Menu size={22} /></button>
        </div>
      </header>}

      <nav className={`mobile-bottom-nav ${keyboardOpen ? "is-keyboard-open" : ""}`} aria-label="Điều hướng chính trên di động">
        {BOTTOM_NAV.map((item) => {
          const Icon = item.icon;
          const active = item.match(pathname);
          return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`mobile-bottom-nav-item ${active ? "is-active" : ""}`} onClick={() => trackEvent(item.href === "/thi-thu" ? "exam_click" : item.href === "/khoa-hoc" ? "course_click" : "mobile_navigation", { destination: item.href })}><Icon size={21} strokeWidth={active ? 2.5 : 2} /><span>{item.shortLabel}</span></Link>;
        })}
      </nav>

      <MobileDrawer open={overlay === "drawer"} pathname={pathname} onClose={closeOverlay} />
      <MobileSearch open={overlay === "search"} onClose={closeOverlay} />
      <NotificationSheet open={overlay === "notifications"} onClose={closeOverlay} />
    </div>
  );
}
