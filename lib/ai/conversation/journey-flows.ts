/**
 * Deterministic Journey Flow Definitions
 * Configures steps, questions, and slot requirements for each pathway.
 */

import { JourneyFlowDefinition, StepDefinition } from "./journey-types";

export const START_STEP: StepDefinition = {
  stepId: "STEP_START",
  slot: "goal",
  question: "Chào bạn! Mình là Trợ lý học tập AI của Tin Học Gen Z. Mình sẽ giúp bạn xây dựng lộ trình học chuẩn xác và tối ưu nhất. Mục tiêu chính của bạn hiện tại là gì?",
  quickReplies: [
    { label: "Thi lấy bằng MOS quốc tế", value: "mos_certification" },
    { label: "Thi chứng chỉ IC3 GS6", value: "ic3_certification" },
    { label: "Thực chiến Excel đi làm", value: "practical_excel" },
    { label: "Học văn phòng toàn diện", value: "office_comprehensive" },
  ],
};

// 1. MOS Flow
export const MOS_FLOW: JourneyFlowDefinition = {
  flowId: "mos_certification",
  title: "Luyện thi Chứng chỉ MOS Quốc Tế",
  requiredSlots: ["currentLevel", "targetSubject", "targetDate", "studyTimePerWeek"],
  steps: [
    {
      stepId: "MOS_1",
      slot: "currentLevel",
      question: "Để lên lộ trình bám sát nhất với bạn, trình độ tin học hiện tại của bạn đang ở mức nào?",
      quickReplies: [
        { label: "Mới bắt đầu / Mất gốc từ số 0", value: "beginner_zero" },
        { label: "Đã biết gõ phím và tính toán cơ bản", value: "basic_elementary" },
        { label: "Đã thành thạo, muốn học chuyên sâu", value: "intermediate_adv" },
      ],
    },
    {
      stepId: "MOS_2",
      slot: "targetSubject",
      question: "Bạn đang muốn thi chứng chỉ MOS môn nào?",
      quickReplies: [
        { label: "MOS Excel", value: "excel" },
        { label: "MOS Word", value: "word" },
        { label: "MOS PowerPoint", value: "powerpoint" },
        { label: "Chưa biết nên chọn môn nào", value: "unsure" },
      ],
    },
    {
      stepId: "MOS_3",
      slot: "targetDate",
      question: "Bạn muốn đạt chứng chỉ trong khoảng thời gian nào?",
      quickReplies: [
        { label: "Trong 1 tháng (Cấp tốc)", value: "within_1_month" },
        { label: "1–3 tháng", value: "1_3_months" },
        { label: "3–6 tháng", value: "3_6_months" },
        { label: "Chưa có thời hạn cụ thể", value: "flexible" },
      ],
    },
    {
      stepId: "MOS_4",
      slot: "studyTimePerWeek",
      question: "Mỗi tuần bạn có thể dành khoảng bao nhiêu thời gian để học và luyện đề?",
      quickReplies: [
        { label: "Dưới 3 giờ", value: "under_3h" },
        { label: "3–5 giờ (2-3 buổi ca tối)", value: "3_5h" },
        { label: "5–8 giờ", value: "5_8h" },
        { label: "Trên 8 giờ (Luyện tập chuyên sâu)", value: "over_8h" },
      ],
    },
  ],
};

// 2. IC3 Flow
export const IC3_FLOW: JourneyFlowDefinition = {
  flowId: "ic3_certification",
  title: "Luyện thi Chứng chỉ Tin Học Quốc Tế IC3 GS6",
  requiredSlots: ["currentLevel", "ic3Experience", "ic3Scope", "targetDate", "studyTimePerWeek"],
  steps: [
    {
      stepId: "IC3_1",
      slot: "currentLevel",
      question: "Trình độ sử dụng máy tính và công nghệ số hiện tại của bạn đang ở mức nào?",
      quickReplies: [
        { label: "Mới bắt đầu / Mất gốc từ số 0", value: "beginner_zero" },
        { label: "Đã biết sử dụng máy tính cơ bản", value: "basic_elementary" },
        { label: "Đã có nền tảng CNTT tốt", value: "intermediate_adv" },
      ],
    },
    {
      stepId: "IC3_2",
      slot: "ic3Experience",
      question: "Bạn đã từng học hoặc làm quen với kiến thức khảo thí IC3 trước đây chưa?",
      quickReplies: [
        { label: "Chưa từng học, bắt đầu từ số 0", value: "never_learned" },
        { label: "Đã từng học / Cần luyện đề thi gấp", value: "learned_before" },
      ],
    },
    {
      stepId: "IC3_3",
      slot: "ic3Scope",
      question: "Mục tiêu thi của bạn là trọn bộ IC3 GS6 (3 Level) hay từng Level riêng lẻ?",
      quickReplies: [
        { label: "Trọn bộ 3 Level IC3 GS6 (Chuẩn tốt nghiệp ĐH)", value: "all_gs6" },
        { label: "Thi từng Level riêng lẻ", value: "single_level" },
      ],
    },
    {
      stepId: "IC3_4",
      slot: "targetDate",
      question: "Bạn muốn hoàn thành chứng chỉ IC3 GS6 trong khoảng thời gian nào?",
      quickReplies: [
        { label: "Trong 1 tháng (Cấp tốc ra trường)", value: "within_1_month" },
        { label: "1–3 tháng", value: "1_3_months" },
        { label: "3–6 tháng", value: "3_6_months" },
        { label: "Chưa có thời hạn cụ thể", value: "flexible" },
      ],
    },
    {
      stepId: "IC3_5",
      slot: "studyTimePerWeek",
      question: "Mỗi tuần bạn có thể dành khoảng bao nhiêu thời gian để học?",
      quickReplies: [
        { label: "Dưới 3 giờ", value: "under_3h" },
        { label: "3–5 giờ (2-3 buổi ca tối)", value: "3_5h" },
        { label: "5–8 giờ", value: "5_8h" },
        { label: "Trên 8 giờ", value: "over_8h" },
      ],
    },
  ],
};

// 3. Practical Excel Flow
export const PRACTICAL_EXCEL_FLOW: JourneyFlowDefinition = {
  flowId: "practical_excel",
  title: "Khóa Học Excel Thực Chiến Đi Làm",
  requiredSlots: ["currentLevel", "occupationOrNeed", "requiredSkills", "studyTimePerWeek"],
  steps: [
    {
      stepId: "EXCEL_1",
      slot: "currentLevel",
      question: "Trình độ Excel hiện tại của bạn đang ở mức nào?",
      quickReplies: [
        { label: "Mất gốc / Chưa biết dùng Excel", value: "beginner_zero" },
        { label: "Biết nhập liệu, cộng trừ đơn giản", value: "basic_elementary" },
        { label: "Đã biết VLOOKUP, IF cơ bản", value: "intermediate_adv" },
      ],
    },
    {
      stepId: "EXCEL_2",
      slot: "occupationOrNeed",
      question: "Bạn đang làm việc hoặc học tập trong ngành nghề/lĩnh vực nào?",
      quickReplies: [
        { label: "Kế toán - Kiểm toán - Tài chính", value: "ke_toan_tai_chinh" },
        { label: "Nhân sự - Hành chính - Văn phòng", value: "nhan_su_hanh_chinh" },
        { label: "Kinh doanh - Bán hàng - Marketing", value: "kinh_doanh_mkt" },
        { label: "Sinh viên chuẩn bị đi làm", value: "sinh_vien" },
      ],
    },
    {
      stepId: "EXCEL_3",
      slot: "requiredSkills",
      question: "Kỹ năng Excel nào bạn đang cần áp dụng cấp thiết nhất cho công việc?",
      quickReplies: [
        { label: "Hàm & công thức nâng cao (XLOOKUP, SUMIFS lồng nhau)", value: "ham_cong_thuc" },
        { label: "PivotTable & Quản lý cơ sở dữ liệu lớn", value: "pivottable_dulieu" },
        { label: "Báo cáo tự động & Thiết kế Dashboard", value: "dashboard_baocao" },
        { label: "Lấy lại gốc từ đầu & Chuẩn hóa bảng tính", value: "chuan_hoa_tu_dau" },
      ],
    },
    {
      stepId: "EXCEL_4",
      slot: "studyTimePerWeek",
      question: "Mỗi tuần bạn có thể dành khoảng bao nhiêu thời gian để học thực hành?",
      quickReplies: [
        { label: "Dưới 3 giờ", value: "under_3h" },
        { label: "3–5 giờ (2-3 buổi ca tối)", value: "3_5h" },
        { label: "5–8 giờ", value: "5_8h" },
        { label: "Lớp cuối tuần Thứ 7 - CN", value: "cuoi_tuan" },
      ],
    },
  ],
};

// 4. Comprehensive Office Flow
export const OFFICE_FLOW: JourneyFlowDefinition = {
  flowId: "office_comprehensive",
  title: "Khóa Học Tin Học Văn Phòng Toàn Diện",
  requiredSlots: ["currentLevel", "requiredSkills", "targetDate", "studyTimePerWeek"],
  steps: [
    {
      stepId: "OFFICE_1",
      slot: "currentLevel",
      question: "Trình độ tin học văn phòng tổng quát của bạn hiện tại thế nào?",
      quickReplies: [
        { label: "Mới bắt đầu / Mất gốc từ số 0", value: "beginner_zero" },
        { label: "Đã biết gõ văn bản và tính toán cơ bản", value: "basic_elementary" },
        { label: "Đã đi làm, muốn chuẩn hóa tốc độ x2", value: "intermediate_adv" },
      ],
    },
    {
      stepId: "OFFICE_2",
      slot: "requiredSkills",
      question: "Bạn muốn tập trung hoàn thiện bộ kỹ năng văn phòng nào nhất?",
      quickReplies: [
        { label: "Trọn bộ 3 môn: Word + Excel + PowerPoint", value: "full_combo_3" },
        { label: "Tập trung chuyên sâu Excel & Word", value: "excel_word" },
        { label: "Thiết kế Slide thuyết trình PowerPoint chuyên nghiệp", value: "powerpoint_design" },
      ],
    },
    {
      stepId: "OFFICE_3",
      slot: "targetDate",
      question: "Bạn dự định hoàn thành khóa học văn phòng trong bao lâu?",
      quickReplies: [
        { label: "Trong 1 tháng (Cấp tốc)", value: "within_1_month" },
        { label: "1–3 tháng", value: "1_3_months" },
        { label: "3–6 tháng", value: "3_6_months" },
        { label: "Chưa có thời hạn cụ thể", value: "flexible" },
      ],
    },
    {
      stepId: "OFFICE_4",
      slot: "studyTimePerWeek",
      question: "Mỗi tuần bạn có thể dành khoảng bao nhiêu thời gian để học?",
      quickReplies: [
        { label: "Dưới 3 giờ", value: "under_3h" },
        { label: "3–5 giờ (2-3 buổi ca tối)", value: "3_5h" },
        { label: "5–8 giờ", value: "5_8h" },
        { label: "Lớp cuối tuần Thứ 7 - CN", value: "cuoi_tuan" },
      ],
    },
  ],
};

export const JOURNEY_FLOWS: Record<string, JourneyFlowDefinition> = {
  mos_certification: MOS_FLOW,
  ic3_certification: IC3_FLOW,
  practical_excel: PRACTICAL_EXCEL_FLOW,
  office_comprehensive: OFFICE_FLOW,
};
