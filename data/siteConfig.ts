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
  name: "Thầy giáo GenZ",
  shortName: "TinhocGenZ",
  tagline: "Học Tin Học Văn Phòng Thực Chiến Đột Phá",
  description:
    "Trung tâm đào tạo Tin học văn phòng thực chiến theo phong cách GenZ tại tinhocgenz.io.vn. Cam kết làm được việc ngay. Excel nâng cao, Word, PowerPoint, Luyện thi MOS. Dịch vụ cài đặt Windows, Office, cài phần mềm đồ họa & theo yêu cầu uy tín.",
  domain: "tinhocgenz.io.vn",
  url: "https://www.tinhocgenz.io.vn",
  author: "Thầy giáo GenZ",
  keywords: [
    "tin hoc van phong",
    "excel nang cao",
    "hoc excel online",
    "luyen thi mos",
    "thay giao genz",
    "tinhocgenz",
    "cai win",
    "cai office",
    "cai phan mem do hoa",
    "cai phan mem theo yeu cau",
  ],
  contact: {
    phone: "0332298065",
    displayPhone: "033.229.8065",
    zaloPhone: "0332298065",
    zaloUrl: "https://zalo.me/0332298065",
    email: "tinhocgenz@gmail.com",
    address: "Học trực tuyến & Hỗ trợ toàn quốc",
    workingHours: "8:00 - 22:00 (Từ Thứ 2 đến Chủ nhật)",
  },
  socials: {
    facebook: "https://www.facebook.com/Thaygiaogenz13",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
};
