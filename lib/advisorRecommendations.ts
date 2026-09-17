export interface RecommendationResult {
  title: string;
  link: string;
  duration: string;
  passRate: string;
  scoreTarget: string;
  discount: string;
  code: string;
  summary: string;
}

export function getRoleLabel(userRole: string): string {
  switch (userRole) {
    case "student":
      return "Học Sinh & Sinh Viên";
    case "worker":
      return "Người Đi Làm & Kế Toán";
    case "business":
      return "Doanh Nghiệp & Tổ Chức";
    default:
      return "Người Mới Bắt Đầu";
  }
}

export function getCourseRecommendation(userRole: string, certificateTarget: string): RecommendationResult {
  if (userRole === "worker" && certificateTarget === "excel-ai") {
    return {
      title: "Combo Thực Chiến Excel & Ứng Dụng AI Đột Phá 10X",
      link: "/khoa-hoc/combo-survival-office",
      duration: "4 - 6 buổi thực chiến",
      passRate: "100% ứng dụng ngay",
      scoreTarget: "Tối ưu 80% thời gian làm việc",
      discount: "Giảm 30% khi đăng ký hôm nay",
      code: "AI-PRO-30",
      summary: "Làm chủ Excel Dashboard, PivotTable động, các hàm nâng cao và ứng dụng AI tự động hóa công việc văn phòng.",
    };
  }

  if (certificateTarget === "ic3") {
    return {
      title: "Khóa Luyện Thi Chứng Chỉ Kỹ Năng Số IC3 GS6",
      link: "/khoa-hoc/ic3-gs6",
      duration: "3 - 5 buổi trọng tâm",
      passRate: "100% bao đỗ",
      scoreTarget: "950+ / 1000",
      discount: "Giảm 30% khi đăng ký nhóm",
      code: "AI-IC3-30",
      summary: "Bao quát toàn diện 3 cấp độ Máy tính, Ứng dụng văn phòng và Cuộc sống trực tuyến theo chuẩn GS6 mới nhất.",
    };
  }

  if (certificateTarget === "mos-single") {
    return {
      title: "Luyện Thi MOS 2019 / 365 Từng Môn Cấp Tốc (Word / Excel)",
      link: "/khoa-hoc/mos-2019",
      duration: "3 buổi thực chiến",
      passRate: "100% bao đỗ",
      scoreTarget: "980+ / 1000",
      discount: "Tặng tài khoản thi thử Certiport",
      code: "AI-MOS-FAST",
      summary: "Luyện thẳng trên ngân hàng đề thi thật Multi-Project của IIG, chỉ mẹo tránh bẫy đạt điểm tuyệt đối.",
    };
  }

  return {
    title: "Combo MOS Master 3 Môn (Word + Excel + PowerPoint)",
    link: "/khoa-hoc/mos-master-combo",
    duration: "6 - 9 buổi toàn diện",
    passRate: "100% bao đỗ",
    scoreTarget: "1000 / 1000 Điểm",
    discount: "Tiết kiệm 50% học phí trọn gói",
    code: "AI-COMBO-MASTER",
    summary: "Gói giải pháp trọn gói nâng cao kỹ năng và sở hữu bằng quốc tế Certiport trọn đời.",
  };
}

