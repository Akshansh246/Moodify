import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const MEDIAPIPE_VERSION = "0.10.14";

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    if (!videoRef.current) return;

    const vision = await FilesetResolver.forVisionTasks(
        `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/wasm`
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
        modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1,
    });

    streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    });

    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
    };

    export const detect = ({
    landmarkerRef,
    videoRef,
    setExpression,
    setConfidence,
    setEmoji,
    }) => {
    if (!landmarkerRef.current || !videoRef.current) return null;
    if (videoRef.current.readyState < 2) return null;

    const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
    );

    if (!results.faceBlendshapes || results.faceBlendshapes.length === 0) {
        setExpression("No face detected");
        setConfidence(null);
        setEmoji("🎭");
        return "No face detected";
    }

    const blendshapes = results.faceBlendshapes[0].categories;

    const getScore = (name) =>
        blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");
    const jawOpen = getScore("jawOpen");
    const browUp = getScore("browInnerUp");
    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");

    let currentExpression = "neutral";
    let currentEmoji = "😐";
    let confidence = 0.5;

    if (smileLeft > 0.5 && smileRight > 0.5) {
        currentExpression = "happy";
        currentEmoji = "😄";
        confidence = (smileLeft + smileRight) / 2;
    } else if (jawOpen > 0.6 && browUp > 0.5) {
        currentExpression = "surprised";
        currentEmoji = "😲";
        confidence = (jawOpen + browUp) / 2;
    } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
        currentExpression = "sad";
        currentEmoji = "😢";
        confidence = (frownLeft + frownRight) / 2;
    }

    setExpression(currentExpression);
    setConfidence(confidence);
    setEmoji(currentEmoji);

    return currentExpression;
};