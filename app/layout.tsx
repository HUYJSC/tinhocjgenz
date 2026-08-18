import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Configure premium fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

// Production-ready SEO Metadata
export const metadata: Metadata = {
  title: "Thầy giáo GenZ | Học Tin Học Văn Phòng Thực Chiến Đột Phá",
  description: "Trung tâm đào tạo Tin học văn phòng thực chiến theo phong cách GenZ tại tinhocgenz.io.vn. Cam kết làm được việc ngay. Excel nâng cao, Word, PowerPoint, Luyện thi MOS. Dịch vụ cài đặt Windows, Office, cài phần mềm đồ họa & theo yêu cầu uy tín.",
  keywords: ["tin hoc van phong", "excel nang cao", "hoc excel online", "luyen thi mos", "thay giao genz", "tinhocgenz", "cai win", "cai office", "cai phan mem do hoa", "cai phan mem theo yeu cau"],
  authors: [{ name: "Thầy giáo GenZ" }],
  metadataBase: new URL("https://tinhocgenz.io.vn"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Thầy giáo GenZ | Học Tin Học Văn Phòng Thực Chiến Đột Phá",
    description: "Khóa học Tin học văn phòng Excel, Word, PPT thực chiến, cam kết làm được việc. Dịch vụ cài đặt hệ điều hành & cài đặt phần mềm uy tín.",
    url: "https://tinhocgenz.io.vn",
    siteName: "Thầy giáo GenZ",
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${spaceGrotesk.variable} h-full scroll-smooth`}>
      <body className="font-sans antialiased min-h-full flex flex-col bg-white text-slate-900">
        {/* Navigation Header */}
        <Header />
        
        {/* Main Content Area */}
        <main className="flex-grow flex flex-col relative">
          {children}
        </main>
        
        {/* Footer Area */}
        <Footer />
      </body>
    </html>
  );
}
