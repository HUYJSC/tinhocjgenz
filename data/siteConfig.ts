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
  shortName: "TinHocGenZ",
  tagline: "Tin Học Ứng Dụng & Kỹ Năng Số",
  description:
    "Tin Học Gen Z đào tạo tin học ứng dụng, MOS, IC3, CNTT cơ bản và nâng cao theo lộ trình thực tiễn, học online và offline.",
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
