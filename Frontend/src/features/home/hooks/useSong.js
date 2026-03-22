import { useContext } from "react";
import { SongContext } from "../song.context";
import { getAllSong, getSong, getSongByID } from "../services/song.api";

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

    async function handleGetSongByID({id}) {
        setLoading(true)
        const data = await getSongByID({id})
        setSong(data.song)
        setLoading(false)
    }

    return ({song, loading, handleGetSong, handleAllSongs, handleGetSongByID})
}