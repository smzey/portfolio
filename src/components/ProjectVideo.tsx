'use client';

import { useEffect, useRef, useState } from 'react';
import type { Lang, ProjectVideo as Video } from '@/data/portfolio';
import styles from './ProjectVideo.module.css';

/** Muted looping demo clip. Nothing downloads until ≥50% in view; never autoplays under reduced motion. */
export default function ProjectVideo({ video, lang }: { video: Video; lang: Lang }) {
  const ref = useRef<HTMLVideoElement>(null);
  // Read the preference synchronously: this component only mounts client-side (inside the drawer),
  // and an initial `false` would let the in-view effect start playback before the real value lands.
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <video
          ref={ref}
          className={styles.video}
          muted
          playsInline
          loop
          preload="none"
          poster={video.poster}
          controls={reduced && playing}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label={video.caption[lang]}
        >
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>
        {reduced && !playing && (
          <button type="button" className={styles.play} onClick={() => void ref.current?.play()}>
            ▶ {lang === 'en' ? 'Play demo' : 'เล่นเดโม'}
          </button>
        )}
      </div>
      <figcaption className={styles.caption}>{video.caption[lang]}</figcaption>
    </figure>
  );
}
