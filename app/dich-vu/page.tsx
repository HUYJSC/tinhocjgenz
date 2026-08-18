import ServiceCard from "@/components/ServiceCard";
import { servicesData } from "@/data/mockData";
import { Settings, ShieldAlert, Cpu, HeartHandshake } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full bg-slate-50/30">
      
      {/* 1. Header Banner */}
      <section className="bg-white pt-20 pb-14 border-b border-slate-100 relative overflow-hidden tech-grid-pattern">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center border border-blue-100 bg-blue-50 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase text-blue-600">
            Dịch Vụ Máy Tính
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Cài Đặt & Sửa Chữa Máy Tính Uy Tín
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Dịch vụ kỹ thuật máy tính chuyên nghiệp, nhanh chóng. Hỗ trợ cài đặt hệ điều hành Windows, cài đặt Office bản quyền, cài đặt trọn bộ phần mềm đồ họa thiết kế và các phần mềm chuyên ngành khác theo yêu cầu từ xa cực kỳ tiện lợi.
          </p>
        </div>
      </section>

      {/* 2. Services Grid Section */}
      <section className="py-16 sm:py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Cam Kết Dịch Vụ Từ Thầy Giáo GenZ</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Mang lại trải nghiệm yên tâm tuyệt đối với dịch vụ chuẩn chỉ, chất lượng uy tín đặt lên hàng đầu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6 sm:p-7 bg-slate-50/50 rounded-3xl border border-slate-200/60 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-blue-50 smooth-transition">
                  <Settings size={20} />
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">Hỗ trợ Ultraview từ xa</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Với các phần mềm nhẹ hoặc lỗi cơ bản, hỗ trợ cài đặt và khắc phục online từ xa nhanh chóng mà không cần mang máy đi.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 sm:p-7 bg-slate-50/50 rounded-3xl border border-slate-200/60 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-cyan-500 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-cyan-50 smooth-transition">
                  <ShieldAlert size={20} />
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">Cam kết bảo mật dữ liệu</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Đảm bảo an toàn dữ liệu cá nhân của khách hàng tuyệt đối 100% trong suốt quá trình cài đặt phần mềm và hỗ trợ kỹ thuật.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 sm:p-7 bg-slate-50/50 rounded-3xl border border-slate-200/60 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-indigo-500 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-indigo-50 smooth-transition">
                  <Cpu size={20} />
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">Kích hoạt an toàn & Trọn đời</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Toàn bộ hệ điều hành, bộ Office và các phần mềm chuyên ngành đều được cài đặt, kích hoạt an toàn, không virus/mã độc, đảm bảo chạy cực kỳ ổn định.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 sm:p-7 bg-slate-50/50 rounded-3xl border border-slate-200/60 hover:border-blue-500/25 transition-all duration-500 shadow-premium hover:shadow-premium-hover group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-emerald-500 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-emerald-50 smooth-transition">
                  <HeartHandshake size={20} />
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug">Báo giá minh bạch</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Cam kết báo giá chính xác lỗi trước khi làm, không phát sinh chi phí phụ, hỗ trợ học viên với mức giá ưu đãi nhất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
