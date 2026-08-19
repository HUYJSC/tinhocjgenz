import { SITE_CONFIG } from "./siteConfig";

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
  phone: SITE_CONFIG.contact.phone,
  displayPhone: SITE_CONFIG.contact.displayPhone,
  zaloPhone: SITE_CONFIG.contact.zaloPhone,
  zaloUrl: SITE_CONFIG.contact.zaloUrl,
  email: SITE_CONFIG.contact.email,
  address: SITE_CONFIG.contact.address,
  workingHours: SITE_CONFIG.contact.workingHours,
  facebookUrl: SITE_CONFIG.socials.facebook,
  youtubeUrl: SITE_CONFIG.socials.youtube,
  tiktokUrl: SITE_CONFIG.socials.tiktok,
};
