import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const SongContext = createContext()


export const SongContextProvider = ({children}) => {
    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/devakshu/moodify/songs/Midnight_Rain_d0LJr4KAw.mp3",
        "posterUrl": "https://ik.imagekit.io/devakshu/moodify/covers/Midnight_Rain_n79Ai1nSd.jpeg",
        "title": "Midnight Rain",
        "mood": "sad",
    });
    const [loading, setLoading] = useState(false);

    return(
        <SongContext.Provider value={{song, setSong, loading, setLoading}}>
            {children}
        </SongContext.Provider>
    )
}