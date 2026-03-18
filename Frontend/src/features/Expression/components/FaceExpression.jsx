/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onClick = () => {}}) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("sad");
    const [emoji, setEmoji] = useState("🎵");
    const [confidence, setConfidence] = useState(null);

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        setTimeout(() => {
            handleClick()
        }, 5000);

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


    async function handleClick() {
        const exp =  detect({
            landmarkerRef,
            videoRef,
            setExpression,
            setConfidence,
            setEmoji
        });
        onClick(exp)
    }

    return (
        <div className="w-full h-full flex flex-col items-center gap-4 relative bg-white px-7 pb-5 rounded-4xl overflow-hidden  ">
            <div className="w-full bg-white flex items-center justify-between py-3 z-2">
                <div className="flex gap-2">
                    <svg className="w-5 text-black/50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 9.2L22.2133 5.55071C22.4395 5.39235 22.7513 5.44737 22.9096 5.6736C22.9684 5.75764 23 5.85774 23 5.96033V18.0397C23 18.3158 22.7761 18.5397 22.5 18.5397C22.3974 18.5397 22.2973 18.5081 22.2133 18.4493L17 14.8V19C17 19.5523 16.5523 20 16 20H2C1.44772 20 1 19.5523 1 19V5C1 4.44772 1.44772 4 2 4H16C16.5523 4 17 4.44772 17 5V9.2Z"></path></svg>
                    <h2 className="font-bold">Live Mood Analysis</h2>
                </div>
                <div className="py-1 px-2 rounded bg-gray-700/10 text-sm font-bold text-black/50">
                    <span className="text-red-600 text-xl">◉</span> LIVE SCAN
                </div>
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
                        <div className=" py-1.5 text-5xl rounded-full flex items-center justify-center">
                        <p>{emoji}</p>
                        </div>
                        <h2 className="text-sm flex flex-col items-start font-semibold text-black/50">DETECTED MOOD <span className="text-black text-xl font-semibold capitalize">{expression}</span></h2>
                    </div>
                    {confidence !== null && (
                        <p className="text-black/50 flex flex-col items-start text-sm font-semibold">
                            CONFIDENCE <span className="text-xl font-bold text-blue-400"> {(confidence * 100).toFixed(2)}%</span>
                        </p>
                    )}
                </div> 
            </div>

            <button
                className="bg-indigo-600 text-white p-3 rounded-full cursor-pointer text-2xl absolute bottom-2 right-2"
                onClick={handleClick}
            >
                <svg className="w-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.1716 6.99955H11C7.68629 6.99955 5 9.68584 5 12.9996C5 16.3133 7.68629 18.9996 11 18.9996H20V20.9996H11C6.58172 20.9996 3 17.4178 3 12.9996C3 8.58127 6.58172 4.99955 11 4.99955H18.1716L15.636 2.46402L17.0503 1.0498L22 5.99955L17.0503 10.9493L15.636 9.53509L18.1716 6.99955Z"></path></svg>
            </button>
        </div>
    );
}