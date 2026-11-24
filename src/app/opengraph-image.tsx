import { ImageResponse } from 'next/og';

export const alt = 'Phanu Sawet — Full-Stack & On-Device AI Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0b0c0e',
          color: '#f2f3f5',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, color: '#8b9099', letterSpacing: 2 }}>PHANU.XYZ</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -2 }}>Phanu Sawet</div>
          <div style={{ fontSize: 44, color: '#c9ccd2', marginTop: 12 }}>Full-Stack &amp; On-Device AI Engineer</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 28, color: '#c9ccd2' }}>
          <div style={{ width: 16, height: 16, borderRadius: 8, background: '#34d399', marginRight: 16 }} />
          Available · 10-month co-op · Jun 2027 – Mar 2028
        </div>
      </div>
    ),
    size,
  );
}
