import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, PrevIcon, NextIcon } from './Icons.jsx';

// Royalty-free workout tracks (SoundHelix, free for use). Imported as assets so
// Vite bundles them with correct relative URLs that also work in Electron.
import morningEnergy from '../assets/music/morning-energy.mp3';
import powerHour from '../assets/music/power-hour.mp3';
import coolDown from '../assets/music/cool-down.mp3';

const musicTracks = [
  { title: 'Morning Energy', artist: 'SoundHelix', src: morningEnergy },
  { title: 'Power Hour', artist: 'SoundHelix', src: powerHour },
  { title: 'Cool Down', artist: 'SoundHelix', src: coolDown },
];

export default function MusicPlayer() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const howlRef = useRef(null);

  // Create / recreate the Howl when the track changes.
  useEffect(() => {
    howlRef.current = new Howl({
      src: [musicTracks[index].src],
      html5: true,
      loop: true,
      volume: 0.5,
      onend: () => next(),
    });
    if (playing) howlRef.current.play();
    return () => {
      howlRef.current?.unload();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const togglePlay = () => {
    const h = howlRef.current;
    if (!h) return;
    if (playing) {
      h.pause();
      setPlaying(false);
    } else {
      h.play();
      setPlaying(true);
    }
  };

  const next = () => setIndex((i) => (i + 1) % musicTracks.length);
  const prev = () => setIndex((i) => (i - 1 + musicTracks.length) % musicTracks.length);

  const track = musicTracks[index];

  return (
    <div className="card card-gradient-purple p-4">
      <div className="flex items-center gap-3">
        {/* Animated equalizer bars (only animate while playing) */}
        <div className="flex h-12 w-12 shrink-0 items-end justify-center gap-1 rounded-xl bg-white/15 p-2">
          {[0, 1, 2, 3].map((b) => (
            <span
              key={b}
              className={`w-1.5 rounded-full bg-white ${playing ? 'animate-equalize' : ''}`}
              style={{
                height: playing ? '100%' : '30%',
                animationDelay: `${b * 0.15}s`,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-white">{track.title}</p>
          <p className="truncate text-sm text-white/80">{track.artist}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={prev}
          aria-label="Previous track"
          className="tap-target rounded-2xl bg-white/15 text-white transition-all duration-300 hover:bg-white/25 active:scale-95"
        >
          <PrevIcon width={22} height={22} />
        </button>
        <motion.button
          onClick={togglePlay}
          whileTap={{ scale: 0.9 }}
          aria-label={playing ? 'Pause' : 'Play'}
          className="tap-target h-14 w-14 rounded-full bg-white text-purple-brand shadow-glow transition-all duration-300"
        >
          {playing ? <PauseIcon width={26} height={26} /> : <PlayIcon width={26} height={26} />}
        </motion.button>
        <button
          onClick={next}
          aria-label="Next track"
          className="tap-target rounded-2xl bg-white/15 text-white transition-all duration-300 hover:bg-white/25 active:scale-95"
        >
          <NextIcon width={22} height={22} />
        </button>
      </div>
    </div>
  );
}
