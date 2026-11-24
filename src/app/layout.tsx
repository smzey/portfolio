import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Phanu Sawet — Full-Stack & On-Device AI Engineer',
  description:
    'Engineering portfolio of Phanu Sawet (CMU CAMT MMIT · Major GPA 3.56). Privacy-preserving local LLMs, zero-cloud CNN inference, 358-test TypeScript systems, and logistics optimization. Available for WIL 19 Co-op (Jun 2027 – Mar 2028).',
  openGraph: {
    title: 'Phanu Sawet — Full-Stack & On-Device AI Engineer',
    description:
      'On-device AI, deterministic safety architectures, 358-test full-stack systems, and logistics optimization. Available for WIL 19 (Jun 2027 – Mar 2028).',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
