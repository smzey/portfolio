import type { Metadata } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Thai } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const ibmSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmThai = IBM_Plex_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '500', '600'],
  variable: '--font-thai',
  display: 'swap',
});

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Phanu Sawet — Full-Stack & On-Device AI Engineer',
  description:
    'Engineering portfolio of Phanu Sawet (CMU CAMT MMIT · Major GPA 3.56). Privacy-preserving local LLMs, zero-cloud CNN inference, 358-test TypeScript systems, and logistics optimization. Available for 10-Month Co-op / Internship (Jun 2027 – Mar 2028).',
  openGraph: {
    title: 'Phanu Sawet — Full-Stack & On-Device AI Engineer',
    description:
      'On-device AI, deterministic safety architectures, 358-test full-stack systems, and logistics optimization. Available for 10-Month Co-op / Internship (Jun 2027 – Mar 2028).',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${bricolage.variable} ${ibmSans.variable} ${ibmThai.variable} ${ibmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
