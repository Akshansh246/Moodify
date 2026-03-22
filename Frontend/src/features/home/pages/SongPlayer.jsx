import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import SideBar from "../components/SideBar";
import { useSong } from "../hooks/useSong";

const SongPlayer = () => {
    const { id } = useParams();
    const { song, loading, handleGetSongByID } = useSong();

    const audioRef = useRef(null);
    const isSeekingRef = useRef(false);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        handleGetSongByID({ id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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
        console.error(error);
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
        setCurrentTime(Number(e.target.value));
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
        <div className="w-full h-full flex bg-linear-to-br from-[#6D28D9] via-[#A78BFA] to-[#F1F5F9] text-indigo-950">
            <SideBar />
            <div className="w-full h-full py-3 pr-3">
            <div className="w-full h-full bg-stone-100 rounded-2xl p-4 flex items-center justify-center">
                <p>Loading song...</p>
            </div>
            </div>
        </div>
        );
    }

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <main className="w-full h-full flex items-center justify-center">
        <div className="flex gap-6 items-center bg-white rounded-lg w-fit h-fit">
            <div
            className={`rounded-full h-40 w-40 scale-200 ${isPlaying ? "animate-spin" : ""}`}
            style={{
                backgroundImage:"url(https://ik.imagekit.io/devakshu/f6658be2ac51574ddfd498b64cdbd35b.png)"
            }}
            >
                
            </div>
            <div className="flex-1 flex flex-col gap-5 p-5 pl-20">
            <div>
                <h1 className="text-3xl font-bold">{song.title}</h1>
            </div>
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
                className="w-full h-2 rounded-full cursor-pointer appearance-none"
                style={{
                background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`,
                }}
            />

            <div className="flex items-center gap-4">
                <span>{formatTime(currentTime)}</span>
                <button
                onClick={() => seekBy(-10)}
                className="px-4 py-2 rounded-full bg-stone-200 hover:bg-stone-300 transition cursor-pointer"
                >
                    <svg
                    className="w-5 lg:w-10 text-black/50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    >
                    <path d="M8 11.3333L18.2227 4.51823C18.4524 4.36506 18.7628 4.42714 18.916 4.65691C18.9708 4.73904 19 4.83555 19 4.93426V19.0657C19 19.3419 18.7761 19.5657 18.5 19.5657C18.4013 19.5657 18.3048 19.5365 18.2227 19.4818L8 12.6667V19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19V5C6 4.44772 6.44772 4 7 4C7.55228 4 8 4.44772 8 5V11.3333Z" />
                    </svg>
                </button>

                <button
                onClick={togglePlay}
                className="px-6 py-5 rounded-full bg-indigo-600 text-white text-3xl cursor-pointer hover:scale-105 transition"
                >
                {isPlaying ? "⏸" : "▶"}
                </button>

                <button
                onClick={() => seekBy(10)}
                className="px-4 py-2 rounded-full bg-stone-200 hover:bg-stone-300 transition cursor-pointer"
                >
                    <svg
                    className="w-6 lg:w-10 text-black/50"
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

        <audio ref={audioRef} autoPlay loop className="hidden" preload="metadata" />
        </main>
    );
};

export default SongPlayer;
