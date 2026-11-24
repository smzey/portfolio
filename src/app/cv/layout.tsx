import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cv',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Phanu Sawet — Curriculum Vitae',
  description:
    'Curriculum Vitae of Phanu Sawet — Full-Stack & On-Device AI Engineer (Chiang Mai University, CAMT MMIT · Major GPA 3.56).',
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return <div className={sourceSans.variable}>{children}</div>;
}
