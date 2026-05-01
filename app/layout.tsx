import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'STRETCH Studio — Assisted Stretching & Flexibility | Scottsdale, AZ',
  description:
    "Scottsdale's premier assisted stretching studio. One-on-one flexibility therapy, mobility work, and posture correction to help you move better every day.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
