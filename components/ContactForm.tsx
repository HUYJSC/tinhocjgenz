"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { coursesData, servicesData } from "@/data/mockData";

// Wrapper component to provide Suspense boundary
export default function ContactForm() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center p-8 bg-white rounded-2xl border border-slate-200 shadow-xl">
        <Loader2 className="animate-spin text-blue-600 mr-2" />
        <span className="text-slate-500 font-medium">Đang tải biểu mẫu...</span>
      </div>
    }>
      <ContactFormContent />
    </Suspense>
  );
}

function ContactFormContent() {
  const searchParams = useSearchParams();
  
  // Combine all selectable courses & services
  const selectionOptions = [
    { category: "Khóa học Tin học", items: coursesData.map(c => ({ id: c.id, name: c.title })) },
    { category: "Dịch vụ Máy tính", items: servicesData.map(s => ({ id: s.id, name: s.name })) }
  ];

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    selection: "",
    message: ""
  });

  // Validation States
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Pre-fill selection based on search parameters
  useEffect(() => {
    const preselect = searchParams.get("select");
    if (preselect) {
      // Find matching item inside courses or services
      const hasMatch = [...coursesData, ...servicesData].some(item => item.id === preselect);
      if (hasMatch) {
        setFormData(prev => ({ ...prev, selection: preselect }));
      }
    }
  }, [searchParams]);

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    // Clear global submit error when typing
    setSubmitError(null);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    setSubmitError(null);

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên của bạn";
    }

    // Vietnamese Phone Validation Regex
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Số điện thoại không đúng định dạng (Ví dụ: 0987654321)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit request to Next.js API route
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.status === "success") {
        setSubmitSuccess(true);
      } else {
        setSubmitError(result.message || "Có lỗi xảy ra khi gửi thông tin đăng ký. Vui lòng liên hệ trực tiếp.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitError("Lỗi kết nối mạng. Vui lòng kiểm tra lại đường truyền internet của bạn.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to submit again
  const handleReset = () => {
    setFormData({ name: "", phone: "", selection: "", message: "" });
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  if (submitSuccess) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-white p-8 sm:p-10 rounded-2xl border border-blue-200 shadow-xl text-center flex flex-col items-center gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 flex items-center justify-center shadow-md animate-pulse">
          <CheckCircle2 size={36} className="stroke-[2.5]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Đăng Ký Thành Công!</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Chào <strong className="text-blue-600 font-bold">{formData.name}</strong>, Thầy giáo GenZ đã ghi nhận yêu cầu đăng ký của bạn.
          </p>
          <div className="bg-slate-900 text-white rounded-2xl p-4 text-xs font-mono text-left max-w-sm mx-auto shadow-inner space-y-2 mt-4">
            <p className="text-slate-400"># THÔNG TIN ĐĂNG KÝ:</p>
            <p>• Họ tên: {formData.name}</p>
            <p>• SĐT: {formData.phone}</p>
            <p>• Đăng ký: {
              (() => {
                const item = [...coursesData, ...servicesData].find(x => x.id === formData.selection);
                if (!item) return "Tư vấn chung";
                return "title" in item ? item.title : item.name;
              })()
            }</p>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3.5 text-xs text-blue-700 font-semibold flex items-center gap-2 max-w-md shadow-sm">
          <Sparkles size={16} className="text-cyan-500 shrink-0" />
          <span>Thầy giáo sẽ liên hệ trực tiếp qua số <strong>{formData.phone}</strong> trong vòng 15 phút nữa nhé!</span>
        </div>

        <button
          onClick={handleReset}
          className="mt-2 text-xs font-bold text-slate-500 hover:text-blue-600 underline smooth-transition"
        >
          Gửi biểu mẫu khác
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-premium hover:shadow-premium-hover transition-all duration-500 relative overflow-hidden"
    >
      {/* Visual Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-600 to-cyan-500" />

      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
        Nhận Tư Vấn Miễn Phí
      </h3>
      <p className="text-slate-500 text-xs sm:text-sm mb-6 leading-relaxed">
        Để lại thông tin, Thầy giáo GenZ sẽ chủ động gọi điện để tư vấn lộ trình học tập tối ưu hoặc lên lịch cài đặt dịch vụ giúp bạn ngay!
      </p>

      {submitError && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-fade-in shadow-sm">
          <AlertCircle size={16} className="shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Name input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Ví dụ: Nguyễn Văn A"
              className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold smooth-transition focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-300 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
            {errors.name && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 flex items-center gap-1">
                <AlertCircle size={16} />
              </div>
            )}
          </div>
          {errors.name && <p className="text-red-500 text-[11px] font-bold mt-0.5">{errors.name}</p>}
        </div>

        {/* Phone input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ví dụ: 0968123456"
              className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold smooth-transition focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-300 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
            {errors.phone && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 flex items-center gap-1">
                <AlertCircle size={16} />
              </div>
            )}
          </div>
          {errors.phone && <p className="text-red-500 text-[11px] font-bold mt-0.5">{errors.phone}</p>}
        </div>

        {/* Dropdown Selection */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="selection" className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Nội dung quan tâm (Khóa học / Dịch vụ)
          </label>
          <select
            id="selection"
            name="selection"
            value={formData.selection}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold bg-white text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 smooth-transition"
          >
            <option value="">-- Chọn Khóa học hoặc Dịch vụ (Không bắt buộc) --</option>
            {selectionOptions.map((group) => (
              <optgroup key={group.category} label={group.category} className="font-bold text-slate-900">
                {group.items.map((item) => (
                  <option key={item.id} value={item.id} className="font-normal text-slate-700">
                    {item.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Message Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
            Lời nhắn thêm (Không bắt buộc)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            placeholder="Ví dụ: Mình muốn học ca tối, hoặc muốn cài Win vào thứ 7..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 smooth-transition"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 py-4 rounded-full text-xs font-black tracking-wide uppercase transition-all duration-300 active:scale-[0.98] disabled:scale-100 disabled:opacity-85 btn-premium-primary flex items-center justify-center gap-2 group cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={15} />
            Đang ghi nhận...
          </>
        ) : (
          <>
            Đăng ký ngay
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </>
        )}
      </button>

      <p className="text-slate-400 text-[10px] text-center mt-4">
        * Thầy giáo cam kết không chia sẻ hay sử dụng thông tin của bạn vào mục đích spam.
      </p>
    </form>
  );
}
