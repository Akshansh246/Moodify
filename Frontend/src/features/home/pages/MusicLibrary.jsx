import React, { useEffect} from 'react'
import SideBar from '../components/SideBar'
import { useSong } from '../hooks/useSong'

const MusicLibrary = () => {
    const {song, handleAllSongs} = useSong()
    useEffect(()=>{
        handleSongs()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    async function handleSongs() {
        await handleAllSongs()
    }
    return (
        <div className='w-full h-full flex bg-linear-to-br from-[#6D28D9] via-[#A78BFA] to-[#F1F5F9] text-indigo-950'>
            <SideBar/>
            <div className="w-full h-full py-3 pr-3 overflow-hidden">
                <div className='w-full h-full bg-stone-100 rounded-2xl overflow-y-scroll p-4 gap-2'>
                    <h1 className='text-4xl font-bold mb-2'>All Songs</h1>
                    <div className='flex flex-wrap gap-2'>
                        {
                            !song ? 'Loading' :
                            song.map((s,i)=>{
                                return(
                                    <div key={i} className=' bg-white p-3 rounded-xl w-55 text-center flex flex-col gap-2 cursor-pointer shadow-2xl shadow-black'>
                                        <img className='w-full rounded-xl' src={s.posterUrl} alt="" />
                                        <p>{s.title}</p>
                                    </div>
                                )
                            })
                            
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicLibrary
