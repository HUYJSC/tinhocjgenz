"use client";

import { useState } from "react";
import { Award, CheckCircle2, Star, Sparkles, School, ShieldCheck, QrCode, Lock } from "lucide-react";
import BlockchainVerifyModal, { VerifiableCertificate } from "./BlockchainVerifyModal";

interface CertificateItem {
  id: string;
  studentName: string;
  university: "DNTU" | "LHU" | "UEH" | "HUTECH" | "OTHER";
  universityFull: string;
  courseName: string;
  examCode: string;
  score: number;
  maxScore: number;
  completionDate: string;
  quote: string;
  badge: string;
  blockchainHash?: string;
  certiportRegId?: string;
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-1",
    studentName: "Nguyễn Minh Thư",
    university: "DNTU",
    universityFull: "Đại học Công nghệ Đồng Nai",
    courseName: "MOS Excel 2019 Specialist",
    examCode: "MO-200",
    score: 980,
    maxScore: 1000,
    completionDate: "Tháng 05/2026",
    quote: "Mình ôn cấp tốc 3 buổi trước kỳ xét tốt nghiệp DNTU. Đề thi mô phỏng của trung tâm sát 99% đề thi thật tại IIG, làm bài cực kỳ tự tin!",
    badge: "Xuất Sắc (Top 1% Điểm Cao)",
    blockchainHash: "0x8f7d9a3be4120984c1f58a7c2934bb0e1980dntu",
    certiportRegId: "CERT-MO200-THU980-VN"
  },
  {
    id: "cert-2",
    studentName: "Trần Hoàng Nam",
    university: "DNTU",
    universityFull: "Đại học Công nghệ Đồng Nai",
    courseName: "Combo MOS 3 Môn (Word + Excel + PPT)",
    examCode: "MO-200 / 201 / 300",
    score: 1000,
    maxScore: 1000,
    completionDate: "Tháng 04/2026",
    quote: "Đạt trọn vẹn 1000/1000 điểm môn PowerPoint và 950 điểm Word. Giảng viên chỉ cho từng mẹo bẫy của Certiport mà tự học không bao giờ biết được.",
    badge: "Điểm Tuyệt Đối 1000/1000",
    blockchainHash: "0x1a9c33f7b0e11894d8721c56ab88ef01000dntu",
    certiportRegId: "CERT-MOS3M-NAM1000-VN"
  },
  {
    id: "cert-3",
    studentName: "Lê Thị Thảo Vy",
    university: "LHU",
    universityFull: "Đại học Lạc Hồng",
    courseName: "Chứng Chỉ Kỹ Năng Số IC3 GS6",
    examCode: "IC3 Digital Literacy",
    score: 920,
    maxScore: 1000,
    completionDate: "Tháng 06/2026",
    quote: "Học trực tuyến nhưng tương tác màn hình 1:1 rất kỹ, mình hoàn thành chuẩn đầu ra tin học trước hạn nộp trường Lạc Hồng 2 tuần.",
    badge: "Đạt Chuẩn Tốt Nghiệp LHU",
    blockchainHash: "0x44cd98a12e345b89a01f78c90123e4920lhu",
    certiportRegId: "CERT-IC3GS6-VY920-VN"
  },
  {
    id: "cert-4",
    studentName: "Phạm Quốc Bảo",
    university: "UEH",
    universityFull: "Đại học Kinh Tế TP.HCM",
    courseName: "MOS Excel 2019 Expert",
    examCode: "MO-201 Expert",
    score: 960,
    maxScore: 1000,
    completionDate: "Tháng 05/2026",
    quote: "Nội dung đào tạo thực tế, không chỉ để đi thi mà các kỹ năng Lookup, Pivot Table, Macro còn giúp mình trúng tuyển thực tập sinh ngay kỳ này.",
    badge: "MOS Expert Cấp Quốc Tế",
    blockchainHash: "0x98fbc112e45698ad7890123fabc445960ueh",
    certiportRegId: "CERT-MO201-BAO960-VN"
  },
  {
    id: "cert-5",
    studentName: "Đỗ Kim Ngân",
    university: "HUTECH",
    universityFull: "Đại học Công Nghệ TP.HCM",
    courseName: "MOS Word & Excel 2019",
    examCode: "MO-100 / MO-200",
    score: 940,
    maxScore: 1000,
    completionDate: "Tháng 05/2026",
    quote: "Mình thuộc diện mất gốc tin học văn phòng, nhờ thầy kèm kiên nhẫn từng thao tác mà thi 1 lần đỗ luôn cả 2 chứng chỉ!",
    badge: "Vượt Chuẩn Đầu Ra HUTECH",
    blockchainHash: "0x77ab12cd34ef5678901234567890abc940hutech",
    certiportRegId: "CERT-MO100200-NGAN940-VN"
  },
  {
    id: "cert-6",
    studentName: "Vũ Tuấn Anh",
    university: "DNTU",
    universityFull: "Đại học Công nghệ Đồng Nai",
    courseName: "MOS PowerPoint 2019 Specialist",
    examCode: "MO-300",
    score: 975,
    maxScore: 1000,
    completionDate: "Tháng 06/2026",
    quote: "Đăng ký nhóm 3 bạn cùng lớp DNTU vừa được giảm học phí vừa có phần mềm thi thử luyện đề không giới hạn. Cả 3 đều đỗ trên 900 điểm.",
    badge: "Nhóm Sinh Viên DNTU Đỗ 100%",
    blockchainHash: "0x33ef908123456789abcdef01234567975dntu",
    certiportRegId: "CERT-MO300-ANH975-VN"
  }
];

export default function HallOfFame() {
  const [selectedUni, setSelectedUni] = useState<string>("ALL");
  const [verifyingCert, setVerifyingCert] = useState<VerifiableCertificate | null>(null);

  const filteredCerts = selectedUni === "ALL" 
    ? CERTIFICATES 
    : CERTIFICATES.filter(c => c.university === selectedUni);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden border-t border-slate-100">
      
      {/* Blockchain Modal */}
      <BlockchainVerifyModal
        cert={verifyingCert}
        onClose={() => setVerifyingCert(null)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-black tracking-wider uppercase">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>CERTIPORT HALL OF FAME • XÁC THỰC BẢN QUYỀN MINH BẠCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug font-display">
            Chứng Chỉ Thật & Điểm Số Thật Của Học Viên
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Minh chứng rõ nét nhất cho chất lượng đào tạo: Hàng ngàn sinh viên DNTU, Lạc Hồng, UEH đã tự tin vượt qua chuẩn đầu ra với điểm số xuất sắc (900 - 1000 điểm) kèm mã xác thực số hóa chống làm giả.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "ALL", label: "Tất cả học viên" },
              { id: "DNTU", label: "Sinh viên DNTU" },
              { id: "LHU", label: "Sinh viên Lạc Hồng" },
              { id: "UEH", label: "Sinh viên UEH" },
              { id: "HUTECH", label: "Sinh viên HUTECH" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedUni(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-300 cursor-pointer ${
                  selectedUni === tab.id
                    ? "bg-slate-900 text-white shadow-md scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCerts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 hover:border-blue-500/40 p-6 sm:p-7 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 via-cyan-400 to-amber-400" />

              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black bg-amber-50 text-amber-700 border border-amber-200">
                    <Star size={11} className="fill-amber-500 text-amber-500" />
                    {item.badge}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{item.completionDate}</span>
                </div>

                {/* Student & Score Info Box */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 mb-5 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-sm text-white tracking-wide">{item.studentName}</h4>
                      <p className="text-[11px] text-cyan-300 font-semibold mt-0.5 flex items-center gap-1">
                        <School size={12} /> {item.universityFull}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-amber-400 leading-none">{item.score}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">/ {item.maxScore} ĐIỂM</div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-300 font-semibold">{item.courseName}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono font-bold border border-blue-800">
                      {item.examCode}
                    </span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic font-medium">
                  "{item.quote}"
                </p>
              </div>

              {/* Card Footer Verification Button */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <button
                  type="button"
                  onClick={() => setVerifyingCert(item)}
                  className="flex items-center gap-1.5 font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer group/btn"
                >
                  <CheckCircle2 size={14} className="text-emerald-500 group-hover/btn:scale-110 transition-transform" />
                  <span>Xác thực On-Chain</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVerifyingCert(item)}
                  className="font-mono text-cyan-700 bg-cyan-50 hover:bg-cyan-100 px-2 py-0.5 rounded border border-cyan-200 font-bold text-[10px] cursor-pointer"
                >
                  VERIFIED 🔒
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles size={18} className="text-amber-400" />
              Bạn Là Sinh Viên Đang Cần Bằng Gấp Cho Đợt Xét Này?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Đừng lo lắng! PH Digital Education có lớp kèm cấp tốc 3 - 5 buổi theo sát ngân hàng đề thi thật, cam kết đỗ ngay từ lần thi đầu tiên.
            </p>
          </div>
          <a
            href="/lien-he"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg hover:scale-105 transition-all duration-300 shrink-0"
          >
            Đăng Ký Ôn Cấp Tốc
          </a>
        </div>

      </div>
    </section>
  );
}
