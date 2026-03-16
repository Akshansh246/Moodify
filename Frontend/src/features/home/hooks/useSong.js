import { useContext } from "react";
import { SongContext } from "../song.context";
import { getAllSong, getSong } from "../services/song.api";

export const useSong = () => {
    const context = useContext(SongContext)

    const {song, setSong, loading, setLoading} = context

    async function handleGetSong({mood}) {
        setLoading(true)
        const data = await getSong({mood})
        setSong(data.song)
        setLoading(false)
    }

    async function handleAllSongs() {
        setLoading(true)
        const data = await getAllSong()
        setSong(data.songs)
        setLoading(false)
    }

    return ({song, loading, handleGetSong, handleAllSongs})
}