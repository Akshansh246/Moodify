/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression() {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");
    const [emoji, setEmoji] = useState("🎵");
    const [confidence, setConfidence] = useState(null);

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    const handleDetect = () => {
        detect({
            landmarkerRef,
            videoRef,
            setExpression,
            setConfidence,
            setEmoji
        });
    };

    return (
        <div className="w-full h-full flex flex-col items-center gap-4 relative bg-white px-5">
            <div className="w-full bg-white flex items-center justify-between py-3 z-2">
                <div className="flex gap-2">
                    <svg className="w-5 text-black/50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 9.2L22.2133 5.55071C22.4395 5.39235 22.7513 5.44737 22.9096 5.6736C22.9684 5.75764 23 5.85774 23 5.96033V18.0397C23 18.3158 22.7761 18.5397 22.5 18.5397C22.3974 18.5397 22.2973 18.5081 22.2133 18.4493L17 14.8V19C17 19.5523 16.5523 20 16 20H2C1.44772 20 1 19.5523 1 19V5C1 4.44772 1.44772 4 2 4H16C16.5523 4 17 4.44772 17 5V9.2Z"></path></svg>
                    <h2 className="font-bold">Live Mood Analysis</h2>
                </div>
                <div className="p-1 rounded bg-gray-700/10 text-sm font-bold text-black/50"><span className="text-red-600">◉</span> LIVE SCAN</div>
            </div>
            <div className="w-fit h-fit relative -mt-10">
                <video
                    className="w-full h-full rounded-b-4xl"
                    ref={videoRef}
                    playsInline
                    autoPlay
                />

                <div className="text-center w-3/4 absolute left-0 bottom-7 bg-white py-3 px-4 rounded-r-2xl lg:flex items-center justify-between hidden">
                    <div className="flex items-center gap-2">
                        <div className="bg-orange-400 py-1.5 text-5xl rounded-full flex items-center justify-center">
                        <p>{emoji}</p>
                        </div>
                        <h2 className="text-sm flex flex-col items-start font-semibold text-black/50">DETECTED MOOD <span className="text-black text-xl font-semibold">{expression}</span></h2>
                    </div>
                    {confidence !== null && (
                        <p className="text-black/50 flex flex-col items-start text-sm font-semibold">
                            CONFIDENCE <span className="text-xl font-bold text-blue-400"> {(confidence * 100).toFixed(2)}%</span>
                        </p>
                    )}
                </div> 
            </div>

            <button
                className="bg-orange-400 text-white py-2 px-4 rounded-lg cursor-pointer text-2xl"
                onClick={handleDetect}
            >
                Detect Expression
            </button>
        </div>
    );
}