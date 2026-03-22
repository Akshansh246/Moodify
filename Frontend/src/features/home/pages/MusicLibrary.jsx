import React, { useEffect } from 'react'
import SideBar from '../components/SideBar'
import { useSong } from '../hooks/useSong'
import { useNavigate } from 'react-router'

const MusicLibrary = () => {
    const { song, loading, handleAllSongs } = useSong()
    const navigate = useNavigate()

    useEffect(() => {
        handleSongs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function handleSongs() {
        await handleAllSongs()
    }

    const songs = Array.isArray(song) ? song : []

    return (
        <div className='w-full h-full flex bg-linear-to-br from-[#6D28D9] via-[#A78BFA] to-[#F1F5F9] text-indigo-950'>
            <SideBar />
            <div className="w-full h-full py-3 pr-3 overflow-hidden">
                <div className='w-full h-full flex flex-col bg-stone-100 rounded-2xl overflow-auto p-4 gap-2'>
                    <h1 className='text-4xl font-bold mb-2'>All Songs</h1>

                    <div className='flex flex-wrap gap-2'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : songs.length === 0 ? (
                            <p>No songs found</p>
                        ) : (
                            songs.map((s, i) => {
                                return (
                                    <div
                                        onClick={()=>{navigate(`/song/${s._id}`)}}
                                        key={s._id || i}
                                        className='bg-white p-3 rounded-xl w-35 lg:w-55 text-center flex flex-col items-center gap-2 cursor-pointer shadow-lg shadow-black/10'
                                    >
                                        <img
                                            className='w-full rounded-xl'
                                            src={s.posterUrl}
                                            alt={s.title}
                                        />
                                        <p>{s.title}</p>
                                        <p className='bg-yellow-200 w-fit py-1 px-3 rounded-2xl border-2 border-yellow-300 text-sm'>
                                            {s.mood}
                                        </p>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicLibrary