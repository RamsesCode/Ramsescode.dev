"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import styles from "./hero.module.css";

const VIDEO_SOURCE = "/videos/hero_loop_1.mp4";
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia(MOTION_QUERY);
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(MOTION_QUERY).matches;
}

// The server renders the image only, preventing a video fetch before preferences are known.
function getServerReducedMotion() {
  return true;
}

export function HeroVideo({ children }: { children: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotion,
    getServerReducedMotion,
  );
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      // React removes src; load() releases the previous media and its download.
      video.load();
      return;
    }

    // Also restore after React Strict Mode's development cleanup/remount cycle.
    if (video.getAttribute("src") !== VIDEO_SOURCE) video.src = VIDEO_SOURCE;
    const resume = () => {
      if (!document.hidden && !userPaused) {
        // Autoplay can be blocked by device settings. The image and Play button remain.
        void video.play().catch(() => {});
      }
    };
    const handleVisibility = () => {
      if (document.hidden) video.pause();
      else resume();
    };

    if (userPaused) video.pause();
    else resume();
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pageshow", resume);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", resume);
      video.pause();
    };
  }, [reducedMotion, userPaused]);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (!video) return;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      // Call within the click to preserve the browser's user-activation permission.
      void video.play().catch(() => {});
    } else {
      setUserPaused(true);
      video.pause();
    }
  }

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    // Change the media property within the click so unmuting is user-initiated.
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <>
      <div className={styles.media} aria-hidden="true">
        {children}
        <video
          ref={videoRef}
          className={`${styles.image} ${styles.video}`}
          src={reducedMotion ? undefined : VIDEO_SOURCE}
          autoPlay={!reducedMotion && !userPaused}
          muted={muted}
          loop
          playsInline
          preload={reducedMotion ? "none" : "auto"}
          disablePictureInPicture
          tabIndex={-1}
          data-visible={!reducedMotion && hasFrame && !failed}
          onPlaying={() => {
            setPlaying(true);
            setHasFrame(true);
          }}
          onPause={() => setPlaying(false)}
          onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
          onEmptied={() => {
            setHasFrame(false);
            setPlaying(false);
          }}
          onError={() => {
            setFailed(true);
            setPlaying(false);
          }}
        />
        <div className={styles.shade} />
      </div>
      {!reducedMotion && !failed && (
        <div
          className={styles.mediaControls}
          role="group"
          aria-label="Background video controls"
        >
          <button
            type="button"
            className={styles.motionControl}
            onClick={togglePlayback}
            aria-label={playing ? "Pause background video" : "Play background video"}
            title={playing ? "Pause background video" : "Play background video"}
          >
            {playing ? (
              <Pause size={15} aria-hidden="true" />
            ) : (
              <Play size={15} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className={styles.motionControl}
            onClick={toggleSound}
            aria-label={muted ? "Unmute background video" : "Mute background video"}
            title={muted ? "Unmute background video" : "Mute background video"}
          >
            {muted ? (
              <VolumeX size={15} aria-hidden="true" />
            ) : (
              <Volume2 size={15} aria-hidden="true" />
            )}
          </button>
        </div>
      )}
    </>
  );
}
