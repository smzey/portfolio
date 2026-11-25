import type { PassbookEdition } from '@/lib/edition';
import styles from './Passbook.module.css';

/** Original geometric "P" monogram mark for phanu.xyz passbook covers. */
export function MonogramMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="31" height="31" rx="5" stroke="currentColor" strokeWidth="2" />
      <rect x="5" y="5" width="24" height="24" rx="2.5" stroke="currentColor" strokeOpacity="0.32" strokeWidth="1" />
      <path
        d="M12.5 24.5V9.5H18.2C20.9 9.5 22.6 11.1 22.6 13.7C22.6 16.3 20.9 17.9 18.2 17.9H15.2V24.5H12.5ZM15.2 15.5H17.9C19.2 15.5 19.9 14.8 19.9 13.7C19.9 12.6 19.2 11.9 17.9 11.9H15.2V15.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Original lightweight inline SVG geometric cover motifs — zero third-party logos. */
export default function CoverArtwork({ edition }: { edition: PassbookEdition }) {
  switch (edition) {
    case 'emerald':
      return (
        <svg className={styles.coverArt} viewBox="0 0 640 388" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g opacity="0.12">
            <polygon points="410,0 495,0 375,260 290,260" fill="#ffffff" />
            <polygon points="510,0 575,0 455,260 390,260" fill="#b7ebd0" />
            <polygon points="590,0 640,0 535,230 485,230" fill="#ffffff" />
          </g>
          <g opacity="0.28">
            <polygon points="468,62 558,62 528,128 438,128" fill="#e06d53" />
            <polygon points="424,142 510,142 482,202 396,202" fill="#ffffff" opacity="0.32" />
          </g>
          <path d="M0 112 H640" stroke="#ffffff" strokeOpacity="0.12" strokeWidth="1" />
        </svg>
      );

    case 'violet':
      return (
        <svg className={styles.coverArt} viewBox="0 0 640 388" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g fill="#ffffff" opacity="0.14">
            <polygon points="470,20 510,60 470,100 430,60" />
            <polygon points="550,20 590,60 550,100 510,60" opacity="0.85" />
            <polygon points="510,60 550,100 510,140 470,100" opacity="1" />
            <polygon points="590,60 630,100 590,140 550,100" opacity="0.7" />
            <polygon points="430,100 470,140 430,180 390,140" opacity="0.6" />
            <polygon points="550,100 590,140 550,180 510,140" opacity="0.9" />
            <polygon points="470,140 510,180 470,220 430,180" opacity="0.5" />
            <polygon points="590,140 630,180 590,220 550,180" opacity="0.55" />
            <polygon points="510,180 550,220 510,260 470,220" opacity="0.4" />
          </g>
          <path d="M360 0 L640 280" stroke="#e3b94f" strokeOpacity="0.34" strokeWidth="1.5" />
          <path d="M400 0 L640 240" stroke="#e3b94f" strokeOpacity="0.2" strokeWidth="1" />
        </svg>
      );

    case 'gold':
      return (
        <svg className={styles.coverArt} viewBox="0 0 640 388" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect x="468" y="0" width="172" height="170" fill="#33302c" opacity="0.12" />
          <g stroke="#1a1815" strokeOpacity="0.14" strokeWidth="1.2" fill="none">
            <line x1="360" y1="0" x2="640" y2="280" />
            <line x1="410" y1="0" x2="640" y2="230" />
            <line x1="460" y1="0" x2="640" y2="180" />
            <rect x="498" y="28" width="110" height="110" rx="6" />
            <rect x="514" y="44" width="78" height="78" rx="4" />
          </g>
        </svg>
      );

    case 'obsidian':
      return (
        <svg className={styles.coverArt} viewBox="0 0 640 388" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="#76b900" strokeOpacity="0.22" strokeWidth="1" fill="none">
            <path d="M360 40 H580 L610 70 V210" />
            <path d="M400 78 H555 L580 103 V190" />
            <path d="M445 116 H530 L550 136 V176" />
            <path d="M490 0 V156 L530 196 H640" />
          </g>
          <g fill="#76b900" opacity="0.45">
            <circle cx="360" cy="40" r="3" />
            <circle cx="400" cy="78" r="3" />
            <circle cx="445" cy="116" r="3" />
            <circle cx="610" cy="210" r="3" />
          </g>
          <g fill="#76b900" opacity="0.16">
            <rect x="520" y="28" width="6" height="6" />
            <rect x="540" y="28" width="6" height="6" />
            <rect x="560" y="28" width="6" height="6" />
            <rect x="540" y="48" width="6" height="6" />
            <rect x="560" y="48" width="6" height="6" />
          </g>
        </svg>
      );

    case 'marine':
      return (
        <svg className={styles.coverArt} viewBox="0 0 640 388" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M320 0 Q470 110 640 72 L640 124 Q465 162 270 0 Z" fill="#1ca7ec" opacity="0.24" />
          <path d="M390 0 Q510 88 640 58 L640 74 Q505 104 366 0 Z" fill="#d63c3e" opacity="0.34" />
          <path d="M240 0 Q435 165 640 156" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1.2" fill="none" />
          <path d="M200 0 Q420 190 640 184" stroke="#ffffff" strokeOpacity="0.09" strokeWidth="1" fill="none" />
        </svg>
      );

    case 'cobalt':
      return (
        <svg className={styles.coverArt} viewBox="0 0 640 388" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1.1" fill="none">
            <path d="M0 95 Q160 55 320 95 T640 95" />
            <path d="M0 125 Q160 85 320 125 T640 125" />
            <path d="M0 155 Q160 115 320 155 T640 155" />
            <path d="M0 185 Q160 145 320 185 T640 185" />
          </g>
          <polygon points="480,0 640,0 640,165" fill="#4d85e6" opacity="0.24" />
        </svg>
      );

    case 'sky':
      return (
        <svg className={styles.coverArt} viewBox="0 0 640 388" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <polygon points="430,0 640,0 640,210" fill="#ffffff" opacity="0.14" />
          <polygon points="510,0 640,0 640,130" fill="#7cd4fc" opacity="0.22" />
          <line x1="390" y1="0" x2="640" y2="250" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1.2" />
        </svg>
      );

    case 'frost':
      return (
        <svg className={styles.coverArt} viewBox="0 0 640 388" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g fill="#0050f0" opacity="0.14">
            <rect x="468" y="24" width="32" height="32" />
            <rect x="506" y="24" width="32" height="32" />
            <rect x="544" y="24" width="32" height="32" />
            <rect x="582" y="24" width="32" height="32" />
            <rect x="506" y="62" width="32" height="32" />
            <rect x="544" y="62" width="32" height="32" />
            <rect x="582" y="62" width="32" height="32" />
            <rect x="544" y="100" width="32" height="32" />
            <rect x="582" y="100" width="32" height="32" />
          </g>
          <rect x="468" y="62" width="32" height="32" fill="#e05a1b" opacity="0.28" />
          <rect x="582" y="138" width="32" height="32" fill="#e05a1b" opacity="0.22" />
        </svg>
      );

    case 'navy':
    default:
      return (
        <svg className={styles.coverArt} viewBox="0 0 640 388" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="#8fc5b0" strokeOpacity="0.18" strokeWidth="1.1" fill="none">
            <path d="M0 110 C160 65 320 155 480 110 C540 94 590 96 640 110" />
            <path d="M0 132 C160 87 320 177 480 132 C540 116 590 118 640 132" />
            <path d="M0 154 C160 109 320 199 480 154 C540 138 590 140 640 154" />
          </g>
          <rect x="16" y="16" width="608" height="356" rx="14" stroke="#eaf2f7" strokeOpacity="0.12" strokeWidth="1" fill="none" />
        </svg>
      );
  }
}
