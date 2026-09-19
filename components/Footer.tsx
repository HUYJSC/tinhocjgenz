import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#003F88]/30 bg-[#0B2545] text-slate-200" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 xl:grid-cols-4">
          <section aria-label="Thông tin Tin Học Gen Z">
            <div className="mb-4">
              <BrandLogo variant="horizontal" theme="light" size="lg" />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              Đào tạo tin học văn phòng thực chiến và luyện thi chứng chỉ quốc tế theo lộ trình rõ ràng, bám sát yêu cầu tuyển dụng của doanh nghiệp.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4.5 space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <ShieldCheck size={18} className="text-[#5f9ee2]" aria-hidden="true" />
                Cam kết chất lượng đào tạo
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                Tài trợ học lại hoàn toàn miễn phí 0đ nếu học viên chưa đạt điểm chuẩn đầu ra Certiport đã cam kết.
              </p>
            </div>
          </section>

          <nav aria-label="Chương trình đào tạo">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Chương trình đào tạo</h2>
            <ul className="mt-4 space-y-3">
              {courseLinks.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-300 transition-colors hover:text-white hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/khoa-hoc" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#5f9ee2] hover:text-white">
                  <span>Xem tất cả khóa học</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Học liệu và thông tin">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Học liệu & thông tin</h2>
            <ul className="mt-4 space-y-3">
              {resourceLinks.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-slate-300 transition-colors hover:text-white hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00A3FF] hover:text-white"
                >
                  <span>Đăng ký nhận tư vấn 1:1</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          <section aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title" className="text-sm font-bold uppercase tracking-wider text-white">Tư vấn tuyển sinh</h2>
            <ul className="mt-4 space-y-3.5 text-sm text-slate-300">
              <li className="flex gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-[#5f9ee2]" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-slate-400 font-medium">Hotline / Zalo hỗ trợ</span>
                  <a className="font-bold text-white hover:text-[#5f9ee2]" href={`tel:${SITE_CONFIG.contact.phone}`}>
                    {SITE_CONFIG.contact.displayPhone}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-[#5f9ee2]" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-slate-400 font-medium">Email học vụ</span>
                  <a className="text-slate-200 hover:text-white hover:underline" href={`mailto:${SITE_CONFIG.contact.email}`}>
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-[#5f9ee2]" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-slate-400 font-medium">Thời gian hỗ trợ</span>
                  <span className="text-slate-200">{SITE_CONFIG.contact.workingHours}</span>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#5f9ee2]" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-slate-400 font-medium">Hình thức đào tạo</span>
                  <span className="text-slate-200">{SITE_CONFIG.contact.address}</span>
                </div>
              </li>
            </ul>
            <Link
              href="/lien-he"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0057B8] px-5 text-sm font-bold text-white transition-colors hover:bg-[#003F88] shadow-sm w-full sm:w-auto"
            >
              <span>Đăng ký tư vấn lộ trình</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </section>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Tin Học Gen Z. Nền tảng đào tạo kỹ năng số chuẩn quốc tế.</p>
          <nav aria-label="Chính sách" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/gioi-thieu#bao-mat" className="hover:text-white">Chính sách bảo mật</Link>
            <Link href="/gioi-thieu#dieu-khoan" className="hover:text-white">Điều khoản sử dụng</Link>
            <Link href="/gioi-thieu#hoan-tien" className="hover:text-white">Chính sách hoàn tiền 0đ</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
