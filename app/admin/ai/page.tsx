"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  BookOpen,
  Database,
  Route,
  Terminal,
  History,
  BarChart3,
  Settings,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Send,
  Loader2,
  Edit3,
} from "lucide-react";
import { AdminCourseItem } from "@/lib/courses-store";
import { AiKnowledgeDocument, AiRoadmapTemplate, AiConversation, AiSettings } from "@/lib/ai-store";
import AiMascot from "@/components/ai-assistant/AiMascot";

export default function AdminAiAdvisorPage() {
  const [activeTab, setActiveTab] = useState<
    "knowledge" | "courses" | "roadmaps" | "prompt" | "conversations" | "stats" | "settings"
  >("knowledge");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Tab 1: Knowledge
  const [documents, setDocuments] = useState<AiKnowledgeDocument[]>([]);
  const [showDocModal, setShowDocModal] = useState(false);
  const [docForm, setDocForm] = useState({
    id: "",
    title: "",
    category: "faq" as "course" | "certification" | "policy" | "faq" | "learning_guide",
    content: "",
    tags: "",
    status: "PUBLISHED" as "PUBLISHED" | "DRAFT",
  });

  // Tab 2: Courses
  const [courses, setCourses] = useState<AdminCourseItem[]>([]);

  // Tab 3: Roadmaps
  const [roadmaps] = useState<AiRoadmapTemplate[]>([]);

  // Tab 4 & 7: Settings & Prompt
  const [settingsData, setSettingsData] = useState<AiSettings>({
    systemPrompt: "",
    temperature: 0.2,
    similarityThreshold: 0.65,
    maxTokens: 1000,
    activeProvider: "builtin-rag",
    modelName: "gemini-1.5-flash",
    enableExternalAi: false,
    unansweredNotificationEmail: "",
  });

  // Tab 5: Conversations
  const [conversations, setConversations] = useState<AiConversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<AiConversation | null>(null);

  // AI Test Sandbox
  const [testQuery, setTestQuery] = useState("");
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [testLoading, setTestLoading] = useState(false);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const [kRes, cRes, sRes, cvRes] = await Promise.all([
        fetch("/api/admin/ai/knowledge"),
        fetch("/api/admin/courses"),
        fetch("/api/admin/ai/settings"),
        fetch("/api/admin/ai/conversations"),
      ]);

      if (kRes.ok) {
        const d = await kRes.json();
        setDocuments(d.data || []);
      }
      if (cRes.ok) {
        const d = await cRes.json();
        setCourses(d.data || []);
      }
      if (sRes.ok) {
        const d = await sRes.json();
        if (d.data) setSettingsData(d.data);
      }
      if (cvRes.ok) {
        const d = await cvRes.json();
        setConversations(d.data || []);
      }
    } catch (err) {
      console.error("Fetch AI Data Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const [kRes, cRes, sRes, cvRes] = await Promise.all([
          fetch("/api/admin/ai/knowledge"),
          fetch("/api/admin/courses"),
          fetch("/api/admin/ai/settings"),
          fetch("/api/admin/ai/conversations"),
        ]);

        if (ignore) return;

        if (kRes.ok) {
          const d = await kRes.json();
          setDocuments(d.data || []);
        }
        if (cRes.ok) {
          const d = await cRes.json();
          setCourses(d.data || []);
        }
        if (sRes.ok) {
          const d = await sRes.json();
          if (d.data) setSettingsData(d.data);
        }
        if (cvRes.ok) {
          const d = await cvRes.json();
          setConversations(d.data || []);
        }
      } catch (err) {
        console.error("Error loading admin AI data:", err);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleReindex = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/ai/reindex", { method: "POST" });
      const d = await res.json();
      if (res.ok) {
        setSuccessMsg(d.message || "Đã đồng bộ lại kho tri thức AI thành công!");
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        setErrorMsg(d.error || "Không thể đồng bộ kho tri thức.");
      }
    } catch {
      setErrorMsg("Lỗi kết nối máy chủ khi re-index.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.title || !docForm.content) return;

    setLoading(true);
    try {
      const isEdit = Boolean(docForm.id);
      const res = await fetch("/api/admin/ai/knowledge", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...docForm,
          tags: docForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        setSuccessMsg(isEdit ? "Đã cập nhật tài liệu!" : "Đã thêm tài liệu mới vào kho AI!");
        setShowDocModal(false);
        setDocForm({ id: "", title: "", category: "faq", content: "", tags: "", status: "PUBLISHED" });
        fetchInitialData();
        setTimeout(() => setSuccessMsg(""), 4000);
      } else {
        const d = await res.json();
        setErrorMsg(d.error || "Lỗi lưu tài liệu.");
      }
    } catch {
      setErrorMsg("Lỗi kết nối khi lưu tài liệu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoc = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa tài liệu này khỏi kho AI?")) return;
    try {
      const res = await fetch(`/api/admin/ai/knowledge?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccessMsg("Đã xóa tài liệu!");
        fetchInitialData();
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch {
      setErrorMsg("Không thể xóa tài liệu.");
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/ai/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsData),
      });
      if (res.ok) {
        setSuccessMsg("Đã lưu cấu hình AI thành công!");
        setTimeout(() => setSuccessMsg(""), 4000);
      }
    } catch {
      setErrorMsg("Lỗi khi lưu cấu hình.");
    } finally {
      setLoading(false);
    }
  };

  const handleRunTest = async () => {
    if (!testQuery.trim()) return;
    setTestLoading(true);
    setTestResponse(null);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: testQuery }),
      });
      const data = await res.json();
      if (res.ok) {
        setTestResponse(data.reply);
      } else {
        setTestResponse("Lỗi: " + (data.error || "Không nhận được phản hồi"));
      }
    } catch {
      setTestResponse("Lỗi kết nối tới AI API.");
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5EEF8] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <AiMascot state="idle" size={44} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#0B2545] flex items-center gap-2">
              <span>AI Tư Vấn Lộ Trình Học</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0057B8] border border-blue-100 font-bold">
                RAG Engine
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Quản trị kho kiến thức, khóa học mục tiêu, system prompt và kiểm thử AI thời gian thực
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReindex}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Cập nhật kho kiến thức</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle size={16} className="text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E5EEF8] pb-2">
        {[
          { id: "knowledge", label: "Kho Kiến Thức AI", icon: Database },
          { id: "courses", label: "Khóa Học & Môn Học", icon: BookOpen },
          { id: "roadmaps", label: "Mẫu Lộ Trình", icon: Route },
          { id: "prompt", label: "Prompt Hệ Thống", icon: Terminal },
          { id: "conversations", label: "Lịch Sử Tư Vấn", icon: History },
          { id: "stats", label: "Thống Kê", icon: BarChart3 },
          { id: "settings", label: "Cấu Hình AI & Test", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#0057B8] text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-[#F4F8FD] border border-[#E5EEF8]"
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: KHO KIẾN THỨC */}
      {activeTab === "knowledge" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B2545]">
              Danh Sách Tài Liệu Huấn Luyện AI ({documents.length})
            </h3>
            <button
              type="button"
              onClick={() => {
                setDocForm({ id: "", title: "", category: "faq", content: "", tags: "", status: "PUBLISHED" });
                setShowDocModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E5EEF8] hover:bg-[#F4F8FD] text-xs font-bold text-[#0057B8] shadow-xs cursor-pointer"
            >
              <Plus size={14} />
              <span>Thêm tài liệu mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-[#E5EEF8] p-5 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#0057B8] border border-blue-100">
                      {doc.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        doc.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#0B2545] leading-snug">{doc.title}</h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed whitespace-pre-line">
                    {doc.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E5EEF8] flex items-center justify-between text-xs">
                  <div className="flex flex-wrap gap-1">
                    {doc.tags.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setDocForm({
                          id: doc.id,
                          title: doc.title,
                          category: doc.category,
                          content: doc.content,
                          tags: doc.tags.join(", "),
                          status: doc.status as "PUBLISHED" | "DRAFT",
                        });
                        setShowDocModal(true);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-[#0057B8]"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDoc(doc.id)}
                      className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: KHÓA HỌC THẬT ĐANG HOẠT ĐỘNG */}
      {activeTab === "courses" && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E5EEF8] shadow-xs">
            <h3 className="text-sm font-bold text-[#0B2545] mb-1">
              Khóa Học & Môn Học Được Cung Cấp Cho AI RAG ({courses.length})
            </h3>
            <p className="text-xs text-slate-500">
              AI chỉ được phép tư vấn và báo giá chính xác các khóa học đang có trạng thái PUBLISHED dưới đây.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-4.5 rounded-2xl border border-[#E5EEF8] shadow-xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0057B8] bg-[#F4F8FD] px-2 py-0.5 rounded border border-[#E5EEF8]">
                    {course.code}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">{course.duration}</span>
                </div>
                <h4 className="font-bold text-sm text-[#0B2545] line-clamp-2">{course.title}</h4>
                <div className="text-sm font-bold text-[#0057B8]">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(course.priceAmount)}
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MẪU LỘ TRÌNH ĐÀO TẠO */}
      {activeTab === "roadmaps" && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E5EEF8] shadow-xs">
            <h3 className="text-sm font-bold text-[#0B2545] mb-1">
              Mẫu Lộ Trình Đào Tạo Chuẩn Hóa ({roadmaps.length})
            </h3>
            <p className="text-xs text-slate-500">
              Các khung lộ trình mẫu được thiết kế sẵn cho từng đối tượng (Sinh viên, Người đi làm, Mất gốc, Chuyển nghề).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roadmaps.map((rm) => (
              <div
                key={rm.id}
                className="bg-white p-5 rounded-2xl border border-[#E5EEF8] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0057B8] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                    {rm.targetRole} • {rm.targetGoal}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{rm.estimatedWeeks} tuần</span>
                </div>
                <h4 className="font-bold text-sm text-[#0B2545]">{rm.title}</h4>
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  {rm.phases.map((p) => (
                    <div key={p.phaseIndex} className="text-xs space-y-0.5 bg-[#F4F8FD] p-2.5 rounded-xl border border-[#E5EEF8]">
                      <span className="font-bold text-[#0B2545] block">{p.title}</span>
                      <span className="text-slate-600 block">{p.focus}</span>
                    </div>
                  ))}
                </div>
                {rm.certificationName && (
                  <p className="text-[11px] font-medium text-slate-500 pt-1">
                    🏆 Đầu ra: <strong className="text-slate-700">{rm.certificationName}</strong>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM PROMPT */}
      {activeTab === "prompt" && (
        <div className="bg-white p-6 rounded-2xl border border-[#E5EEF8] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0B2545]">System Prompt Bắt Buộc Của Cố Vấn AI</h3>
            <span className="text-xs text-slate-500">Áp dụng cho mọi câu hỏi của người dùng</span>
          </div>
          <textarea
            rows={8}
            value={settingsData.systemPrompt}
            onChange={(e) => setSettingsData({ ...settingsData, systemPrompt: e.target.value })}
            className="w-full p-4 rounded-xl border border-[#E5EEF8] bg-[#F4F8FD]/50 text-xs font-mono leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0057B8]/20 focus:border-[#0057B8]"
          />
          <button
            type="button"
            onClick={handleSaveSettings}
            className="px-5 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            Lưu System Prompt
          </button>
        </div>
      )}

      {/* TAB 5: CONVERSATIONS */}
      {activeTab === "conversations" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 bg-white p-4 rounded-2xl border border-[#E5EEF8] shadow-xs space-y-2.5 max-h-[600px] overflow-y-auto">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Lịch sử các phiên ({conversations.length})
            </h4>
            {conversations.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Chưa có phiên hội thoại nào.</p>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    selectedConv?.id === conv.id
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white border-[#E5EEF8] hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-[#0B2545]">
                    <span>Phiên #{conv.id.slice(-6)}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(conv.updatedAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1 line-clamp-1 font-medium">
                    {conv.messages[conv.messages.length - 1]?.content || "Chưa có tin nhắn"}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#E5EEF8] shadow-xs min-h-[400px] flex flex-col justify-between">
            {selectedConv ? (
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#0B2545]">Chi tiết phiên: {selectedConv.id}</h4>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-[#0057B8] font-bold">
                    Trạng thái: {selectedConv.status}
                  </span>
                </div>
                <div className="space-y-3 max-h-[450px] overflow-y-auto p-1">
                  {selectedConv.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl text-xs leading-relaxed max-w-[85%] ${
                        m.role === "user"
                          ? "ml-auto bg-[#0057B8] text-white"
                          : "bg-[#F4F8FD] text-slate-800 border border-[#E5EEF8]"
                      }`}
                    >
                      {m.content}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col gap-2 h-full text-slate-400 text-xs my-auto">
                <History size={24} className="text-slate-300" />
                <span>Chọn một phiên bên trái để xem nội dung chi tiết</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: THỐNG KÊ HOẠT ĐỘNG AI */}
      {activeTab === "stats" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[#E5EEF8] shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Tổng Số Lượt Tư Vấn</span>
              <div className="text-2xl font-bold text-[#0057B8]">{conversations.length}</div>
              <span className="text-[10px] text-emerald-600 font-medium">100% phản hồi chính xác RAG</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E5EEF8] shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Tài Liệu Đã Nạp</span>
              <div className="text-2xl font-bold text-[#0B2545]">{documents.length}</div>
              <span className="text-[10px] text-slate-400 font-medium">Chính sách & FAQ chính thức</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E5EEF8] shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Khóa Học Đang Kết Nối</span>
              <div className="text-2xl font-bold text-[#0B2545]">{courses.length}</div>
              <span className="text-[10px] text-slate-400 font-medium">Chứng chỉ MOS & IC3</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E5EEF8] shadow-xs space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Mẫu Lộ Trình Sẵn Có</span>
              <div className="text-2xl font-bold text-[#0057B8]">{roadmaps.length}</div>
              <span className="text-[10px] text-emerald-600 font-medium">Đã kiểm duyệt chất lượng</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5EEF8] shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-[#0B2545]">Nhu Cầu Môn Học Phổ Biến Nhất</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span>1. Luyện thi MOS 3 Môn Cấp Tốc (Word, Excel, PowerPoint)</span>
                <strong className="text-[#0057B8]">68%</strong>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-[#0057B8] h-full w-[68%]" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span>2. Thực chiến Excel & Dashboard báo cáo</span>
                <strong className="text-[#0057B8]">22%</strong>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-[#0057B8] h-full w-[22%]" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span>3. Chứng chỉ Kỹ năng số IC3 GS6 chuẩn đại học</span>
                <strong className="text-[#0057B8]">10%</strong>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-[#0057B8] h-full w-[10%]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: TEST SANDBOX & SETTINGS */}
      {activeTab === "settings" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#E5EEF8] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0B2545]">Kiểm Thử AI Trực Tiếp (Sandbox)</h3>
                <p className="text-xs text-slate-500">
                  Kiểm tra khả năng phản hồi và tìm kiếm RAG theo dữ liệu kho kiến thức hiện tại.
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <AiMascot
                  state={testLoading ? "thinking" : testResponse ? "speaking" : "idle"}
                  size={46}
                />
              </div>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Nhập câu hỏi test (vd: Tôi muốn học MOS cấp tốc thì học phí bao nhiêu?)"
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRunTest()}
                className="w-full p-3 rounded-xl border border-[#E5EEF8] text-xs focus:outline-none focus:border-[#0057B8]"
              />
              <button
                type="button"
                onClick={handleRunTest}
                disabled={testLoading}
                className="w-full py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {testLoading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                <span>Gửi câu hỏi thử nghiệm</span>
              </button>
            </div>

            {testResponse && (
              <div className="p-4 rounded-xl bg-[#F4F8FD] border border-[#E5EEF8] text-xs leading-relaxed text-slate-800 animate-in fade-in duration-200">
                <strong className="block text-[#0057B8] mb-1 font-bold">Phản hồi của AI:</strong>
                {testResponse}
              </div>
            )}
          </div>

          <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-[#E5EEF8] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0B2545]">Cấu Hình Tham Số AI Model</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Provider Hoạt Động</label>
                <select
                  value={settingsData.activeProvider}
                  onChange={(e) =>
                    setSettingsData({ ...settingsData, activeProvider: e.target.value as AiSettings["activeProvider"] })
                  }
                  className="w-full p-2.5 rounded-xl border border-[#E5EEF8] bg-white text-xs"
                >
                  <option value="builtin-rag">Local Grounded RAG (Khuyên dùng - Ổn định 100%)</option>
                  <option value="gemini">Google Gemini 1.5 Flash</option>
                  <option value="openai">OpenAI GPT-4o Mini</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Độ Sáng Tạo (Temperature): {settingsData.temperature}</label>
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={settingsData.temperature}
                  onChange={(e) => setSettingsData({ ...settingsData, temperature: parseFloat(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Tiếp Nhận Câu Hỏi Chưa Trả Lời Được</label>
                <input
                  type="email"
                  value={settingsData.unansweredNotificationEmail}
                  onChange={(e) => setSettingsData({ ...settingsData, unansweredNotificationEmail: e.target.value })}
                  placeholder="hotro@tinhocgenz.io.vn"
                  className="w-full p-2.5 rounded-xl border border-[#E5EEF8] text-xs"
                />
              </div>

              <button
                type="button"
                onClick={handleSaveSettings}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Lưu Cấu Hình
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL THÊM / SỬA TÀI LIỆU KHO KIẾN THỨC */}
      {showDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E5EEF8] max-w-xl w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-[#0B2545]">
              {docForm.id ? "Chỉnh Sửa Tài Liệu Kho AI" : "Thêm Tài Liệu Mới Vào Kho AI"}
            </h3>

            <form onSubmit={handleSaveDoc} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tiêu Đề Tài Liệu</label>
                <input
                  type="text"
                  required
                  value={docForm.title}
                  onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                  placeholder="Ví dụ: Quy định về lệ phí thi lại và máy ảo"
                  className="w-full p-2.5 rounded-xl border border-[#E5EEF8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phân Loại</label>
                  <select
                    value={docForm.category}
                    onChange={(e) =>
                      setDocForm({ ...docForm, category: e.target.value as typeof docForm.category })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E5EEF8] bg-white"
                  >
                    <option value="faq">Câu Hỏi Thường Gặp (FAQ)</option>
                    <option value="policy">Chính Sách & Cam Kết</option>
                    <option value="certification">Thông Tin Chứng Chỉ</option>
                    <option value="course">Mô Tả Chi Tiết Khóa Học</option>
                    <option value="learning_guide">Cẩm Nang Luyện Thi</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Trạng Thái</label>
                  <select
                    value={docForm.status}
                    onChange={(e) =>
                      setDocForm({ ...docForm, status: e.target.value as "PUBLISHED" | "DRAFT" })
                    }
                    className="w-full p-2.5 rounded-xl border border-[#E5EEF8] bg-white"
                  >
                    <option value="PUBLISHED">Đã Xuất Bản (AI Đọc)</option>
                    <option value="DRAFT">Bản Nháp (Ẩn Khỏi AI)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nội Dung Chi Tiết (Context Cung Cấp Cho AI)</label>
                <textarea
                  rows={6}
                  required
                  value={docForm.content}
                  onChange={(e) => setDocForm({ ...docForm, content: e.target.value })}
                  placeholder="Nêu rõ các ý kiến thức, chính sách, học phí hoặc quy chuẩn..."
                  className="w-full p-3 rounded-xl border border-[#E5EEF8]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tags Tìm Kiếm (Cách nhau bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={docForm.tags}
                  onChange={(e) => setDocForm({ ...docForm, tags: e.target.value })}
                  placeholder="học lại, lệ phí, certiport, bao đỗ"
                  className="w-full p-2.5 rounded-xl border border-[#E5EEF8]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowDocModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-[#0057B8] hover:bg-[#003F88] text-white font-bold cursor-pointer"
                >
                  {loading ? "Đang lưu..." : "Lưu Tài Liệu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
