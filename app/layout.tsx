import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "마음플레이_감정일기 | 대구광역시교육청 마음학기제",
  description: "중학생 마음성장 15차시 감정일기 & 나만의 성장 소설 문집 제작 서비스",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💌</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="antialiased selection:bg-rosepink-light selection:text-rosepink">
        {children}
      </body>
    </html>
  );
}
