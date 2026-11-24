import type { Metadata } from 'next';
import { Anuphan, Doto } from 'next/font/google';
import './globals.css';
import { SITE_URL } from '../lib/site.ts';

// Anuphan carries Thai and Latin in one family, so EN and TH share one voice.
const anuphan = Anuphan({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

// Dot-matrix face, used only for printed ledger figures (data), never for prose.
const doto = Doto({
  subsets: ['latin'],
  weight: ['500', '800'],
  variable: '--font-dot',
  display: 'swap',
});

// Applies the saved (or system) theme and language before first paint.
const prefsScript = `try{var t=localStorage.getItem('phanu-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);if(localStorage.getItem('phanu-lang')==='th')document.documentElement.lang='th'}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  title: 'Phanu Sawet — Full-Stack & On-Device AI Engineer',
  description:
    'Engineering portfolio of Phanu Sawet (CMU CAMT MMIT · Major GPA 3.56 · Head TA for AIoT & multi-term CMU TA). Privacy-preserving local LLMs, zero-cloud CNN/YOLOv8 inference, 358-test TypeScript systems, and logistics optimization. Available for 10-Month Co-op / Internship (Jun 2027 – Mar 2028).',
  openGraph: {
    title: 'Phanu Sawet — Full-Stack & On-Device AI Engineer',
    description:
      'On-device AI, deterministic safety architectures, 358-test full-stack systems, and logistics optimization. Available for 10-Month Co-op / Internship (Jun 2027 – Mar 2028).',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anuphan.variable} ${doto.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
