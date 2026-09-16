# Tin Học Gen Z — UI/Code Rules

## Màu

Chỉ dùng một màu thương hiệu chính: Blue. White là nền chính. Slate là trung tính. Red chỉ dành cho trạng thái lỗi/cảnh báo.

- `#0057B8`: primary action, link, active state
- `#003F88`: hover/emphasis
- `#0B2545`: heading/navy surfaces
- `#FFFFFF`: surface/card
- `#F4F8FD`: page soft background

Không thêm màu mới chỉ để “làm đẹp card”. Nếu cần phân cấp, dùng độ đậm/nhạt, border, spacing và typography.

## Font

- Inter là font chính.
- Body ưu tiên 14–16px; nội dung dài 16px nếu không gian cho phép.
- Caption/badge không nhỏ hơn 12px.
- Heading dùng `font-semibold`/`font-bold`; tránh `font-black`.
- Không viết hoa toàn bộ cho nội dung dài.

## Component

- Component server là mặc định; chỉ thêm `"use client"` khi thật sự cần state, effect hoặc browser API.
- Không nhét desktop và mobile implementation độc lập vào cùng component nếu layout đã phân tuyến chúng.
- Không tạo Tailwind class bằng string interpolation runtime.
- Không tạo component chỉ để bọc 1–2 class nếu không có logic/tái sử dụng rõ ràng.
- Không tạo 5 biến thể của cùng một card chỉ khác màu.

## Hiệu ứng

- Không gradient trang trí mặc định.
- Không ambient glow.
- Shadow nhẹ; border rõ.
- Animation chỉ dùng khi truyền đạt trạng thái/chuyển tiếp, không dùng để mọi thành phần đều “chuyển động”.
- Tôn trọng `prefers-reduced-motion`.

## Bo góc

- Button/input: `rounded-lg` hoặc `rounded-xl`.
- Card: `rounded-xl` hoặc `rounded-2xl`.
- Không dùng `rounded-3xl` đại trà.

## Quy tắc code “giống người làm sản phẩm”

- Ưu tiên code ngắn, trực tiếp, dễ đọc hơn abstraction không cần thiết.
- Tên biến thể hiện nghiệp vụ, không dùng tên marketing mơ hồ như `premiumGlow`, `magicCard`, `aiGradient`.
- Không để import/icon/state thừa.
- Không tắt ESLint rule để che lỗi; sửa nguyên nhân hoặc ghi chú có lý do cụ thể.
- Một thay đổi UI không được vô tình thay đổi API, dữ liệu hoặc SEO route.

## Admin UI

Admin dùng cùng ngôn ngữ thị giác với public site:

- Blue: action, active state, navigation, focus.
- Slate: background, text hierarchy, border.
- Emerald: success/active/đã hoàn tất.
- Amber: warning/pending/chú ý.
- Rose/Red: error/danger/delete/critical.

Không dùng purple, indigo, cyan, teal, pink, orange hoặc yellow chỉ để phân biệt card/module. Không dùng gradient làm trang trí. Badge/caption tối thiểu 12px; không dùng `font-black`.

## Ảnh và hiệu năng

- Dùng `next/image` cho ảnh nội bộ và remote domain đã kiểm soát.
- Ảnh remote động từ CMS chỉ dùng `unoptimized` ở từng instance nếu chưa thể allowlist domain.
- Luôn cung cấp `sizes` cho ảnh `fill`.
- Ảnh LCP chỉ preload khi thật sự nằm above-the-fold.
- Không tắt Image Optimization ở cấp toàn ứng dụng.
- `<picture>` được phép khi cần art-direction theo breakpoint và đã có AVIF/WebP tối ưu sẵn.

## Security trước deploy

- Không hard-code password, OTP/MFA, API key, session secret hoặc cron secret trong client/source.
- Production auth phải lấy credential từ server-only environment variables.
- Secret thật không được đưa vào `.env.example`.
- Không thêm `eslint-disable`/`ts-ignore` chỉ để làm CI xanh.
