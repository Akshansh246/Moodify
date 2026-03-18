/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";

const Player = () => {
  const { song, loading } = useSong();
  const audioRef = useRef(null);
  const isSeekingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song?.url) return;

    const syncDuration = () => {
      const d = Number.isFinite(audio.duration) ? audio.duration : 0;
      setDuration(d);
    };

    const syncTime = () => {
      if (!isSeekingRef.current) {
        setCurrentTime(
          Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
        );
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    audio.pause();
    audio.src = song.url;
    audio.load();

    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("durationchange", syncDuration);
    audio.addEventListener("canplay", syncDuration);
    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    if (audio.readyState >= 1) {
      syncDuration();
    }

    return () => {
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("durationchange", syncDuration);
      audio.removeEventListener("canplay", syncDuration);
      audio.removeEventListener("timeupdate", syncTime);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [song?.url]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !song?.url) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error("Audio play error:", error);
    }
  };

  const seekBy = (seconds) => {
    const audio = audioRef.current;
    if (!audio) return;

    const max = Number.isFinite(audio.duration) ? audio.duration : 0;
    const next = Math.max(
      0,
      Math.min(
        max,
        (Number.isFinite(audio.currentTime) ? audio.currentTime : 0) + seconds,
      ),
    );

    audio.currentTime = next;
    setCurrentTime(next);
  };

  const handleSeekChange = (e) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
  };

  const handleSeekStart = () => {
    isSeekingRef.current = true;
  };

  const handleSeekEnd = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = currentTime;
    isSeekingRef.current = false;
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading || !song) {
    return (
      <div className="bg-white p-4 rounded-3xl">
        <p>Loading...</p>
      </div>
    );
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-white p-4 rounded-3xl">
      <div className="flex gap-5">
        <img
          src={song.posterUrl}
          alt={song.title}
          className="w-75 h-75 rounded-xl object-cover"
        />
        <div className="w-full text-center flex flex-col gap-3 justify-end">
          <div className="w-full flex items-center justify-center">
            <svg
              className={`w-40 ${isPlaying ? "animate-spin" : ""}`}
              viewBox="0 0 24 24"
              xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:cc="http://creativecommons.org/ns#"
              xmlns:dc="http://purl.org/dc/elements/1.1/"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g transform="translate(0 -1028.4)">
                  {" "}
                  <path
                    d="m12 1029.4c-6.0751 0-11 4.9-11 11 0 6 4.9249 11 11 11 6.075 0 11-5 11-11 0-6.1-4.925-11-11-11zm0 4c3.866 0 7 3.1 7 7 0 3.8-3.134 7-7 7s-7-3.2-7-7c0-3.9 3.134-7 7-7z"
                    fill="#2c3e50"
                  ></path>{" "}
                  <path
                    d="m17 1031.7c-4.783-2.8-10.899-1.1-13.66 3.7-2.7617 4.7-1.1229 10.9 3.66 13.6 4.783 2.8 10.899 1.1 13.66-3.6 2.762-4.8 1.123-10.9-3.66-13.7zm-4 6.9c0.957 0.6 1.284 1.8 0.732 2.8-0.552 0.9-1.775 1.2-2.732 0.7-0.957-0.6-1.2843-1.8-0.732-2.7 0.552-1 1.775-1.3 2.732-0.8z"
                    fill="#2c3e50"
                  ></path>{" "}
                  <path
                    d="m6.0098 1032.3c-2.2488 1.7-3.6216 4.2-3.9375 6.8l7.9647 1c0.065-0.6 0.33-1 0.782-1.4l-4.8092-6.4zm15.913 9.2-7.938-1c-0.065 0.6-0.357 1-0.808 1.4l4.809 6.4c2.248-1.7 3.621-4.2 3.937-6.8z"
                    fill="#34495e"
                  ></path>{" "}
                  <path
                    d="m12 1036.4c-2.2091 0-4 1.8-4 4s1.7909 4 4 4c2.209 0 4-1.8 4-4s-1.791-4-4-4zm0 3c0.552 0 1 0.4 1 1 0 0.5-0.448 1-1 1s-1-0.5-1-1c0-0.6 0.448-1 1-1z"
                    fill="#ae74dc"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>

          <h3 className="font-bold text-xl">{song.title}</h3>

          <div className="w-full">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={Math.min(currentTime, duration || 0)}
              onChange={handleSeekChange}
              onMouseDown={handleSeekStart}
              onMouseUp={handleSeekEnd}
              onTouchStart={handleSeekStart}
              onTouchEnd={handleSeekEnd}
              disabled={duration === 0}
              className="w-full cursor-pointer appearance-none h-2 rounded-full"
              style={{
                background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`,
              }}
            />
          </div>

          <div className="flex items-center justify-center gap-2 w-full">
            <span>{formatTime(currentTime)}</span>

            <button
              type="button"
              onClick={() => seekBy(-10)}
              className="text-black/50"
            >
              <svg
                className="w-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 11.3333L18.2227 4.51823C18.4524 4.36506 18.7628 4.42714 18.916 4.65691C18.9708 4.73904 19 4.83555 19 4.93426V19.0657C19 19.3419 18.7761 19.5657 18.5 19.5657C18.4013 19.5657 18.3048 19.5365 18.2227 19.4818L8 12.6667V19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19V5C6 4.44772 6.44772 4 7 4C7.55228 4 8 4.44772 8 5V11.3333Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="bg-indigo-600 w-15 text-white cursor-pointer px-3 py-2 rounded-full text-4xl flex items-center justify-center"
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              type="button"
              onClick={() => seekBy(10)}
              className="text-black/50"
            >
              <svg
                className="w-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 12.6667L5.77735 19.4818C5.54759 19.6349 5.23715 19.5729 5.08397 19.3431C5.02922 19.261 5 19.1645 5 19.0657V4.93426C5 4.65812 5.22386 4.43426 5.5 4.43426C5.59871 4.43426 5.69522 4.46348 5.77735 4.51823L16 11.3333V5C16 4.44772 16.4477 4 17 4C17.5523 4 18 4.44772 18 5V19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19V12.6667Z" />
              </svg>
            </button>

            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <audio ref={audioRef} className="hidden" preload="metadata" />
    </div>
  );
};

export default Player;
