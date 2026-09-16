"use client";

import { useState } from "react";
import { CheckCircle2, Star, Users, ShieldCheck } from "lucide-react";
import CredentialVerifyModal, { VerifiableCertificate } from "./CredentialVerifyModal";

interface CertificateItem {
  id: string;
  studentName: string;
  category: "student" | "worker" | "beginner";
  roleTitle: string;
  courseName: string;
  examCode: string;
  score: number;
  maxScore: number;
  completionDate: string;
  quote: string;
  badge: string;
  certiportRegId?: string;
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-1",
    studentName: "Nguyễn Minh Thư",
    category: "student",
    roleTitle: "Sinh viên năm cuối",
    courseName: "MOS Excel 2019 Specialist",
    examCode: "MO-200",
    score: 980,
    maxScore: 1000,
    completionDate: "Tháng 05/2026",
    quote: "Mình ôn cấp tốc 3 buổi trước kỳ xét tốt nghiệp. Đề thi mô phỏng của trung tâm sát 99% đề thi thật tại IIG, làm bài cực kỳ tự tin!",
    badge: "Xuất Sắc (Top 1% Điểm Cao)",
    certiportRegId: "CERT-MO200-THU980-VN",
  },
  {
    id: "cert-2",
    studentName: "Trần Hoàng Nam",
    category: "worker",
    roleTitle: "Chuyên viên Kế toán Doanh nghiệp",
    courseName: "Combo MOS 3 Môn (Word + Excel + PPT)",
    examCode: "MO-200 / 201 / 300",
    score: 1000,
    maxScore: 1000,
    completionDate: "Tháng 04/2026",
    quote: "Đạt trọn vẹn 1000/1000 điểm môn PowerPoint và 950 điểm Word. Giảng viên chỉ cho từng mẹo bẫy của Certiport mà tự học không bao giờ biết được.",
    badge: "Điểm Tuyệt Đối 1000/1000",
    certiportRegId: "CERT-MOS3M-NAM1000-VN",
  },
  {
    id: "cert-3",
    studentName: "Lê Thị Thảo Vy",
    category: "student",
    roleTitle: "Sinh viên Đại học",
    courseName: "Chứng Chỉ Kỹ Năng Số IC3 GS6",
    examCode: "IC3 Digital Literacy",
    score: 920,
    maxScore: 1000,
    completionDate: "Tháng 06/2026",
    quote: "Học trực tuyến nhưng tương tác màn hình 1:1 rất kỹ, mình hoàn thành chuẩn đầu ra tin học trước hạn nộp bằng 2 tuần.",
    badge: "Đạt Chuẩn Quốc Tế IC3",
    certiportRegId: "CERT-IC3GS6-VY920-VN",
  },
  {
    id: "cert-4",
    studentName: "Phạm Quốc Bảo",
    category: "worker",
    roleTitle: "Nhân viên Phân tích Dữ liệu",
    courseName: "MOS Excel 2019 Expert",
    examCode: "MO-201 Expert",
    score: 960,
    maxScore: 1000,
    completionDate: "Tháng 05/2026",
    quote: "Nội dung đào tạo thực tế, không chỉ để đi thi mà các kỹ năng Lookup, Pivot Table, Macro còn giúp mình trúng tuyển vị trí chuyên viên ngay kỳ này.",
    badge: "MOS Expert Cấp Quốc Tế",
    certiportRegId: "CERT-MO201-BAO960-VN",
  },
  {
    id: "cert-5",
    studentName: "Đỗ Kim Ngân",
    category: "beginner",
    roleTitle: "Người mới bắt đầu tin học",
    courseName: "MOS Word & Excel 2019",
    examCode: "MO-100 / MO-200",
    score: 940,
    maxScore: 1000,
    completionDate: "Tháng 05/2026",
    quote: "Mình thuộc diện mất gốc tin học văn phòng, nhờ thầy kèm kiên nhẫn từng thao tác mà thi 1 lần đỗ luôn cả 2 chứng chỉ!",
    badge: "Vượt Mục Tiêu Điểm Cao",
    certiportRegId: "CERT-MO100200-NGAN940-VN",
  },
  {
    id: "cert-6",
    studentName: "Vũ Tuấn Anh",
    category: "worker",
    roleTitle: "Quản lý Bán hàng",
    courseName: "MOS PowerPoint 2019 Specialist",
    examCode: "MO-300",
    score: 975,
    maxScore: 1000,
    completionDate: "Tháng 06/2026",
    quote: "Đăng ký nhóm vừa được giảm học phí vừa có phần mềm thi thử luyện đề không giới hạn. Kỹ năng thiết kế slide của mình tiến bộ vượt bậc.",
    badge: "Xuất Sắc 975/1000",
    certiportRegId: "CERT-MO300-ANH975-VN",
  },
];

export default function HallOfFame() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [verifyingCert, setVerifyingCert] = useState<VerifiableCertificate | null>(null);

  const filteredCerts = selectedCategory === "ALL"
    ? CERTIFICATES
    : CERTIFICATES.filter((c) => c.category === selectedCategory);

  return (
    <section className="py-12 bg-white relative overflow-hidden font-sans">
      {/* Credential Verification Modal */}
      <CredentialVerifyModal
        cert={verifyingCert}
        onClose={() => setVerifyingCert(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0057B8] text-xs font-bold tracking-wider uppercase">
            <ShieldCheck size={14} className="text-[#0057B8]" />
            <span>CERTIPORT HALL OF FAME • BẢNG VÀNG THÀNH TÍCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B2545] tracking-tight leading-snug font-display">
            Chứng Chỉ Thật & Điểm Số Thật Của Học Viên
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Học viên từ mọi lứa tuổi — học sinh, sinh viên, người đi làm và doanh nghiệp — đều tự tin đạt điểm số xuất sắc (900 - 1000 điểm) sau lộ trình đào tạo tinh gọn.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: "ALL", label: "Tất cả học viên" },
              { id: "worker", label: "Người Đi Làm & Kế Toán" },
              { id: "student", label: "Học Sinh & Sinh Viên" },
              { id: "beginner", label: "Người Mới Bắt Đầu" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedCategory === tab.id
                    ? "bg-[#0057B8] text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E5EEF8] hover:border-blue-300 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[#0057B8]" />

              <div className="space-y-4">
                {/* Badge Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#0057B8] border border-blue-100">
                    <Star size={10} className="fill-[#0057B8] text-[#0057B8]" />
                    {item.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{item.completionDate}</span>
                </div>

                {/* Student & Score Info Box */}
                <div className="bg-[#F4F8FD] border border-[#E5EEF8] rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#0B2545] tracking-wide">{item.studentName}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                        <Users size={11} /> {item.roleTitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#0057B8] leading-none">{item.score}</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">/ {item.maxScore} ĐIỂM</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-semibold">{item.courseName}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white text-[#003F88] font-mono font-bold border border-blue-200">
                      {item.examCode}
                    </span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic font-normal">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Card Footer Verification Button */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() =>
                    setVerifyingCert({
                      id: item.id,
                      studentName: item.studentName,
                      universityFull: item.roleTitle,
                      courseName: item.courseName,
                      examCode: item.examCode,
                      score: item.score,
                      maxScore: item.maxScore,
                      completionDate: item.completionDate,
                      badge: item.badge,
                      certiportRegId: item.certiportRegId,
                    })
                  }
                  className="flex items-center gap-1.5 font-bold text-[#0057B8] hover:text-[#003F88] cursor-pointer group/btn"
                >
                  <CheckCircle2 size={14} className="text-[#0057B8] group-hover/btn:scale-110 transition-transform" />
                  <span>Tra cứu chứng chỉ</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setVerifyingCert({
                      id: item.id,
                      studentName: item.studentName,
                      universityFull: item.roleTitle,
                      courseName: item.courseName,
                      examCode: item.examCode,
                      score: item.score,
                      maxScore: item.maxScore,
                      completionDate: item.completionDate,
                      badge: item.badge,
                      certiportRegId: item.certiportRegId,
                    })
                  }
                  className="font-mono text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 font-bold text-xs cursor-pointer"
                >
                  XÁC THỰC ✓
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
