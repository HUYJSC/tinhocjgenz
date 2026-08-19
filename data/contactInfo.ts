export interface ContactInfo {
  phone: string;
  displayPhone: string;
  zaloPhone?: string;
  zaloUrl?: string;
  email: string;
  address: string;
  workingHours: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
}

export const CONTACT_INFO: ContactInfo = {
  // Thay đổi số điện thoại ở đây (chỉ cần đổi 1 nơi là toàn bộ web tự cập nhật)
  phone: "0332290865",
  displayPhone: "033.229.0865",
  zaloPhone: "0332290865",
  zaloUrl: "https://zalo.me/0332290865",
  
  // Thông tin liên hệ khác
  email: "tinhocgenz@gmail.com",
  address: "Học trực tuyến & Hỗ trợ toàn quốc",
  workingHours: "8:00 - 22:00 (Từ Thứ 2 đến Chủ nhật)",
  
  // Mạng xã hội
  facebookUrl: "https://www.facebook.com/Thaygiaogenz13",
  youtubeUrl: "https://youtube.com",
  tiktokUrl: "https://tiktok.com",
};
