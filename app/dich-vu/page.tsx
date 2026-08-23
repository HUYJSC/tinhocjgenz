import ServiceCard from "@/components/ServiceCard";
import { servicesData } from "@/data/mockData";
import { Settings, ShieldAlert, Cpu, HeartHandshake, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full bg-slate-50/30">
      
      {/* 1. Header Banner */}
      <section className="bg-white pt-20 pb-14 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-700">
            <Wrench size={13} className="text-blue-600" />
            PH DIGITAL EDUCATION • DỊCH VỤ CÔNG NGHỆ THÔNG TIN
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Cài Đặt Phần Mềm & Giải Pháp Dữ Liệu
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Hỗ trợ kỹ thuật từ xa nhanh chóng qua Ultraviewer/Anydesk. Cài đặt hệ điều hành Windows, Office bản quyền, phần mềm đồ họa kỹ thuật và thiết kế Dashboard Excel theo yêu cầu.
          </p>
        </div>
      </section>

      {/* 2. Services Grid Section */}
      <section className="py-16 sm:py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Value Props / Trust Elements */}
      <section className="py-16 bg-white border-t border-slate-100/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Cam Kết Dịch Vụ Từ PH Digital Education</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Trải nghiệm an tâm tuyệt đối với quy trình kỹ thuật minh bạch, bảo mật dữ liệu khách hàng tuyệt đối 100%.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-50/70 rounded-3xl border border-slate-200/70 hover:border-blue-500/25 transition-all duration-300 shadow-premium hover:shadow-premium-hover flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-blue-600 flex items-center justify-center shadow-sm">
                  <Settings size={20} />
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">Hỗ Trợ Từ Xa Siêu Tốc</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Cài đặt trực tiếp qua Ultraviewer / Anydesk tiện lợi, tiết kiệm thời gian, không cần mang máy ra tiệm.
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50/70 rounded-3xl border border-slate-200/70 hover:border-blue-500/25 transition-all duration-300 shadow-premium hover:shadow-premium-hover flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-cyan-500 flex items-center justify-center shadow-sm">
                  <ShieldAlert size={20} />
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">Tuyệt Đối Bảo Mật</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Cam kết bảo vệ 100% dữ liệu học tập, đồ án và bí mật kinh doanh của khách hàng trong quá trình cài đặt.
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50/70 rounded-3xl border border-slate-200/70 hover:border-blue-500/25 transition-all duration-300 shadow-premium hover:shadow-premium-hover flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-indigo-500 flex items-center justify-center shadow-sm">
                  <Cpu size={20} />
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">Bản Quyền Ổn Định</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Cài đặt bản chuẩn không virus, tối ưu card màn hình và tốc độ khởi động để máy chạy siêu mượt mà.
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50/70 rounded-3xl border border-slate-200/70 hover:border-blue-500/25 transition-all duration-300 shadow-premium hover:shadow-premium-hover flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-emerald-500 flex items-center justify-center shadow-sm">
                  <HeartHandshake size={20} />
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">Bảo Hành Dài Hạn</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Bảo hành hỗ trợ xử lý lại miễn phí trong 6 tháng nếu hệ điều hành hoặc phần mềm phát sinh lỗi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
