import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

const courseLinks = [
  ["/mos", "Luyện thi MOS 2019/365"],
  ["/ic3", "Chứng chỉ IC3 GS6"],
  ["/excel", "Excel & Dashboard"],
  ["/word", "Word chuyên nghiệp"],
  ["/powerpoint", "PowerPoint"],
  ["/python", "Python tự động hóa"],
] as const;

const resourceLinks = [
  ["/thi-thu", "Thi thử online"],
  ["/tai-lieu", "Kho tài liệu"],
  ["/blog", "Cẩm nang học tập"],
  ["/tin-cong-nghe", "Tin công nghệ & AI"],
  ["/bang-gia", "Bảng giá"],
  ["/lien-he", "Liên hệ"],
] as const;

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm leading-6 text-blue-100 transition-colors hover:text-white">
      {children}
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-blue-900 bg-blue-950 text-blue-100" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 border-b border-blue-900 pb-10 md:grid-cols-2 xl:grid-cols-4">
          <section aria-label="Thông tin Tin Học Gen Z">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Tin Học Gen Z - Trang chủ">
              <Image src="/logo-icon.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
              <span>
                <strong className="block text-base font-bold text-white">TIN HỌC GEN Z</strong>
                <span className="block text-xs font-medium text-blue-200">MOS · IC3 · TIN HỌC VĂN PHÒNG</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100/80">
              Đào tạo tin học văn phòng thực chiến và luyện thi chứng chỉ quốc tế theo lộ trình rõ ràng, dễ áp dụng vào học tập và công việc.
            </p>
            <div className="mt-5 rounded-xl border border-blue-800 bg-blue-900/50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldCheck size={18} aria-hidden="true" />
                Cam kết đào tạo
              </div>
              <p className="mt-2 text-sm leading-6 text-blue-100/80">
                Hỗ trợ học lại theo chính sách khóa học nếu học viên chưa đạt chuẩn đầu ra đã công bố.
              </p>
            </div>
          </section>

          <nav aria-label="Chương trình đào tạo">
            <h2 className="text-sm font-bold uppercase tracking-wide text-white">Chương trình đào tạo</h2>
            <ul className="mt-4 space-y-2.5">
              {courseLinks.map(([href, label]) => (
                <li key={href}><FooterLink href={href}>{label}</FooterLink></li>
              ))}
              <li className="pt-1">
                <Link href="/khoa-hoc" className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline">
                  Xem tất cả khóa học <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Học liệu và thông tin">
            <h2 className="text-sm font-bold uppercase tracking-wide text-white">Học liệu & thông tin</h2>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map(([href, label]) => (
                <li key={href}><FooterLink href={href}>{label}</FooterLink></li>
              ))}
              <li className="pt-1">
                <a
                  href="https://hoctructuyen.tinhocgenz.io.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:underline"
                >
                  Hệ thống học tập <ArrowRight size={14} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>

          <section aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title" className="text-sm font-bold uppercase tracking-wide text-white">Tư vấn & học vụ</h2>
            <ul className="mt-4 space-y-4 text-sm text-blue-100/85">
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-blue-300" aria-hidden="true" />
                <span><span className="block text-xs text-blue-300">Hotline / Zalo</span><a className="font-semibold text-white hover:underline" href={`tel:${SITE_CONFIG.contact.phone}`}>{SITE_CONFIG.contact.displayPhone}</a></span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-blue-300" aria-hidden="true" />
                <span><span className="block text-xs text-blue-300">Email</span><a className="break-all text-white hover:underline" href={`mailto:${SITE_CONFIG.contact.email}`}>{SITE_CONFIG.contact.email}</a></span>
              </li>
              <li className="flex gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-blue-300" aria-hidden="true" />
                <span><span className="block text-xs text-blue-300">Thời gian hỗ trợ</span>{SITE_CONFIG.contact.workingHours}</span>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-blue-300" aria-hidden="true" />
                <span><span className="block text-xs text-blue-300">Hình thức đào tạo</span>{SITE_CONFIG.contact.address}</span>
              </li>
            </ul>
            <Link href="/lien-he" className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50">
              Đăng ký tư vấn <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </section>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-blue-200/75 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Tin Học Gen Z. All rights reserved.</p>
          <nav aria-label="Chính sách" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/gioi-thieu#bao-mat" className="hover:text-white">Chính sách bảo mật</Link>
            <Link href="/gioi-thieu#dieu-khoan" className="hover:text-white">Điều khoản sử dụng</Link>
            <Link href="/gioi-thieu#hoan-tien" className="hover:text-white">Chính sách hoàn tiền</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
