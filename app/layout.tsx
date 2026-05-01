// @ts-nocheck
import type { Metadata } from 'next';

import { KorivaLivePreview } from '@/components/KorivaLivePreview';
export const metadata: Metadata = {
  title: 'STRETCH Studio — Assisted Stretching & Flexibility | Scottsdale, AZ',
  description:
    "Scottsdale's premier assisted stretching studio. One-on-one flexibility therapy, mobility work, and posture correction to help you move better every day.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = await getKorivaConfig();
  const vars = buildCssVars(cfg?.brand);
  return (
    <html lang="en" style={vars as React.CSSProperties}>
      <body>{children}<KorivaLivePreview /></body>
    </html>
  );
}
