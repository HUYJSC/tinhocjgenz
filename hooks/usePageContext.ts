"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { PageContext } from "@/types/ai-assistant";

export function usePageContext(): PageContext {
  const pathname = usePathname();

  return useMemo<PageContext>(() => {
    const path = pathname || "/";

    if (path === "/") {
      return { pageType: "home", pathname: "/" };
    }

    if (path.startsWith("/python")) {
      return {
        pageType: "course",
        pathname: path,
        courseId: "python-starter",
        courseName: "Lập trình Python cho người mới bắt đầu",
        category: "programming",
      };
    }

    if (path.startsWith("/mos")) {
      return {
        pageType: "course",
        pathname: path,
        courseId: "mos-master-combo",
        courseName: "Luyện thi MOS Master Combo (Word, Excel, PowerPoint)",
        category: "certification",
      };
    }

    if (path.startsWith("/ic3")) {
      return {
        pageType: "course",
        pathname: path,
        courseId: "ic3-gs6",
        courseName: "Chứng chỉ Tin học Quốc tế IC3 GS6",
        category: "certification",
      };
    }

    if (path.startsWith("/excel")) {
      return {
        pageType: "course",
        pathname: path,
        courseId: "excel-pro",
        courseName: "Excel thực chiến từ cơ bản đến nâng cao",
        category: "office",
      };
    }

    if (path.startsWith("/word")) {
      return {
        pageType: "course",
        pathname: path,
        courseId: "word-pro",
        courseName: "Word thực chiến & soạn thảo chuyên nghiệp",
        category: "office",
      };
    }

    if (path.startsWith("/powerpoint")) {
      return {
        pageType: "course",
        pathname: path,
        courseId: "powerpoint-pro",
        courseName: "PowerPoint thiết kế slide & thuyết trình",
        category: "office",
      };
    }

    if (path.startsWith("/tin-hoc-van-phong") || path.startsWith("/cntt-co-ban")) {
      return {
        pageType: "course",
        pathname: path,
        courseName: "Tin học văn phòng toàn diện",
        category: "office",
      };
    }

    if (path.startsWith("/khoa-hoc")) {
      return {
        pageType: "course",
        pathname: path,
        category: "all-courses",
      };
    }

    if (path.startsWith("/thi-thu")) {
      return { pageType: "exam", pathname: path };
    }

    if (path.startsWith("/tai-lieu")) {
      return { pageType: "docs", pathname: path };
    }

    if (path.startsWith("/bang-gia")) {
      return { pageType: "pricing", pathname: path };
    }

    if (path.startsWith("/gioi-thieu")) {
      return { pageType: "about", pathname: path };
    }

    return { pageType: "other", pathname: path };
  }, [pathname]);
}
