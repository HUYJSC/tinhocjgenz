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
  name: "PH Digital Education",
  shortName: "PH Digital Education",
  tagline: "Đào Tạo Tin Học Thực Chiến & Luyện Thi Chứng Chỉ Quốc Tế MOS, IC3 Toàn Diện",
  description:
    "PH DIGITAL EDUCATION - Hệ sinh thái đào tạo Tin học Văn phòng Thực chiến & Luyện thi Chứng chỉ Quốc tế MOS, IC3 chuẩn Certiport cho Học sinh, Sinh viên, Người đi làm và Doanh nghiệp trên toàn quốc. Cam kết bao đỗ 100%.",
  domain: "tinhocgenz.io.vn",
  url: "https://www.tinhocgenz.io.vn",
  author: "PH Digital Education",
  keywords: [
    "PH Digital Education",
    "luyện thi MOS",
    "chứng chỉ IC3",
    "tin học văn phòng thực chiến",
    "học excel nâng cao",
    "chứng chỉ tin học quốc tế certiport",
    "tin học cho người đi làm",
    "tin học cho sinh viên",
    "cài office bản quyền",
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
