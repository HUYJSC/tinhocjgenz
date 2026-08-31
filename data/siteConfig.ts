export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  domain: string;
  url: string;
  author: string;
  keywords: string[];
  contact: {
    phone: string;
    displayPhone: string;
    zaloPhone: string;
    zaloUrl: string;
    email: string;
    address: string;
    workingHours: string;
  };
  socials: {
    facebook: string;
    youtube: string;
    tiktok?: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: "Tin Học Gen Z",
  shortName: "Tin Học Gen Z",
  tagline: "Đào Tạo MOS, IC3 & Tin Học Văn Phòng Thực Chiến",
  description:
    "Hệ sinh thái đào tạo Tin học văn phòng thực chiến, luyện thi chứng chỉ quốc tế MOS, IC3 GS6 chuẩn Certiport. Cam kết tài trợ học lại 100% miễn phí cho đến khi thi đỗ.",
  domain: "tinhocgenz.io.vn",
  url: "https://tinhocgenz.io.vn",
  author: "Tin Học Gen Z",
  keywords: [
    "Tin Học Gen Z",
    "tinhocgenz",
    "luyện thi MOS",
    "chứng chỉ IC3 GS6",
    "tin học văn phòng thực chiến",
    "khóa học excel nâng cao",
    "chứng chỉ tin học quốc tế",
    "tin học sinh viên",
    "tin học người đi làm",
    "ứng dụng AI văn phòng",
  ],
  contact: {
    phone: "0332298065",
    displayPhone: "033.229.8065",
    zaloPhone: "0332298065",
    zaloUrl: "https://zalo.me/0332298065",
    email: "tinhocgenz@gmail.com",
    address: "Đào tạo Online Toàn quốc & Trực tiếp tại Cơ sở đào tạo liên kết",
    workingHours: "8:00 - 22:30 (Hỗ trợ 24/7 từ Thứ 2 đến Chủ nhật)",
  },
  socials: {
    facebook: "https://www.facebook.com/Thaygiaogenz13",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
};
