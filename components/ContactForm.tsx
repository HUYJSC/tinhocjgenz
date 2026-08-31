"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, ArrowRight, Loader2, Sparkles, PhoneCall } from "lucide-react";
import { coursesData } from "@/data/mockData";
import { SITE_CONFIG } from "@/data/siteConfig";
import { AnalyticsEvents } from "@/lib/analytics";

interface ContactFormProps {
  defaultCourse?: string;
  title?: string;
  subtitle?: string;
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-8 bg-white rounded-2xl border border-slate-200 shadow-xl">
          <Loader2 className="animate-spin text-blue-600 mr-2" />
          <span className="text-slate-500 font-medium">Đang tải biểu mẫu...</span>
        </div>
      }
    >
      <ContactFormContent {...props} />
    </Suspense>
  );
}

function ContactFormContent({ defaultCourse, title, subtitle }: ContactFormProps) {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    selection: defaultCourse || "",
    message: "",
  });

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const preselect = searchParams?.get("select");
    if (preselect) {
      const match = coursesData.find((c) => c.id === preselect);
      if (match) {
        setFormData((prev) => ({ ...prev, selection: match.title }));
      }
    } else if (defaultCourse && !formData.selection) {
      setFormData((prev) => ({ ...prev, selection: defaultCourse }));
    }
  }, [searchParams, defaultCourse]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    setSubmitError(null);

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên của bạn";
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const cleanPhone = formData.phone.replace(/\s+/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Số điện thoại chưa đúng định dạng (Ví dụ: 0987654321)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.status === "success") {
        setSubmitSuccess(true);
        AnalyticsEvents.SUBMIT_LEAD(formData.selection || "Tư vấn tổng quát", formData.name);
      } else {
        setSubmitError(
          result.message || "Có lỗi xảy ra khi gửi thông tin. Vui lòng liên hệ Hotline trực tiếp."
        );
      }
    } catch {
      setSubmitError("Lỗi kết nối mạng. Vui lòng kiểm tra lại đường truyền internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: "", phone: "", selection: defaultCourse || "", message: "" });
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  if (submitSuccess) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-white p-8 sm:p-10 rounded-2xl border border-blue-200 shadow-xl text-center flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md">
          <CheckCircle2 size={32} className="stroke-[2.5]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-900">Đăng Ký Thành Công!</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Cảm ơn <strong className="text-blue-600">{formData.name}</strong>, đội ngũ giảng viên sẽ liên hệ qua SĐT <strong className="text-blue-600">{formData.phone}</strong> trong vòng 15 phút.
          </p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Đăng ký thêm người khác
          </button>
          <a
            href={SITE_CONFIG.contact.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <PhoneCall size={13} />
            <span>Chat Zalo Ngay</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
      {title && (
        <div className="mb-6 text-center space-y-1">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">{title}</h3>
          {subtitle && <p className="text-slate-500 text-xs sm:text-sm">{subtitle}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {submitError && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-bold text-slate-700">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nguyễn Văn A"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? "border-red-400 focus:ring-red-200 bg-red-50/20"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
            {errors.name && <p className="text-[11px] text-red-500 font-medium">{errors.name}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-xs font-bold text-slate-700">
              Số điện thoại / Zalo <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="0912 345 678"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.phone
                  ? "border-red-400 focus:ring-red-200 bg-red-50/20"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
            {errors.phone && <p className="text-[11px] text-red-500 font-medium">{errors.phone}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="selection" className="text-xs font-bold text-slate-700">
            Khóa học quan tâm
          </label>
          <select
            id="selection"
            name="selection"
            value={formData.selection}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800"
          >
            <option value="">-- Chọn khóa học hoặc tư vấn theo yêu cầu --</option>
            <optgroup label="Chứng Chỉ Quốc Tế MOS & IC3">
              {coursesData
                .filter((c) => c.category === "mos-ic3" || c.id.includes("mos") || c.id.includes("ic3"))
                .map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title} ({c.price})
                  </option>
                ))}
            </optgroup>
            <optgroup label="Tin Học Văn Phòng Thực Chiến">
              {coursesData
                .filter((c) => c.category !== "mos-ic3" && !c.id.includes("mos") && !c.id.includes("ic3"))
                .map((c) => (
                  <option key={c.id} value={c.title}>
                    {c.title} ({c.price})
                  </option>
                ))}
            </optgroup>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-xs font-bold text-slate-700">
            Ghi chú thêm (Mục tiêu điểm số, thời gian rảnh...)
          </label>
          <textarea
            id="message"
            name="message"
            rows={2}
            placeholder="Ví dụ: Em muốn ôn cấp tốc 3 buổi để thi vào cuối tuần sau..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl font-extrabold text-sm text-slate-900 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin text-slate-900" />
              <span>Đang gửi thông tin...</span>
            </>
          ) : (
            <>
              <span>Gửi Đăng Ký & Nhận Ưu Đãi Nhóm 30%</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-slate-400 font-medium">
          🔒 Thông tin cá nhân của bạn được bảo mật tuyệt đối theo chính sách đào tạo.
        </p>
      </form>
    </div>
  );
}
