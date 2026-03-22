import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import SideBar from '../components/SideBar'
import { useAuth } from '../../auth/hooks/useAuth'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'

const Home = () => {

    const {user} = useAuth()
    const {handleGetSong} = useSong()

    return (
        <div className='w-full lg:h-full flex bg-linear-to-br from-[#6D28D9] via-[#A78BFA] to-[#F1F5F9] text-indigo-950'>
            <SideBar/>
            <div className="w-full lg:h-full py-3 pr-3">
                <div className='w-full h-full bg-stone-100 rounded-2xl overflow-auto p-4'>
                    <div className='flex flex-col gap-3 w-full p-3'>
                        <h2 className='text-3xl font-semibold'>Welcome Back, <span className='font-bold'>{user.username}</span>👋</h2>
                        <p className='text-black/50'>Your Mood, Your Music.</p>
                    </div>
                    <div className='p-2 flex flex-col lg:flex-row gap-3 w-full'>
                        <div className='w-72 lg:w-140 shadow-lg rounded-3xl'>
                            <FaceExpression
                            onClick={(expression)=>{ handleGetSong({mood:expression}) }}
                            />
                        </div>
                        <div className='rounded-2xl shadow-lg h-fit w-fit'>
                            <Player/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
